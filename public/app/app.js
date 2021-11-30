const navToggle = document.querySelector('.navToggle');
const navLinks = document.querySelectorAll('.nav__Link');
const login_btn = document.getElementById('login_nav');
const signout_btn = document.getElementById('signout_nav');

var ingredCounter = 3;
var instruCounter = 3;

function showContent(pageID){
    console.log(pageID);
    if(pageID == "view"){
        initView();
    }
}
function initView(){
    const pizzaView = document.querySelector(".pizza");
    console.log(pizzaView);
    pizzaView.addEventListener("click", showEdit);
}
// Show Login Form
function show_login(){
    // MODEL.route("login");
    // console.log(window.location.pathname + "#/login");
    // root from in-info-web4.informatics.edu /~username/class-folder/Jungle_Cook/index.html#login
    //window.location.href = "/Jungle_Cook_2/public/index.html#/login";
    MODEL.route("login", showContent);
}
// Init Firebase Function, Show if User is Signed in or not
function initFirebase(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log("User Signed In!");
        } else{
            console.log("User Signed out");
        }
    });
}
// Create a user using the Sign up Form
function createUser(){
    console.log("I've been called!!");
    let password = $("#password_Signup").val();
    let email = $("#Email_Signup").val();
    let fName = "James";
    let lName = "Hicks";
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        //signed in
        var user = userCredential.user;
        console.log(userCredential.user);
        //...
        window.location.href = "index.html#/browse";
        login_btn.style.display = "none";
        signout_btn.style.display = "inline";
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //..
    });

    
}
// Log in with the Login Form
function login(){
    console.log("Login");
    let password = $("#password").val();
    let email = $("#Email").val();
    login_btn.style.display = "none";
    signout_btn.style.display = "inline";
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        //Signed In
        var user = userCredential.user;
      console.log("Signed In");
      window.location.href = "index.html#/browse";
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
}
//Sign a user out with a signout button!!
function signOut(){
    login_btn.style.display = "inline";
    signout_btn.style.display = "none";
    firebase.auth().signOut().then(() => {
        console.log("Signed Out");
    }).catch((error) => {
        console.log(error);
    })
}

//Inject the page and make sure the hamburger menu opens by adding a class to the navigation!
function initListeners(){
    
    //console.log(navToggle);
    $(window).on("hashchange", function(e){
        //get the id of the navigations
        let navID = e.currentTarget.id;
        // console.log(pageID);

        //pass the navID to the route.
        MODEL.route(navID, showContent);
        if (navID == "login"){
            initLoginFunction();
        }
    })

    //navToggle = hamburger menu, when the hamburger menu is clicked it adds a class to the navigation called navOpen that opens up the navigation.
    navToggle.addEventListener('click', () => {
        //adds a class that opens up the nav
        document.getElementById('nav').classList.add('navOpen');
        console.log("class added");
    });
    //when any link inside of the navigation is clicked it removes the navOpen class.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) =>{
            document.getElementById('nav').classList.remove('navOpen');
            console.log("Class Removed");
        })
    })
}

function loadBrowse() {
    //Retrieve the JSON data from data.json
    $.getJSON("data/data.json", function(recipes){
        //create a function that displays each separate part of data into the div elements when on the browse page
        $.each(recipes.PIZZA, function(index, recipe){
            console.log("hello");
            $(".pizza-info").append(`<div class="title"><h3>${recipe.recipeName}</h3></div>
            <div class="description"><p>${recipe.recipeDescription}</p></div>
            <div class="time"><p>${recipe.time}</p></div>
            <div class="servings"><p>${recipe.servings}</p></div>`);
        });
        
    });
    // $.getJSON("data/data.json", function (recipes) {
    //   console.log(recipes.CHICKEN);
  
    //   $.each(recipes.CHICKEN, function (index, recipe) {
    //     console.log("recipe " + recipe.recipeName);
    //     $("#chicken").append(
    //       `<div class="title"><h3>${recipe.recipeName}</h3></div>
    //       <div class="description"><p>${recipe.recipeDescription}</p></div>
    //           <div class="time">${recipe.time}</div>
    //           <div class="servings">${recipe.servings}</div>`
    //     );
    //   });
    // });
    // $.getJSON("data/data.json", function (recipes) {
    //   console.log(recipes.CHOWMEIN);
  
    //   $.each(recipes.CHOWMEIN, function (index, recipe) {
    //     console.log("recipe " + recipe.recipeName);
    //     $("#chow").append(
    //       `<div class="title"><h3>${recipe.recipeName}</h3></div>
    //       <div class="description"><p>${recipe.recipeDescription}</p></div>
    //           <div class="time">${recipe.time}</div>
    //           <div class="servings">${recipe.servings}</div>`
    //     );
    //   });
    // });
    // $.getJSON("data/data.json", function (recipes) {
    //   console.log(recipes.BURGER);
  
    //   $.each(recipes.BURGER, function (index, recipe) {
    //     console.log("recipe " + recipe.recipeName);
    //     $("#burger").append(
    //       `<div class="title"><h3>${recipe.recipeName}</h3></div>
    //       <div class="description"><p>${recipe.recipeDescription}</p></div>
    //           <div class="time">${recipe.time}</div>
    //           <div class="servings">${recipe.servings}</div>`
    //     );
    //   });
    // });
  }


function addIngred(){
    ingredCounter++;
    $(".create-recipe-form-ing").append(`<input id="ind${ingredCounter}" type="text" placeholder="Ingredient #${ingredCounter}"/>`);
}
function addInst(){
    instruCounter++;
    $(".create-recipe-form-inst").append(`<input id="inst${instruCounter}" type="text" placeholder="Instruction #${instruCounter}"/>`);
}

function showEdit(){
    window.location.href="index.html#/edit";
    console.log("hello world");
}

$(document).ready(function(){
    initListeners();
    // root from in-info-web4.informatics.edu /~username/class-folder/Jungle_Cook/index.html#home
    // window.location.href = "index.html#/home";
    //window.location.href = "/Jungle_Cook_2/public/index.html#/home";
    loadBrowse();
    signout_btn.style.display = "none";
    try{
        let app = firebase.app();
        initFirebase();
        initListeners();
        
    } catch (e) {
        console.log(e);
    }
    MODEL.route("home", showContent);
})

//Deploy to firebase and then get the URL for that