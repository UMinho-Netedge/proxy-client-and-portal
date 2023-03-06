# Proxy Client and Portal

## Introduction

Interface the MX2 for the UMinho-Netedge MEC environment. 

## Folders and Files Description 

### Client Folder

1. Environment variables - .env;
2. Source folder (src):

    | File             | Description      |
    | ---------------- | ---------------- |
    | app.css          | Cascading style sheets for the interface |
    | app.js           | Home page structure |
    | index.js         | Entry point for the app |
    | navbar.js        | Navbar structure and logout function |
    | StateHooks.js    | most common state hooks used |
    
#### Source Folder 

3. Images folder (images) - all images used 
4. Pages folder (pages): 

    | File                                   | Description |
    | -------------------------------------- | ----------- |
    | delete.js                              | Functions related to the delete request and page structure |
    | get.js                                 | Functions related to the get request and page structure |
    | login.js                               | Functions related to the login and page structure |
    | logout_confirmation.js                 | Functions related to the logout confirmation and page structure |
    | notifications.js                       | Functions related to the notifications and page structure |
    | post_app_context.js                    | Functions related to the post app context request and page structure |
    | post_obtain_app_loc_availability.js    | Functions related to the post app location availability request and page structure |
    | put.js                                 | Functions related to the put request and page structure |
    
### Server Folder

5. Docker directory containing Dockerfile and docker-compose configuration files (docker).
6. Scripts directory containing files to delete and execute the app (scripts). 
7. Flask application file - app.py;
8. System requirements - requirements.txt;
9. Source folder (src):

    | File        | Description |
    | ----------- | ----------- |
    | enums.py    | Enumerated types |
    | error.py    | Classes and functions realted to errors |
    | models.py   | Validation classes for the data structures |
    | schemas.py  | Data structures schema |
    | utils.py    | Classes and functions for several files|
    
## How to use it 
To run it, you must first have a Kubernetes cluster configured and Helm installed, in our case, we use minikube v1.29.0 and Helm v3.11.1.
You must have Node and NPM installed, we use node v18.14.2 and v9.5.0.

## Server side 

### To run it

```
$ cd ..
$ docker login
$ docker build -f ./docker/Dockerfile -t uminhonetedge/proxy_client:latest .
$ docker push uminhonetedge/proxy_client:latest
$ cd docker
$ docker-compose up 
```
### Delete it 
```
$ cd .. 
$ cd docker 
$ docker compose down 
$ docker volume rm $(docker volume ls -q)
$ docker image rm uminhonetedge/proxy_client:
```

## Client side 

### To run it

```
$ npm install
$ $env:PORT=3001
$ npm start

```

## Notes 
* The port on the client side can be changed.
* After the first time, you can just run "docker-compose up" on the server side and, on the client side, you don't need to run "npm install"



