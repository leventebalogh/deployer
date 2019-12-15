# Deployer

A simple service for deploying docker containers easily.

![](assets/screen-recording.gif)


## Install
```bash
$ npm i -g @devcrush/deployer
```

**Other dependencies**:
- Ansible (client) - [Installation Guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- Docker (server) - [Installation Guide](https://docs.docker.com/install/linux/docker-ce/ubuntu/)


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
  deployer -r my-project -b master  Deploys the master branch from "my-project"
                                    to the target servers. "my-project" will be
                                    transformed to "git@github.com:<username>/my-project"
                                    under the hood, but in order to make it work you
                                    have to create a ~/.deployer.yml config
                                    file. The --repository option also accepts
                                    an absolute URL.
```

## Verbose mode
You can log out all the configuration parameters by using the `--verbose` flag.

## User configuration

## Repository configuration

## How does it work?
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
