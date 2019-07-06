const bash = require('./bash')

module.exports = {
  getGitUrl,
  clone
}

function getGitUrl (repoName, gitBaseUrl) {
  if (repoName.includes('://') || repoName.includes('@')) {
    return repoName
  }

  return `${gitBaseUrl}/${repoName}`
}

function clone (gitUrl, branchName, checkoutFolder) {
  bash.logInfo(`Start cloning ${gitUrl}`)
  bash.removeFolder(checkoutFolder)

  return bash
    .command(`git clone -b ${branchName} ${gitUrl} ${checkoutFolder}`)
    .then(() => bash.logSuccess('✔ Cloned repo.'))
    .catch(err =>
      bash.logError(
        'Error while cloning the repo',
        { gitUrl, checkoutFolder },
        err
      )
    )
}
