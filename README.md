# Deployer (Beta)

A simple service using Ansible to easily deploy Docker containers by the repo-name and branch name.

**Example:**
```bash
$ ./bin/deploy.js "leventebalogh/dockerised-express" "master"
```

## Table of Contents
- [Overview](./docs/overview.md)
- [Deploy Config](./docs/deploy-config.md)
- [Deploy a Docker Service](./docs/deploy-a-docker-service.md)

## Quick Overview
```
    $> deploy <repo-name> <branch-name>
                     |
                     v
          +----------------------+   Not found
          | Check out repo and   +-------------->  ERROR
          | branch               |
         +----------+-----------+
                     |
          +----------v-----------+   No file
          | Check if deploy.yml  +-------------->  ERROR
          | exists               |
          +----------+-----------+
                     |
          +----------v-----------+
          | Read information     |
          | from deploy.yml      |
          +----------+-----------+
                     |
    Docker           |
    +----------------v-----------------+
    | 1. checkout repo to target host  |
    | 2. build docker image            |
    | 3. restart container from image  |
    +----------------------------------+
```


## Usage
```bash
$ ./bin/deploy.js "<repo-name>" "<branch-name>"
```
