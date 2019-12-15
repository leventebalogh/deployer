require('module-alias/register')

const bash = require('./bash')
const logger = require('./logger')

module.exports = {
  getRepositoryUrl,
  clone
}

function getRepositoryUrl (repository, githubUsername, useSSH = true) {
  const isValidRepositoryUrl = repository.includes('://') || repository.includes('@')

  if (isValidRepositoryUrl) {
    return repository
  }

  if (!githubUsername) {
    logger.error('Invalid repository URL', { shouldExit: false })
    logger.info(`"${repository}" is not a valid github repository URL.`)
    logger.info('If you would like to set a default github account please specify it in the config (~/.deployer.yml)')
    logger.info('More info: https://leventebalogh.com')
    bash.exit()
  }

  if (useSSH) {
    return `git@github.com:${githubUsername}/${repository}`
  }

  return `https://github.com/${githubUsername}/${repository}`
}

function clone (repositoryUrl, branch, checkoutFolder) {
  bash.removeFolder(checkoutFolder)

  return bash
    .command(`git clone -b ${branch} ${repositoryUrl} ${checkoutFolder}`)
    .then(() => logger.success('The repository has been cloned successfully.'))
    .catch(err => {
      const isRepoNotFound = err.message.match('ERROR: Repository not found')
      const isBranchInvalid = err.message.match('Remote branch something not found in upstream origin')

      if (isRepoNotFound) {
        logger.log('')
        logger.error('Repository not found.', { shouldExit: false })
        logger.info(`"${repositoryUrl}" doesn't appear to be a valid git repository.`)
      } else if (isBranchInvalid) {
        logger.log('')
        logger.error('Branch not found.', { shouldExit: false })
        logger.info(`The branch "${branch}" cannot be found in this repository.`)
      } else {
        logger.log('')
        logger.error('Unkown error', { shouldExit: false })
        logger.info(err.message)
      }

      bash.exit()
    })
}
