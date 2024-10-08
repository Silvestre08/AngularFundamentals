# JoesRobotShop

The node.js version used in this repo is 18.10.0. Use the following commands to setup node for this project

```
nvm install 18.10.0
nvm use 18.10.0

```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0 with the command ng new joes-robot-shop.
Javascript needs a javascript engine in order to run. Most browsers come with one. For development, in a developer machine, we need to install node.js. Node is the engine to run javascript on local machines.

## Creating components

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

## Template syntax and binding

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

Lets now use the _ngFor directive to render a list of products. The _ means that this directives add or remove html on a page.
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
See <a class="button" (click)="filter='Bases'">Bases</a>. We set a filter variable in our component and we add a new method to filter the list of products based on that filter:

  <li class="product-item" *ngFor="let product of getFilteredProducts()">

What about numm objects? Angular provide the _safe navigation operator_ to prevent errors while rendering the page, _?_:

<div class="name">{{product?.name}}</div>

What about showing conditional elements in the page? We use the \*ngIf directive. This example will show the discounted price, if an item has discount or the full price if the item does have discount:

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

## Styling Angular Components

_styles.css_ is created by default and it is the main CSS file for the entire application. It is where we put in all the styles for our application.
Example of using 2 html classes in one control: <a class="button bold">

Angular gives an option of CSS encapsulation (thos does not come natively with css).
It handles some of the problems CSS has in general, when developers apply style to broadly or problems with styles that exist that we dont know if they are used anymore or not.
Lets see, if we go the catalog component and apply thos style to the anchor elements:

```
a {
 font-weight: bold;
}
```

This anchor style will be applied to all the anchor elements of the individual component. Not to the whole application. This is CSS encapsulation at component level.

We can include styles directly on the component class and not use a separate file for the component, but people do that almost never.

Now lets imagine we want to strike through the price of items that have discount greater than 0. We want to show the full price with a dash and the discounted price, like this:

![](doc/discountPrice.png)

There are several ways to do it. First, we have a class in css like this:

```
.strikeThrough
{
  text-decoration: line-through;
  font-size: 18;
}
```

Then we can use a directive similar like we have seen before:

```
<div [class.strikeThrough] ="product.discount >0">{{product.price | currency}}</div>
```

Here the class applied to this div element is the strithrough if the discount is greater than zero. This is called class binding.
This can get a little bit wordy if we have lots of classes.
An alternative is to use the ngClass binding.
This way I can give it multiple classes, each with a unique boolean condition that can apply to this:

```
<div [ngClass] ="{strikethrough: product.discount >0}">{{product.price | currency}}</div>
```

We can actually also use a function:

```
<div [ngClass] ="getDiscountedClasses(product)">{{product.price | currency}}</div>
```

We would write the function in the component like this:

```
 getDiscountedClasses(product: IProduct){
  return  {strikeThrough: product.discount >0}
 }
```

Or we could just return the string of the class as well: return 'strikeThrough'
Or multiple classes like : return 'strikeThrough bold', to apply multiple css classes. We can also just return array, so it is easier to add more classes.
It is also possible to use _class and ngClass_ together.
There is an analogous sort of feature for styles: ngStyle directive:
[ngStyle]="{color : product.discount > 0? 'green' : ''}"
Like the ngClass we could also transform this into a function.

There CSS frameworks like Saas, bootstrap and Tailwind. Saas is a flag we can setup when starting a new angular project. Cool feature like nested CSS, etc. Out of scope of this training.

## Communication between components

Components can contain other components. Communication between components becomes a need, specially when they share same pieces of data.
This communication is accomplished through a pattern called _one-way dataflow_
In _one-way dataflow_, the parent component contains the data, and it sends that data down to the child component. Example: a parent component might contain a list of costumers and a child component might display a single costumer.
Then, for example, when we want to deactivate a costumer that is not done directly from the child component. Instead, the child component communicates the event back to its parent component, that would then execute the action that changes state.
_one-way dataflow_: data goes down, events go up:
![](doc/oneWayDataFlow.png)

Coming to our example, on the catalog component lets extract the code inside the ng for list with a new product-details component.
It is in the html file that we push down the data, by using binding:

