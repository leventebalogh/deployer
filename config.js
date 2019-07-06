const path = require('path')

const gitBaseUrl = 'git@github.com:leventebalogh'
const checkoutFolderName = '__deployer__'

module.exports = {
  gitBaseUrl,
  checkoutFolderName,
  checkoutFolder: path.join(__dirname, checkoutFolderName),
  ansibleFolder: path.join(__dirname, 'ansible'),
  deployConfigRequiredProperties: [
    'strategy',
    'servers',
    'container',
    'container.name'
  ]
}
