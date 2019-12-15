require('module-alias/register')

const fs = require('fs')
const path = require('path')
const os = require('os')
const yaml = require('js-yaml')
const git = require('./git')
const { getPositionalCliArgs } = require('./cli')
const defaultConfig = require('../../default.config')

const CONFIG_FILENAME = '.deployer.yml'

// Any field listed here has to be present in the "<your-repository>/.deployer.yml" config file, otherwise the deploy will fail.
const REQUIRED_REPOSITORY_CONFIG_FIELDS = [
  'targetHosts'
]

module.exports = {
  getConfig,
  getUserConfig,
  getRepositoryConfig,
  getRepositoryConfigPath,
  CONFIG_FILENAME,
  REQUIRED_REPOSITORY_CONFIG_FIELDS
}

// Merges the default configuration from /config.js
// with the user's configuration coming from ~/.deployer.yml
// The user's configuration will override the default one in all cases.
function getConfig () {
  const { repository, branch } = getPositionalCliArgs()
  const userConfig = getUserConfig()
  const repositoryUrl = git.getRepositoryUrl(repository, userConfig.githubUsername, userConfig.useSSH)

  return {
    repository,
    repositoryUrl,
    branch,
    ...defaultConfig,
    ...userConfig
  }
}

// Configuration defined by the user in the home directory.
function getUserConfig () {
  const configPath = path.join(os.homedir(), CONFIG_FILENAME)

  if (fs.existsSync(configPath)) {
    return yaml.safeLoad(fs.readFileSync(configPath, 'utf-8'))
  }

  return {}
}

// Deploy-specific configuration for the actual repository
// As it is required to have this config, we don't have a default value for this.
function getRepositoryConfig () {
  const repositoryConfig = yaml.safeLoad(fs.readFileSync(getRepositoryConfigPath(), 'utf-8'))
  const networks = (repositoryConfig.networks || []).map(network => ({ name: network }));

  return {
    ...repositoryConfig,
    networks
  }
}

function getRepositoryConfigPath () {
  const { checkoutFolder } = getConfig()

  return path.join(checkoutFolder, CONFIG_FILENAME)
}
