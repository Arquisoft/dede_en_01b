# dede_en_01b

[![CI for ASW2122](https://github.com/Arquisoft/dede_en1b/actions/workflows/asw2122.yml/badge.svg)](https://github.com/Arquisoft/dede_en1b/actions/workflows/asw2122.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_dede_en_01b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_dede_en_01b)
[![codecov](https://codecov.io/gh/Arquisoft/dede_en1b/branch/master/graph/badge.svg?token=r1a8JeFXQN)](https://codecov.io/gh/Arquisoft/dede_en1b)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>


This project is a basic example of website using **React** with **Typescript** and an endpoint using **NodeJS** with **express**.

## Quick start guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/arquisoft/dede_0`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
If you want to run it without docker. Compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Now the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## More information
You can get more information about the respository in the other README files:
- Documentation: https://github.com/arquisoft/dede_en1b/tree/master/docs
- Webapp: https://github.com/arquisoft/dede_en1b/tree/master/webapp
- Restapi: https://github.com/arquisoft/dede_en1b/tree/master/restapi
## Deployment
The webapp can be seen at: https://www.dedeen1b.tk/ .
The documentation is in: https://arquisoft.github.io/dede_en1b/
## Developers
- Sebastián López Hernández, [@sebaslh01](https://github.com/sebaslh01)
- Daniel Álvarez Díaz, [@danieladov](https://github.com/danieladov)
- Luis Miguel Alonso Ferreiro [@lumialfe](https://github.com/lumialfe)
- Jesús González Méndez, [@jesugmend](https://github.com/jesugmend)
- Miguel Cuesta Martínez, [@UO258220](https://github.com/UO258220)
