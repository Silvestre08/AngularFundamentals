# JoesRobotShop
The node.js version used in this repo is 18.10.0. Use the following commands to setup node for this project 

```
nvm install 18.10.0
nvm use 18.10.0

```

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
Check how we reference images in the HMTL and CSS:

```
    <div class="promoted">
      <img src="/assets/images/robot-parts/head-friendly.png" alt="Friendly Robot Head" />
      <div class="promo-text">
        <div class="promo-main-text">DISPELL THE ROBOT APOCALYPSE MYTH</div>
        <div class="promo-sub-text cta">
          <div>SAVE 20% ON OUR FRIENDLIEST</div>
          <div>ROBOT HEADS</div>
        </div>
      </div>
      <img src="/assets/images/robot-parts/head-big-eye.png" alt="Big Eye Head" />
    </div>
```

```
  .hero {
    background-image: url("assets/images/hero-banner.png");
    background-repeat: no-repeat;
    height: 300px;
    background-size: cover;
    background-position: center center;
    text-align: center;
    margin-left: -8px;
    margin-right: -8px;
  }
```

It is worth mentioning that the assets can be referenced like this because the Angular CLI referenced them in tha angular.json file on the array assets. So if we want to add more assets folder we need to add it to angular.json.

Every component in angular has a lifecycle, that is defined by a series of events that occur throughout the life of the component. When an even occurs you can execute code using lifecycle hooks.
Some occur only once, some multiple times:
![](doc/lifecyclehooks.PNG)

Some of the hooks are more used than others. The hooks that are used the most are:
1. OnChanges - execute code when data changes.
1. OnInit - typically to fetch data.
1. OnDestroy - used for cleanup to avoid memory leaks.

We implement the hook on the component class by adding the 3 pieces:
1. Import the hook
1. Implement the interface
1. Add the method (do not forget to add the prefix ng).

# Angular template syntax

Interpolation is the process of putting expressions into our HTML that angular will evaluate and convert into HTML when it is rendered. Example:
```
<h1> 2 + 2 = {{2+2}} </h1>
```
Angular will render this as 2 + 2 = 4
We have some limitations though like: {{Math.Round(2+2)}}. This wont compile.Angular does it on purpose to limit the javascript expressions in HTML, The code should reside mostly in the component class. The curly braces is basic interpolation that we will use to bind data to HTML.
Like we do here:
```
<div class="description">{{product.description}}</div>
```
When the property changes the UI gets updated.

Check here what to do in the case of an image path generated dynamically:
```
<img src="{{'assets/images/robot-parts/'+ product.imageName}}" alt="" />
```
So far we've seen interpolation for binding. Let's see attribute binding 
[alt]="product.name"
when wrapping the html attribute in square brackets, we can use the javascript expression directly.
Lets see the image example with attribute binding: 
[src]="'assets/images/robot-parts/'+ product.imageName"
Important to not that the square brackets generate a one way binding from the component to the template. So if the user types in a text box, that would not change the data in the component.
To cleanup HTML we can use functions:
[src]="getImageUrl(product)"
See in the component class.
```
 getImageUrl(product: IProduct){
  return '/assets/images/robot-parts/' + product.imageName;
 }
```
Lets now use the *ngFor directive to render a list of products. The * means that this directives add or remove html on a page.
Lets change the <li> html element to render a list of products (this list in production would come from an API).
```
    <ul class="products">
      <li class="product-item" *ngFor="let product of products">
        <div class="product">
          <div class="product-details">
            <img [src]="getImageUrl(product)" [alt]="product.name" />
            <div class="product-info">
              <div class="name">{{product.name}}</div>
              <div class="description">{{product.description}}</div>
              <div class="category">Part Type: {{product.category}}</div>
            </div>
          </div>
          <div class="price">
            <div>${{product.price.toFixed(2)}}</div>
            <button class="cta">Buy</button>
          </div>
        </div>
      </li>
    </ul>
```
The product list gets generated. Cool!!!

What about bindings the other way around?
Lets see the on click event:

Notice we use normal brackets. Normal brackets mean the direction is going from the template to the component, so the opposite direction of the square brackets.
See     <a class="button" (click)="filter='Bases'">Bases</a>. We set a filter variable in our component and we add a new method to filter the list of products based on that filter:
  <li class="product-item" *ngFor="let product of getFilteredProducts()">

What about numm objects? Angular provide the *safe navigation operator* to prevent errors while rendering the page, *?*:
<div class="name">{{product?.name}}</div>

What about showing conditional elements in the page? We use the *ngIf directive. This example will show the discounted price, if an item has discount or the full price if the item does have discount:

```
          <div class="price">
            <div *ngIf="product.discount===0">${{product.price.toFixed(2)}}</div>
          <div class="discount" *ngIf="product.discount>0">
            ${{ (product.price * (1 - product.discount)).toFixed(2) }}
```

*ngSwitch is also a directive similar to *ngIf . We can also hide content with [Hidden] attributes but it is rare. 
It should only be used when the content is very complex and we should avoid rendering multiple times.

Pipes can be used to format data like currency, dates, percentages, etc..
Lets see an example of formatting a price:

```
{{ (product.price * (1 - product.discount)) | currency }}
```

# Styling Angular Components
*styles.css* is created by default and it is the main CSS file for the entire application. It is where we put in all the styles for our application