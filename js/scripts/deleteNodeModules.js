import {readdirSync, statSync, rmSync, existsSync} from "fs";
import {join} from "path";

// ANSI escape codes for colors
const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    reset: "\x1b[0m"
};

const colorLog = (color, message) => {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteNodeModules(rootDir, force = false, ignoreList = []) {
    const  recursiveDelete = (dir) => {
        const dirContents = readdirSync(dir);
        let deletedCount = 0;

        dirContents.forEach(function(item) {
            const itemPath = join(dir, item);
            const stats = statSync(itemPath);

            if (stats.isDirectory()) {
                if (item === "node_modules") {
                    if (force) {
                        try {
                            rmSync(itemPath, {recursive: true, force: true});
                            colorLog("green", `Deleted (forced): ${itemPath}`);
                            deletedCount++;
                        } catch (err) {
                            colorLog("red", `Error while deleting ${itemPath}: ${err.message}`);
                        }
                    } else {
                        colorLog("yellow", `Ignored: ${itemPath}`);
                    }
                } else if (!ignoreList.includes(item)) {
                    deletedCount += recursiveDelete(itemPath);
                } else {
                    colorLog("yellow", `Ignored (in ignore list): ${itemPath}`);
                }
            }
        });

        return deletedCount;
    }

    if (!existsSync(rootDir)) {
        throw new Error(`The directory ${rootDir} does not exist.`);
    }

    const deletedCount = recursiveDelete(rootDir);
    colorLog("green", `Total number of "node_modules" directories deleted: ${deletedCount}`);

    return deletedCount;
}

// Usage example
const rootDirectory = process.argv[2];
const force = process.argv.includes('--force');
if (!rootDirectory) {
    colorLog("blue", "Please specify a directory as an argument.");
    process.exit(1);
}
deleteNodeModules(rootDirectory, force);