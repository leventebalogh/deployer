const fs = require("fs");
const rimraf = require("rimraf");
const bash = require("./bash");

module.exports = {
    getGitUrl,
    clone,
    clean
};

function getGitUrl(repoName, gitBaseUrl) {
    if (repoName.includes("://") || repoName.includes("@")) {
        return repoName;
    }

    return `${gitBaseUrl}/${repoName}`;
}

function clone(gitUrl, branchName, targetFolder) {
    const { logInfo, logError } = bash;

    clean(targetFolder);
    logInfo(`Start cloning ${gitUrl}`);

    return bash
        .command(`git clone -b ${branchName} ${gitUrl} ${targetFolder}`)
        .then(() => logInfo("Successfully cloned repo."))
        .catch(err =>
            logError(
                "Error while cloning the repo",
                { gitUrl, targetFolder },
                err
            )
        );
}

function clean(targetFolder) {
    if (fs.existsSync(targetFolder)) {
        rimraf.sync(targetFolder);
    }
}
