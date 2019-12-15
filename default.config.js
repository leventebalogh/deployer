const path = require('path')

module.exports = {
  githubUsername: null,
  checkoutFolder: path.join(__dirname, '__deployer__'),
  checkoutFolderName: '__deployer__',
  ansibleFolder: path.join(__dirname, 'ansible'),
  githubUseSSH: true
}
