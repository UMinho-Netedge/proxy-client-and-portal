# proxy-client-and-portal

## Introduction

Server side for the UALCMP client + CFS Portal 

## Folders and Files Description 

1. Flask application file - app.py;
2. System requirements - requirements.txt;
3. ./src - Source folder:

    | File        | Description |
    | ----------- | ----------- |
    | error.py    | Classes and functions realted to errors |
    | models.py   | Validation classes for the data structures |
    | schemas.py  | Data structures schema |
    | utils.py    | Classes and functions for several files|

4. ./scripts - Start and delete execution files: 

    | File        | Description |
    | ----------- | ----------- |
    | exe.sh  | Start the server with docker-compose |
    | del.sh    | Delete all containers, volumes and images|

5. ./docker - Docker directory containing Dockerfile and docker-compose configuration files. 
6. ./data_client - Data path directory for MongoDB.  

## How to use it 
### Run it
```
$ cd docker 
$ docker compose up -d 
[+] Running 4/4
 ⠿ Network docker_mynetwork  Created                                                                                                                           0.0s
 ⠿ Container mongodb_client  Started                                                                                                                           1.1s
 ⠿ Container express         Started                                                                                                                           1.1s
 ⠿ Container client          Started                                                                                                                           1.5s
```
### Delete it 
```
$ cd scripts 
$ bash del.sh
[+] Running 4/4
 ⠿ Container client          Removed                                                                                                                           0.9s
 ⠿ Container express         Removed                                                                                                                           0.3s
 ⠿ Container mongodb_client  Removed                                                                                                                           0.5s
 ⠿ Network docker_mynetwork  Removed                                                                                                                           0.3s
```
## Endpoints 

* GET - /ping - Test database connection. 
* POST - /app_contexts - Creation of a new application context.
* PUT - /app_contexts/<contextId> - Updating the callbackReference and/or appLocation of an existing application context.
* DELETE - /app_contexts/<contextId> - Deletion of an existing application context.
* POST - /callback_ref - Send notification events by mx2. 
* GET - /notifications - Gets the most recent notification event and the client's ContexId. 
* GET - /login - Access to the login service.

## Notes
* The server can be started by running exe.sh in the scripts folder. This will, however, always build and push the most recent version into the docker repository.