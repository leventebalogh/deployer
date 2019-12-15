const ansible = require('@lib/ansible')
const logger = require('@lib/logger')
const { getRepositoryConfig } = require('@lib/config')

module.exports = {
  deploy
}

function deploy () {
  const repositoryConfig = getRepositoryConfig()

  logger.logSeparator()
  logger.logTitle('Repository configuration')
  logger.logVariables(repositoryConfig)
  logger.logSeparator()
  logger.success('Starting to deploy with ANSIBLE')

  return ansible.runPlaybook()
}
