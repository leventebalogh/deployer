#! /usr/bin/env node
require('module-alias/register')

const argv = require('yargs').argv
const config = require('../config')
const bash = require('@lib/bash')
const git = require('@lib/git')
const deployer = require('@lib/deployer')

const [repoName, branchName] = argv._
const { gitBaseUrl, checkoutFolderName, checkoutFolder } = config

if (!repoName || !branchName) {
  bash.logError('Missing parameter.')
  bash.logError('Correct syntax: $ deploy <repo-name> <branch-name>')
  bash.exit()
}

const gitUrl = git.getGitUrl(repoName, gitBaseUrl)

git
  .clone(gitUrl, branchName, checkoutFolder)
  .then(deployer.assertDeployerConfigExists)
  .then(deployer.assertDeployerConfigIsValid)
  .then(() => deployer.deploy({ gitUrl, repoName, branchName, checkoutFolderName }))
  .then(() => bash.removeFolder(checkoutFolder))
  .then(() => bash.logSuccess(`✔ "${repoName}" deployed successfully`))
