# Overview

Here is a quick flow diagram on how the tool actually works.

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