```
      <li class="product-item" *ngFor="let product of getFilteredProducts()">
       <bot-product-details [product] = "product"></bot-product-details>
      </li>
```

As we can see, we have a new product details component that has a product attribute. It needs an input decorator on this attribute. Inputs in angular is a way to communicate from parent to child to push the data down:

```
export class ProductDetailsComponent {
@Input() product! : IProduct; // input decorator directive
}
```

Now lets see how the communication between child component and parent component happens. By refactoring the catalog component, we introduced a problem. The add to cart method on the product details component is not adding any items to the cart, because the cart belongs to the catalog component, which makes sense!

We want to send an event to the catalog component, when the user presses the buy button on the product-details component and have the actual catalog component to do the job of adding the product to the cart.
The first step to do that is to use an Output decorator and declare an event emitter:

```
export class ProductDetailsComponent {
@Input() product! : IProduct;
@Output() buy = new EventEmitter(); // the EventEmitter type from angular
}
```

With those lines of code we create an event, and when the user clicks the buy button, the event is emitted:

```
 buyButtonClicked(product: IProduct){
  this.buy.emit();
}
```

We can send data in the emit method, but we do not needed because in the parent component, we have access to the product object through the ngFor directive:

```
    <ul class="products">
      <li class="product-item" *ngFor="let product of getFilteredProducts()">
       <bot-product-details [product] = "product" (buy)="addToCart(product)"></bot-product-details>
      </li>
    </ul>
```

The previous code is from the catalog component, the parent component. We handle the event like we handle all other events, like button clicks. The catalog takes care of adding the item to the cart.
This refactoring made the catalog component HTML way smaller. In production apps, child components improve radability by a lot.

## Creating Services

Services is where the business logic goes. Examples: calculate tax rate service, etc..
It is where the code that can be reused can go.
Services are made available to the components in 2 ways: dependency injection or injection functions.

Lets refactor one mora time the catalog component and remove the responsibility of managing the cart to a _cartService_:

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// service is just a class
export class CartService {

  constructor() { }
}

```

We can see that a service is basically a class. In order to be used within angular ecosystem it needs the _Injectable_ decorator. It was the word the angular team chose to mark classes as services.
The _providedIn: root_ basically tells angular that this service belongs anywhere in the angular application. Let's refactor the catalog!
The cart arrays is moved to the service. But how do we use the service in the component? We need to tell Angular that the catalog component needs an instance of the CartService. Angular will inject the cart service in the component.
To note: services in angular are singletons by default. It is what we need most of the time because we are managing state. So in the catalog component, we inject the service in the constructor:

```
 constructor(private cartService : CartService) {}
```

There is another way to do inject the cart service using the inject function, instead of performing constructor injection:

```
 private carSvc: CartService = inject(CartService) // the service type;
```

Constructor syntax is prefered because of tests.
Our example is very simple. But in real world apps with lots of logic, services are a powerful way of encapsulating business logic that can be reused. COmponents become responsible only for display logic. State management stays in services.

## Fetching and Manipulating data

In production apps, data is in a remote database, in a server somewhere. We fetch the data from the server and we update the data in the server. For that, we need to make http calls.

### Observables

Before digging deep, it is important to understand the concept of observables: a way to deal with asynchronous data.
Back in the old days, we would request something from a server and the response would be fetched in a callback method. This has problems.
Then we had _Promises_ and finally obsevables.
Observables are powerful because they can handle streams of data.
This is the observable design pattern shining.
We subscribe to the observable with a callback function that receives the data that is comm=ing through the observables:
![](doc/observable.png)

We get the observable from Angular itself.
Similar to .net, instead of the next callback we can also provide callbacks for erros and oncomplete (see observable pattern).

Sometimes we want to modify the data coming from the server before hitting the observable. We can do that with _pipe_ functions.
They allow us to process data so we can reuse this in all places in code that we subscribe to the observable.
Summarizing:
![](doc/dataPipes.png)

### Get requests

In production environments our app will interact with serves. It will fetch data from servers or ask the server to carry certain actions.
With this project we configured a little node server running on localhost port 8081.
We can configure a proxy for all requests to go here by adding a file proxy.conf.json:

```
{
    "/api":
    {
        "target":"https://localhost:8081",
        "secure" : false
    }
}
```

In the _angular.json_ file we add for the development environment:

```
 "development": {
              "browserTarget": "joes-robot-shop:build:development",
              "proxyConfig": "src/proxy.conf.json"
            }
