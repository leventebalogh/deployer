# Deploy Config

Every project that is going to be deployed needs to have a `deploy.yml`
file in the root of the repo which holds information about how the
project needs to be deployed.

**deploy.yml**
```yaml
# Available strategies: "docker"
strategy: docker
host: leventebalogh.com
container:
  # The name of the container
  name: foo

  # Which networks to attach to
  networks:
    - name: nginx
    - name: database

  # The ports to expose from the container
  # Format: "<host-port>:<container-port>"
  ports:
    -"8080:80"

  # The ports that we would like to expose from the container
  exposed_ports:
    - 8080
```
