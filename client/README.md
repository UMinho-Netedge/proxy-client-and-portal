# proxy-client-and-portal

## Introduction

Client side for the UALCMP client + CFS Portal 

## Folders and Files Description 

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

## How to use it 
### Run it
```
$ npm install
$ $env:PORT=3001
$ npm start

```

## Notes 
* The port on the client side can be changed.
* After the first time you don't need to run "npm install"
