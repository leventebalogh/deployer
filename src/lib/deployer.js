const ansible = require('@lib/ansible')
const logger = require('@lib/logger')
const { getRepositoryConfig, getConfig } = require('@lib/config')

module.exports = {
  deploy
}

function deploy () {
  const { verbose } = getConfig()
  const repositoryConfig = getRepositoryConfig()

  // Only displaying configuration values if it is asked for explicitly (verbose mode)
  if (verbose) {
    logger.logSeparator()
    logger.logTitle('Repository configuration')
    logger.logVariables(repositoryConfig)
    logger.logSeparator()
  }

  logger.success('Starting to deploy with ANSIBLE')

  return ansible.runPlaybook()
}
