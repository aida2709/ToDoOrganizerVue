# TodoOrganizer
TodoOrganizer is web application for tasks organization. It has two main parts Todo list (unfinished tasks) and Done list (finished tasks).

 Once when todo task is finished it can be moved to done list, but it can also be returned to todo list for some editing. 

Access data for TodoOrganizer are:<br>
email: <b> test@test.com</b> <br>
password: <b>test </b>

 ## Motivation
 
 This application helps people to organize their tasks and makes it easier to monitor the work progress.

 ## Features
 Users can upload an preview images for each todo item. Also, todo item can be removed with delete option. Once when todo item is finished, by clicking on checkbox it can be moved to done list. Ofcourse, user can even move done items to todo items if they need to be edited for some reason. All these functionalities can be done with drag and drop option too.


## Framework
This project is developed using Vue js framework. <br>Read more on: https://vuejs.org/ .


## Project setup
Once when project is downloaded from https://github.com/aida2709/ToDoOrganizerVue navigate to the root of project and then run command below:

```
npm install
```

After all packages have been successfully installed, you are now ready to compile project for development running command below:

### Compiles and hot-reloads for development
```
npm run serve
```
Command for building for production is:

```
npm run build
```

When project is successfully compiled, it can be accessed on 
http://localhost:8080/.

### Dependencies
Some depenedencies that are installed for this project's purposes are:
- vue-i18n (npm install vue-i18n --save) - for localization purposes
- vuedraggable (npm i -S vuedraggable) - for drag and drop purposes between todo and done list