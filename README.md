# Deployer (Beta)

A simple service using Ansible to easily deploy Docker containers by the repo-name and branch name.

**Example:**
```bash
$ ./bin/deploy.js "leventebalogh/dockerised-express" "master"
```

### Table of Contents
- [Overview](./docs/overview.md)
- [Deploy Config](./docs/deploy-config.md)
- [Deploy a Docker Service](./docs/deploy-a-docker-service.md)

### Overview
```
    $> ./bin/deploy <repo-name> <branch-name>
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


### Usage
```bash
$ ./bin/deploy.js "<repo-name>" "<branch-name>"
```

### Todo
- [ ] make configuration easy to edit
- [ ] make target hosts configurable
- [ ] publish to NPM