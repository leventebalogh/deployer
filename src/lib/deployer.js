const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const get = require('lodash/get')
const bash = require('@lib/bash')
const ansible = require('@lib/ansible')
const config = require('@config')

module.exports = {
  deploy,
  assertDeployerConfigExists,
  assertDeployerConfigIsValid
}

const DEPLOYER_CONFIG_FILENAME = 'deploy.yml'
const { checkoutFolder, deployConfigRequiredProperties } = config

function deploy (vars = {}) {
  const deployConfigPath = getDeployerConfigPath()
  const deployConfig = getDeployerConfig()
  const { strategy } = deployConfig

  bash.logInfo('Starting to deploy...')

  return ansible.runPlaybook(strategy, { deployConfigPath, ...vars })
}

function assertDeployerConfigExists () {
  if (!deployerConfigExist()) {
    bash.logError(`${DEPLOYER_CONFIG_FILENAME} doesn't exist in the repo.`)
    bash.exit()
  }

  bash.logSuccess('✔ deploy.yml exists in repository')
}

function assertDeployerConfigIsValid () {
  const deployConfig = getDeployerConfig()
  const identity = i => i
  const isValid = deployConfigRequiredProperties
    .map(propName => assertConfigProp(deployConfig, propName))
    .every(identity)

  if (!isValid) {
    bash.exit()
  }

  bash.logSuccess('✔ deploy.yml is valid')
}

function getDeployerConfigPath () {
  return path.join(checkoutFolder, DEPLOYER_CONFIG_FILENAME)
}

function getDeployerConfig () {
  return yaml.safeLoad(fs.readFileSync(getDeployerConfigPath(), 'utf-8'))
}

function deployerConfigExist () {
  return fs.existsSync(getDeployerConfigPath())
}

function assertConfigProp (config, propName) {
  if (!get(config, propName)) {
    bash.logError(
      `Property "${propName}" does not exist in ${DEPLOYER_CONFIG_FILENAME}`
    )
    return false
  }

  return true
}
