export const createLoop = (execute) => {
    let isRunning = false;

    const loop = () => {
        if (isRunning) {
            execute();
            requestAnimationFrame(loop);
        }
    };

    const _api = {
        start() {
            if (!isRunning) {
                isRunning = true;
                loop();
            }
        },
        stop() {
            isRunning = false;
        },
    };

    return Object.create(_api);
};
