## Description
The Full Stack project contains:

* ReactJs Client (Typescript)
  * React-Query
* NestJs Server
* MongoDB
* Docker Compose


## Run the project

### Development

To run the project in docker

```
$ docker-compose up dev
```

Go to http://localhost:8081

The mongo database has no password or user assigned, it is with the default account.
 
#### Note:
If you don't have docker, you can run Server and Client separately in your terminal(CMD on windows).
 
### Data

When starting the first time, after 5 seconds the API executes a timeout to obtain data. Apart from the task that runs every hour.
 