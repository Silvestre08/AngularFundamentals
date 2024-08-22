# JoesRobotShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0 with the command ng new joes-robot-shop.
Javascript needs a javascript engine in order to run. Most browsers come with one. For development, in a developer machine, we need to install node.js. Node is the engine to run javascript on local machines.

# Creating components

As a recap, the base unit of angular are the so called components: they allow to define the HTML, CSS and javascript for a page. They can be a page or part of a page.

We can create a component by using the Angular CLI command:

```
ng generate component <componentName>
```

Inspecting the component typescript file, we observe 3 main sections:

1. Imports from angular
1. Component decorator: decorators are a javascript concept that allows adding metadata to a class or other type of object. We have the file for the template, an array of styles (we can add multiple styles for the same component). If we have very very small components, we could define the template and styles inline and delete the corresponding files.
   The selectors defines the html tage name that you can use to display this component inside the other components.
   The selector's prefix is app by default. so the generated component selector was 'app-home'. The prefix can be changed in the angular.json file.
1. TypeScript class: where we add properties, functionality and business logic to the component.

The CLI did more for us: it generated the files following the best practices. All components need to be imported into a module, and the CLI imported it to the app module.

Each component has its own style but we can define styles globaly in the application in the styles.css files.
We need to add images to our bot component: there is a standard place to put static resources like images and this place is _assets_ folder.
