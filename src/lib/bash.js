const { exec } = require("child_process");
const Promise = require("bluebird");
const chalk = require("chalk");

module.exports = {
    command,
    logInfo,
    logError,
    exit
};

function command(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

function exit(code = 0) {
    process.exit(code);
}

function logError(msg, ...rest) {
    console.log(chalk.red(`error: ${msg}`, ...rest));
}

function logInfo(msg, ...rest) {
    console.log(`info: ${msg}`, ...rest);
}