```

So now when we make a request to something that starts with slash API it will proxy that over to the node server.
Now, lets refactor the catalog page to fetch the data using an http request.
It is a best practice to make the http calls inside of a service to share data between different components.
We can use the htpp client module in order to perform API calls. So we need to reference that module in _app.module.ts_
We created this product service that will perform the htpp call.
This product service gets injected in the catalog component:

```
 ngOnInit(){
this.productService.getProducts().subscribe(products =>
  {
    this.products = products;
  });
 }
```

Bear in mind, that the service returns an observable. Only when we subscribe to the observable the http call gets sent.
Usually http requests are not made in the constructor but in one of the hooks of the page, kike _ngOnInit_

### Post requests

Post requests send data to the server. In our case, lets refactor the method add to cart. In a real world app this would be a call to the server:

```
  add(product: IProduct){
    console.log(`product ${product.name} added to cart`)
    this.cart.push(product)
    // the call is made only when subscribe is called
    // angular converts directly the object to json
    this.http.post('/api/cart', this.cart).subscribe(cart => {

    });
  }
```

## Routing

When we navigate to a URL of an Angular application, the browser loads big chunks of the app into memory.
When we navigate to a particular URL, the browser simply displays that portion of the app that matches the URL (certain component), instead of loading a whole new page.
We basically match components, with routes (or URLs).
We can include routing when we first create the app with the Angular CLI. We did not to learn how it works.
By default, Angular puts routing in a separate module so we created a new module for the routing.
We need to import the new module in the app.module.
We changed the default generated module to look like a routing module:

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

Routes are basically URL mappings to components. See the array of routes we provide to the Angular Router module.
See the special syntax _forRoot_. We are providing the routes for the rro of our application.
We also have _forChild_. With _forChild_ we would be providing the child routes that apply to that module.
Because when we navigate to a different page, we want the page to be rendered in the app component, right below the header. App component:

```
<bot-site-header></bot-site-header>
<router-outlet></router-outlet>
```

Putting everything together, we need to add routes to the array in the routing module:

```
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
  { path: 'catalog', component: CatalogComponent, title: "Catalog - Joe's Robot Shop" },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
  { path: '', redirectTo: '/home', pathMatch: 'prefix' }
]
```

The path property is the root folder for the component. The component is the component to be rendered. The title is the text displayed in the browser tab.
At this point in time when we navigate to the URL only the site header is displayed. We need to add a redirect to the home page in order to display that as the first page on our website:

```
  {path: '', redirectTo: '/home', pathMatch: 'full' }
```

The empty path is basically the route of our application. So we configure the redirect to home with path match to full. This path match strategy ensures that this route is only activated when the URL exactly matches the specified path. In this case, an url that matches exactly the roote url.
There are other strategies like the pathMatch: 'prefix'. This is the default strategy. It matches the beginning of the URL against the route's path. If the URL starts with the specified path, the route is considered a match. Order of the routes in the dictionary matters so if we had the empty route as the fisrt element with a pathMatch prefix, we would ALWAYS end up at the home page. Carefull!!!

In order to add navigation to the site header buttons, we do that with a _routerLink_ directive:

```
<a routerLink="/catalog">Catalog</a>
```

We can also navigate programatically:

```
addToCart(product: IProduct){
  this.cartService.add(product);
  this.router.navigate(['/cart']); // Inject angular router in the constructor of catalog component.
}
```

The navigate function supports an array of parameter as arguments (similar to router link). This is needed for more complex navigation: think of a navigation to a user page and we need to send an user Id as an argument.
Lets do an example: from the home page we want to navigate to the catalog page, by clicking on a type of robot part: heads, for example. When we navigate to the catalog page we want the catalog page to filter by the type choose in the home page.
First, we need to configure the catalog route with a filter like this:

```
{ path: 'catalog/:filter', component: CatalogComponent, title: "Catalog - Joe's Robot Shop" },
```

The ":" tells angular this is going to be an URL parameter.
Nowe in the come page we add the new routes to the Anchor tags:

```
 <a routerLink="/catalog/Arms" class="part">
