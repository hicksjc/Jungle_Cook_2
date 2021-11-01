const navToggle = document.querySelector('.navToggle');
const navLinks = document.querySelectorAll('.nav__Link');


function showContent(pageID){
    //console.log(pageID);
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
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        //Signed In
        var user = userCredential.user;
      console.log("Signed In");
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
}
//Sign a user out with a signout button!!
function signOut(){
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
        // let hashTag = window.location.hash;
        // let pageID = hashTag.replace("#/", "");
        let navID = e.currentTarget.id;
        // console.log(pageID);

        MODEL.route(navID, showContent);
        if (navID == "login"){
            initLoginFunction();
        }
    })


    navToggle.addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('navOpen');
        console.log("class added");
    });
    navLinks.forEach(link => {
        link.addEventListener('click', (e) =>{
            document.getElementById('nav').classList.remove('navOpen');
        })
    })
}


$(document).ready(function(){
    initListeners();
    // root from in-info-web4.informatics.edu /~username/class-folder/Jungle_Cook/index.html#home
    // window.location.href = "index.html#/home";
    //window.location.href = "/Jungle_Cook_2/public/index.html#/home";
    try{
        let app = firebase.app();
        initFirebase();
        initListeners();
    } catch (e) {
        console.log(e);
    }
    MODEL.route("home", showContent);
})