const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const bash = require('@lib/bash')
const config = require('@config')

module.exports = {
  runPlaybook
}

function runPlaybook (strategy, vars) {
  const playbookPath = getPlaybookPath(strategy)
  const hostsPath = getHostsPath()
  const command = `ansible-playbook -i ${hostsPath} ${playbookPath} ${printExtraVars(vars)}`

  if (!fs.existsSync(playbookPath)) {
    bash.logError(`No playbook found for the strategy "${strategy}".`)
    bash.logError(`Check the deploy.yml in your repo.`)
    bash.exit()
  }

  bash.logInfo(`Running command "${command}"`)

  return bash.command(command)
}

function getPlaybookPath (strategy) {
  return path.join(config.ansibleFolder, `deploy.${strategy}.yml`)
}

function getHostsPath () {
  return path.join(config.ansibleFolder, 'hosts.default')
}

function printExtraVars (vars) {
  if (_.isEmpty(vars)) {
    return ''
  }

  const varsString = _.reduce(
    vars,
    (result, value, key) => `${result} ${key}=${value}`,
    ''
  )

  return `--extra-vars "${varsString}"`
}
