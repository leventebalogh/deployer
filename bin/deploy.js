#! /usr/bin/env node
require('module-alias/register')

const bash = require('@lib/bash')
const git = require('@lib/git')
const { getConfig, getRepositoryConfig } = require('@lib/config')
const { deploy } = require('@lib/deployer')
const assertions = require('@lib/assertions')
const logger = require('@lib/logger')

const config = getConfig()
const { repository, repositoryUrl, branch, checkoutFolder, verbose } = config

// Only displaying configuration values if it is asked for explicitly (verbose mode)
if (verbose) {
  logger.logTitle('Configuration:')
  logger.logVariables(config)
  logger.logSeparator()
}

logger.success('Starting deployment...')

git
  .clone(repositoryUrl, branch, checkoutFolder)
  .then(assertions.assertRepositoryConfigExists)
  .then(assertions.assertRepositoryConfigIsValid)
  .then(deploy)
  .then(() => {
    const { targetHosts, containerName } = getRepositoryConfig()
    logger.success(`"${repository}" deployed successfully`)
    logger.info(`Affected hosts: ${targetHosts.join(', ')}`)
    logger.info(`Container name: ${containerName}`)
  })
  .then(() => bash.removeFolder(checkoutFolder))
