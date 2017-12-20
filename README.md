# Setup Development Environment

## Setup Docker
- Install docker for mac: https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac
- Install kitematic: https://kitematic.com/
- Make sure everything ok, run diagnostic tools by clicking icon ![alt text](https://docs.docker.com/docker-for-mac/images/whale-x.png) menu –> Diagnose & Feedback from the menu bar.

### Add development environment to your ~/.bashrc or ~/.zshrc
```bash
export EXCELLERIFY_DB_PORT=5433
export EXCELLERIFY_DB_PASSWORD=1234
export EXCELLERIFY_DB=excellerify
export EXCELLERIFY_DB_USER=excellerify
```

run `source ~/.bashrc` or `source ~/.zshrc` to update changes immediately

### Run Docker Containers
```bash
docker-compose up -d
```

## Install Redis on OSX
```bash
# install redis
brew install redis

# launch Redis on computer starts.
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

# launch redis
brew services start redis
```

## Loopback

```bash
# install loopback cli
npm install -g loopback-cli

# install dependencies
npm install

# run migration !WARNING do not run in PRODUCTION
node bin/automigrate

# create default admin
node bin/addDefaultAdmin

# run auto-update, run each time there is change in database schema
node bin/autoupdate

# run the application using following command
node .
```

### Loopback Model and Datasource
```bash
# create new model
lb model

# define model relation
# !WARNING: Due to we are using no-standard model directory structure, you cannot use this command
# edit model file manually instead
lb relation

# set model access control
lb acl
```

## Testing and lint
```bash
# automatic API test
npm test

# Run ESlint
npm lint
```

## VSCode Debugging
Refer to this document
https://nodejs.org/en/docs/guides/debugging-getting-started/#vs-code-1-10

## Play with GraphQL
Go to (http://localhost:3000/graphiql) and paste following query to run
```
// page 1, limit 1 item
{
  product{
    productFind(options: {
      offset:0, limit: 1
    }) {
      edges {
        node {
          name
          price
          brand{
            name
          }
        }
      }
    }
  }
}
```

```
// Get all products which name like 'iPhone'
{
  product{
    productFind(filter:{
      where: {
        name: {
          like: "iPhone"
        }
      }
    }) {
      edges {
        node {
          name
          price
          brand{
            name
          }
        }
      }
    }
  }
}
```

```
// filter in sub query
{
  brand {
    brandFind{
      edges {
        node {
          products (filter: {
            where: {
              name: {
                ilike: "%plus%"
              }
            }
          }) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}
```
