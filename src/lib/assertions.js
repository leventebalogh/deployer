require('module-alias/register')

const fs = require('fs')
const get = require('lodash/get')
const logger = require('@lib/logger')
const bash = require('@lib/bash')
const { getRepositoryConfig, getRepositoryConfigPath, CONFIG_FILENAME, REQUIRED_REPOSITORY_CONFIG_FIELDS } = require('@lib/config')

module.exports = {
  assertRepositoryConfigExists,
  assertRepositoryConfigIsValid,
  assertConfigFieldIsDefined
}

function assertRepositoryConfigExists () {
  if (!fs.existsSync(getRepositoryConfigPath())) {
    logger.error('Deploy configuration not found in your repository', { shouldExit: false })
    logger.info(`The file "${CONFIG_FILENAME}" was not found in your repositorys root.`)
    logger.info(`More information: https://leventebalogh.com`)
    bash.exit()
  }

  logger.success('deploy.yml found in root of the repository')
}

function assertRepositoryConfigIsValid () {
  const isConfigValid = REQUIRED_REPOSITORY_CONFIG_FIELDS
    .map(assertConfigFieldIsDefined)
    .every(i => i)

  if (!isConfigValid) {
    logger.error('Your repository config is invalid.', { shouldExit: false })
    logger.info(`Please check that all the following required fields are present in your config:`)
    logger.info(`Required fields: ${REQUIRED_REPOSITORY_CONFIG_FIELDS.join(', ')}`)
    logger.info('More info: https://leventebalogh.com')
    bash.exit()
  }

  logger.success(`Your repository config (${CONFIG_FILENAME}) looks valid`)
}

function assertConfigFieldIsDefined (field) {
  const repositoryConfig = getRepositoryConfig()

  if (!get(repositoryConfig, field)) {
    logger.error(`Property "${field}" does not exist in ${CONFIG_FILENAME}`, { shouldExit: false })
    return false
  }

  return true
}
