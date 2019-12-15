require('module-alias/register')

const argv = require('yargs').argv
const chalk = require('chalk')
const logger = require('@lib/logger')

module.exports = {
  checkCliArgs,
  getPositionalCliArgs
}

function getPositionalCliArgs () {
  const [repository, branch] = argv._

  return { repository, branch }
}

function checkCliArgs () {
  const { repository, branch } = getPositionalCliArgs()

  if (!repository && !branch) {
    logger.error({
      title: 'Missing parameters',
      description: chalk`Correct syntax: $ deploy {bold <repo-name> <branch-name>}`
    })
  }

  if (repository && !branch) {
    logger.error({
      title: 'Please specify the branch',
      description: chalk`Correct syntax: $ deploy ${repository} {bold <branch-name>}`
    })
  }

  if (!repository && branch) {
    logger.error({
      title: 'Please specify the repository',
      description: chalk`Correct syntax: $ deploy {bold <repo-name>} ${branch}`
    })
  }
}
