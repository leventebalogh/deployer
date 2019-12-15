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
  .example('deployer --repository my-project --branch master', 'Deploys the master branch from "my-project" to the target servers.')
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
