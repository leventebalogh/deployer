require('module-alias/register')

const yargs = require('yargs')

// Setting up the command
const argv = yargs
  .option('repository', {
    alias: 'r',
    describe: 'Name of your repository on Github. (e.g. "react")'
  })
  .option('branch', {
    alias: 'b',
    describe: 'Name of the branch you would like to deploy. (e.g. "master")'
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Use to display more detailed logging'
  })
  .demandOption(['repository', 'branch'], 'Please provide both repository and branch arguments.')
  .example('deployer -r my-project -b master', 'Deploys the master branch from "my-project" to the target servers. "my-project" will be transformed to "git@github.com:<username>/my-project" under the hood, but in order to make it work you have to create a ~/.deployer.yml config file. The --repository option also accepts an absolute URL.')
  .help()
  .argv

module.exports = {
  getCliArgs
}

function getCliArgs () {
  return {
    repository: argv.repository,
    branch: argv.branch,
    verbose: argv.verbose
  }
}
