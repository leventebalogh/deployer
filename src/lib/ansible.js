const _ = require('lodash')
const path = require('path')
const bash = require('@lib/bash')
const logger = require('@lib/logger')
const { getConfig, getRepositoryConfig } = require('@lib/config')

module.exports = {
  runPlaybook
}

function runPlaybook () {
  const config = getConfig()
  const repositoryConfig = getRepositoryConfig()
  const playbookVars = { ...config, ...repositoryConfig };
  const playbook = path.join(config.ansibleFolder, `deploy.docker.yml`)
  const optHosts = `-i "${getCommaSeparatedHostList()},"`
  const optKeyFile = config.keyFile ? `--key-file ${config.keyFile}` : `--key-file ~/.ssh/id_rsa`
  const optUser = config.user ? `--user ${config.user}` : `--user www`
  const optExtraVars = `--extra-vars '${JSON.stringify(playbookVars)}'`
  const optSSH = `--ssh-common-args "-o ForwardAgent=yes"`
  const command = `ansible-playbook ${playbook} ${optHosts} ${optKeyFile} ${optUser} ${optSSH} ${optExtraVars}`

  logger.logSeparator()
  logger.logTitle('Running ANSIBLE command')
  logger.info(command)
  logger.logSeparator()

  return bash.command(command, { showLogs: true })
}

function getCommaSeparatedHostList () {
  const { targetHosts } = getRepositoryConfig()

  return targetHosts.join(', ')
}