```

Now, in the catalog component we need to inject the _ActivatedRoute_. This will allow us to access the routing when the component inits:

```
  this.filter = this.route.snapshot.params['filter'];
```

We access the filter parameter of the component and we set the filter property of the catalog component. So when we navigate from the home component, by clicking in one of the parts we navigate immediatly to a filtered catalog component.

Attention to the snapshot: it is fine for most of the time, but it is initialized when the component is first loaded and it works when we are linking from on component to the other, but not when we link from the component to itself, because the component is already loaded and the snapshot will be stale.
We can verify that if we try to filter by part within the catalog component, by using the buttons from the top: if we replace the button clicks with router links we would see the url not changing when we filter by a robot part inside the catalog component itself.

```
 <div class="filters">
      <a class="button bold" (click)="filter='Heads'">Heads</a>
// replace to
       <div class="filters">
      <a class="button bold" routerLink='/catalog/Heads'>Heads</a>
```

So instead of using the snapshot, we can use the params object, that is an observable: we subscribe to it and we would be notified every time the param object changes in the URL, in the catalog component:

```
//oninit
 this.route.params.subscribe(params =>{
  this.filter = params['filter'] ??  ''
  });
```

For empty parameter we need to use binding syntax, so Angular recognizes the route:
<a class="button" [routerLink]="['/catalog/', '']">All</a>

When the parameters are not required, query filter parameters are more standard practice than route parameters.
To do that we remove the filter param from the app.routes.
Then change the router links back to just _/catalog_. We then add the following:

```
[queryParams]="{filter: 'Bases'}"
```

So with that line of code we include the /Bases as query parameter in the URL and we achieve the same result. We do the same on the buttons of the catalog component:

```
 <a class="button bold" routerLink='/catalog' [queryParams]="{filter: 'Heads'}">Heads</a>
```

As the last step, in the class file of the catalog component, we replace the route.params with queryParams:

```
 this.route.queryParams.subscribe(params =>{
  this.filter = params['filter'] ??  ''
  });
```

And we see the URl changing with the query parameters:
http://localhost:4200/catalog?filter=Heads

We can use a directive _routerLinkActive_ to style active routes, that also works with query params:

```
  <a class="button bold" routerLink='/catalog' [queryParams]="{filter: 'Heads'}" routerLinkActive="active">Heads</a>
```

But, by default, this directive works if part of the URL matches the route. Like that, the _all_ button would always be active because it does not have any query params but the route matches partially the URL. So for that we need to bind an options object:

```
      <a class="button" routerLink='/catalog/' routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">All</a>
```

## Angular Forms

We have two forms for collecting data:

1. Template forms: almost completely defined in the HTML template. More simple but we can end up with a lot of logic in the HTML.
1. Reactive forms: most of the form and validation defined in the component class. Suitable for more complex forms and are more testable. Out of scope of this module: CHECK HERE.

In order to use template driven forms we need to import that in the _app.module_.
This section we will add a sing in component for user to log in into our app.
Square brackets bind in the direction from the component to the template. The parentheses bind from the template to the component.
The _ngModel_ is a special angular directive that lets us bind in both directions.
When we use the _ngModel_ directive we need to have a name attribute in our HTML element because _ngModel_ uses the name internally to track the element.
Example of a two way binding in our sign-in component:

```
      <input
        name="email"
        [(ngModel)]="credentials.email"
        placeholder="Email Address"
        type="text"
      />
```

There is an Angular directive that we can use in forms like sign-in forms called _ngSubmit_.
When we have a Button with the type submit we can just bind the component function that needs to be called when the user signs in:

```
 <form class="form" (ngSubmit)="signIn()">
```

```
    <button type="submit"class="button cta">
