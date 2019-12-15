require('module-alias/register')

const chalk = require('chalk')
const bash = require('@lib/bash')

module.exports = {
  error,
  info,
  log,
  logVariables,
  logSeparator,
  logTitle,
  success
}

function log (message) {
  console.log(message)
}

function info (msg) {
  log(chalk.white(msg))
}

function logTitle (msg) {
  log(chalk.white.bold.underline(msg))
}

function logSeparator () {
  log('')
}

function success (msg) {
  log(chalk.green.bold(`✓ ${msg}`))
}

function error (msg, { shouldExit = true } = {}) {
  log(chalk.bgRed.white.bold(padText(msg)))

  if (shouldExit) {
    bash.exit()
  }
}

function logVariables (variables = {}) {
  Object.keys(variables).forEach(key => {
    info(chalk`{bold ${key}:} ${JSON.stringify(variables[key])}`)
  })
}

function padText (text) {
  return ` ${text} `
}
