const fs = require("fs");
const path = require("path");
const bash = require("@lib/bash");
const config = require("@config");

module.exports = {
    deployerConfigExist,
    assertDeployerConfigExists
};

const DEPLOYER_CONFIG_FILENAME = "deploy.yml";
const { targetFolder } = config;

function deployerConfigExist() {
    return fs.existsSync(path.join(targetFolder, DEPLOYER_CONFIG_FILENAME));
}

function assertDeployerConfigExists() {
    if (!deployerConfigExist()) {
        bash.logError(`${DEPLOYER_CONFIG_FILENAME} doesn't exist in the repo.`);
        bash.exit();
    }
}
