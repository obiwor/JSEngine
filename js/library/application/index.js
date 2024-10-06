import log from "loglevel";

const topologicalSort = (graph) => {
    const inDegree = {};
    const queue = [];
    const result = [];

    // Initialiser les degrés entrants
    for (const node in graph) {
        inDegree[node] = 0;
    }
    for (const node in graph) {
        for (const dependent of graph[node]) {
            inDegree[dependent] = (inDegree[dependent] || 0) + 1;
        }
    }

    // Ajouter tous les nœuds avec un degré entrant de 0 à la queue
    for (const node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }

    // Processus principal
    while (queue.length) {
        const node = queue.shift();
        result.push(node);

        for (const dependent of graph[node] || []) {
            inDegree[dependent]--;
            if (inDegree[dependent] === 0) {
                queue.push(dependent);
            }
        }
    }

    // Vérifier s'il y a un cycle
    if (result.length !== Object.keys(graph).length) {
        throw new Error("Le graphe contient un cycle", result, graph);
    }

    return result;
};

export const createApplication = (namespace) => {
    const logger = log.getLogger(namespace);
    logger.setLevel(log.levels.INFO);

    const modules = {};
    const waiters = {};
    const graph = {};

    const registerModule = ({name, deps = [], init}) => {
        modules[name] = {name, deps, init};
        graph[name] = deps;
    };

    const moduleInit = async (name) => {
        const t0 = performance.now();
        await modules[name].init();
        const dt = performance.now() - t0;
        const TMAXL = 250;
        const TMAXH = 1000;
        if (dt > TMAXH) {
            logger.error(
                `Module ${name} is significantly slowing down application loading performance ${Math.round(dt)}ms > ${TMAXH}ms (max), check your network performance and server configuration`
            );
        } else if (dt > TMAXL) {
            logger.warn(
                `Module ${name} has been initialized in more than ${Math.round(dt)}ms > ${TMAXL}ms (max), check your network performance`
            );
        }
    };

    const moduleWait = (name) => {
        if (name in waiters) {
            return waiters[name];
        }
        waiters[name] = moduleInit(name);
        return waiters[name];
    };

    const wait = async (names) => {
        logger.info("Async waiting for modules", names);
        return Promise.all(names.map(moduleWait));
    };

    const boot = async () => {
        try {
            const sortedModules = topologicalSort(graph);
            logger.info("Modules initialization order:", sortedModules);

            for (const moduleName of sortedModules) {
                await moduleWait(moduleName);
            }

            logger.info("All modules have been initialized");
        } catch (error) {
            logger.error("Error during boot:", error.message);
        }
    };

    const app = {
        name: namespace,
        log: logger,
        registerModule,
        wait,
        boot,
    };

    window[namespace] = app;
    return app;
};
