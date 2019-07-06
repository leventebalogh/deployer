# Deploy a Docker Service

A docker service is a repo which has a Dockerfile that specifies the image,
and it runs inside a docker container.

**1. Have a Dockerfile in your repo**
This is going to be used to build your image.

**2. Add a deploy.yml to the repo root**
This file contains deploy specific configuration options.
[Check documentation](./deploy-config.md)

**3. Generate deploy key**
You need to have a deploy key
