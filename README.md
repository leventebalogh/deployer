# Deployer

A simple service for deploying docker containers easily.

![](assets/screen-recording.gif)

## Install
```bash
$ npm i -g @devcrush/deployer
```

## Usage
```bash
# You can always display the usage information by "$ deployer --help"
Options:
  --version         Show version number                                [boolean]
  --repository, -r  Name of your repository on Github. (e.g. "react") [required]
  --branch, -b      Name of the branch you would like to deploy. (e.g. "master")
                                                                      [required]
  --verbose, -v     Use to display more detailed logging
  --help            Show help                                          [boolean]

Examples:
  deployer --repository my-project          Deploys the master branch from
  --branch master                           "my-project" to the target servers.
```

## Overview
```
    $> ./bin/deploy "<repo-name>" "<branch-name>"
                     |
                     v
          +----------------------+   Not found
          | Check out repo and   +-------------->  ERROR
          | branch               |
         +----------+-----------+
                     |
          +----------v-----------+   No file
          | Check if deploy.yml  +-------------->  ERROR
          | exists in project    |
          +----------+-----------+
                     |
          +----------v-----------+
          | Read configuration   |
          | from deploy.yml      |
          +----------+-----------+
                     |
    Docker           |
    +----------------v-----------------+
    | 1. Checkout repo to target host  |
    | 2. Build docker image            |
    | 3. Restart container from image  |
    +----------------------------------+
```