```

If the user signs in successfully we want to redirect to the catalog page:

```
this.userService.signIn(this.credentials).subscribe(
  {
    next: ()=> this.router.navigate(['/catalog'])
  });
```

We can enrich the application further. When a login failed we can show an error message, using the ngIf directive:

```
      <div class="signInError" *ngIf="signInError" > // set signInError to true if login failed by handling the error: delegate of the observable
        sign-in failed. Please try again
      </div>
```

In the site header component, we can subscribe to the observalbe logged in user and if we get a user we can hide the register and sign in menus and just show a profile picture:

```
    <div class="right" *ngIf="!user"> // if we have a user property different than null
      <a routerLink="/sign-in">Sign In</a>
      <a href="" class="cta">Register</a>
    </div>
    <div class="right" *ngIf="user">
      <div>
        <img src="/assets/images/profile.png" alt="profile" (click)=" toggleSignOut()" />
        <div class="sign-out" *ngIf="showSignOutMenu">
          <button (click)="signOut()">
            Sign Out
          </button>
        </div>
```

We can use template variables to include validation in the template driven forms. We use the # to define a template variable. We can then access that variable anywhere in the HTML template.
Lets prevent the user to click the submit button if the email and password are not valid.

First, at the form level we need to add a template variable that references the ngForm directive, that gives us a lot of information about the form.
Then we add a template variable to each of the input forms, email and password.
So when we do that Angular generate values for these template variables that change based on the state of the input fields:
![](doc/validators.png)

As an example: touched becomes true if any of the controls of the form have been touched with the mouse.
So if a field is required we can setup a validation rule like this:

```
      <input
        name="email"
        #email = "ngModel"
        required //required attribute
        [(ngModel)]="credentials.email"
        placeholder="Email Address"
        type="text"
      />
      <em class="error" *ngIf="email.invalid && email.touched" >Email is required</em>
```

We show the em element when the email field is invalid (so far has no value) and when it has been already touched in the mouse for greater user experience.
We can access the ngFrom template variable to assess if the whole form is valid and use it for example to disable the submit button if the form as a whole is still invalid:

```
    <button type="submit" [disabled]="signInFomr.invalid" class="button cta">
          Sign In
        </button>
```

Angular built in validators:
![](doc/builtinValidators.png)
How to combine validator and how to control which message to be displayed? We add more validators simply by adding more attributes to the html elements like _email_. Angular then provides an error object that will contain all validation errors, if they exist. Note: use safe navigation to this error objects:

```
      <em class="error" *ngIf="email.errors?.['required'] && email.touched" >Email is required</em>
      <em class="error" *ngIf="email.errors?.['email'] && email.touched" >Email is invalid/em> // display error for the 'email' validation
```

Angular pays attention to the type attribute of the HTML elements. If we put type as number, the user input will be converted to a number for example. Check the template-forms-controls component.
Use ngValue to preserve the data type of the bound value with options elements.
Check more forms and models in other courses!.

## Modules

Modules are an organizational container within an angular application. What is inside of that container?

1. Components
1. Services
1. Routes
1. Custom pipes

These parts are grouped together in a logical way in the scope of an application. Modules can import other modules like we've seen.Every application has a main module. Ours is app.module.ts that contains all components that we created so far. Services belong to the module of the components that import them.
Modules are optional. So why use them? It is a subjective topic but applications are clearer to understand if we have modules.
Modules were the default way to build applications, so a lot of apps out there use modules.
We have created our routing modules: it only contains routes. This module imports and exports angular _RouterModule_. Because we export it, then the features of the RouterModule are available to us in the main module: like the routerLink directive.

Other types of modules are feature modules: components, pipes,etfc..
For demonstration purposes we are going to create a user module. It will include everything inside the user folder: sign in component and template-form controls.
We use the command: _ng generate module user_. It generates a module file for us. Im that file we import our components and all the dependencies like Forms module and Anggular module. This is something to pay attention when refactoring into modules.
Modules keep the app organized and avoid big app.module files.
There is another purpose for modules: lazy loading.

## Execute tests

npm test
npm run e2e
Check here for unit test deep dive.
