# Node.js datasource

This repository holds the source code of a **Node.js datasource** mainly in typescript.

## Architecture design

The reference uses a architecure based on [Uncle Bob Clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) and a Generic Model View Controller pattern.

### Overview 

![alt architecture](./assets/dev/architecture.jpg)

### General description

In general terms, the architecture uses the following structure:

  - /src: Source code.
    - /latest: Current version under development
    - /stable: Last stable version
    - /support: Support resources (*e.g debug & fileManagment*)
    - /util: Common classes
    - /vN: Previous versions
  - /bin: Scripts & files related to deployment.
  - /assets: Project resources such as scripts, images and files.

### Business logic

  - /models: Store the system models, *e.g. Car, Agency, etc*. [Details](/.guides/models.md)

  - /sources/*.ts (repositories): Represent the abstractions (interfaces) of system actions, e.g queries, transaction, etc. [Details](/.guides/repositories.md)
    > Each repository is grouped by datasource, *e.g. sql, gmail, aws, etc.*

  - /sources: Are the implementations of repository methods. [Details](/.guides/sources.md)

 > In other words the repositories handle what is going to be done. *e.g. getPetList()* and the sources implement that action e.g. *query_to_database*

### Http resources

  - routes.ts & middlewares.ts: Handle the endpoints & middlewares **definitions**. [Details](/.guides/routes.md)
 
  - /controllers: Are the link between the business logic and http routes (GETs, SETs, PUTs). [Details](/.guides/routes.md)

    > It is the most important module of the architecture because it is the responsable of linking the data requirements (repositories), with the business logic (use cases).

    > In case of complex use cases *e.g Complex algorithms, AI, ML*, it can be separated in module folders

  - /middlewares: Manage the handling of information before reaching the controllers. *e.g Validations & authentications*. [Details](/.guides/middlewares.md)

### Assets

  - /dev: Resources related to the development of the project *e.g db.sql*.
  - /public: Resources that are publicly accessible *e.g profile_image.png, doc.pdf*.
    > It includes /resources directory to store files uploaded

<br/><br/>

### Configuration

  - app.ts: Handle server initialization and version managment of endpoints.
  - debug.ts: Temp file to debug source methods.
  - package.json & tsconfig.json: Handle the project configuration such as dependencies, paths and module definition.
  - .env.example & .env: Define the environment variables which are mainly used to store secret_keys.

### Class diagram

![alt classes](./assets/dev/classes.jpg)

## Pre-requisites:

 * Download & install [Node js](https://nodejs.org/en/download/) or an equivalent.
 * Download & install [Visual Studio code](https://code.visualstudio.com/) or an equivalent (optional).

### To start coding and build:

 * Clone this repository.
 * Create a database instance with the db.sql scheme (See [scheme](./assets/dev/db.sql)).
 * Create an .env file with the project credentials based on *.env.example* file
 * Install dependencies.
 ```bash
 $ npm install
 ```
 * Init database 
  ```bash
 GET http://localhost:4004/support/dev/init_db
 ```
 * Install typescript.
 ```bash
 $ npm install -g typescript
 ```
 * Compile typescript (Optional).
 ```bash
 $ tsc
 ```
 * Run server.
 ```bash
 $ npm start
 ```

 ### To debug modules

 * Create an debug.ts file with based on *.deb.example* file
 * Modify debug.ts
 * Run script.
 ```bash
 $ npm run-script debug
 ```
 ### To generate documentation

 * Install apidoc.
 ```bash
 $ npm install apidoc -g
 ```
 * Generate docs.
 ```bash
 $ apidoc -i src/ -o docs/ -t assets/dev/docs_template/
 ```

  ### Examples

 * Example docs.
 ```bash
 http://localhost:4004/docs
 ```
  * Example requests. 
 ```bash
 GET http://localhost:4004/v1/players
 ```

## Deploy to aws eb

### Configure aws/dns console

* Open aws elastic beanstalk console and create an environment 
> Important: Configure apache as proxy server and enable 443 port in security groups

* In case of need database add a database in the console (settings/databases/modify)

* Configure DNS settings in domain provider, e.g *godaddy*


### Configure server

* Install eb and configure credentials, See ([install](https://docs.aws.amazon.com/es_es/elasticbeanstalk/latest/dg/eb-cli3-install.html) & [credentials](https://docs.aws.amazon.com/es_es/general/latest/gr/managing-aws-access-keys.html))

* Init eb project
```bash
$ eb init
 ```

* Enable ssh
```bash
$ eb ssh --setup
 ```

* Execute ssh and setup apache settings
```bash
$ sudo vim /etc/httpd/conf.d/temp.conf
# Listen 80
# <VirtualHost *:80 *:443>
# 	ServerName <HTTPS_DOMAIN>
# 	DocumentRoot /var/www/html
# </VirtualHost>
```

* Install and configure certbot
```bash
$ sudo wget https://dl.eff.org/certbot-auto
$ sudo chmod a+x ./certbot-auto
$ sudo ./certbot-auto certonly --debug --webroot
# root: /var/www/html
$ sudo ./certbot-auto certonly --debug
```
* Set HTTPS_DOMAIN in .ebextensions/nodecommands.config

### Configure environment variables

* Set HOST_NAME in .env



### Deploy

 * Deploy to aws
```bash
$ eb deploy
 ```