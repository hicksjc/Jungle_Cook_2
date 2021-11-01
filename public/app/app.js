const navToggle = document.querySelector('.navToggle');
const navLinks = document.querySelectorAll('.nav__Link');


function showContent(pageID){
    console.log(pageID);
}

function show_login(){
    // MODEL.route("login");
    // console.log(window.location.pathname + "#/login");
    // root from in-info-web4.informatics.edu /~username/class-folder/Jungle_Cook/index.html#login
    window.location.href = "/~hicksjc/N315/Jungle_Cook_2/index.html#/login";
}
function initFirebase(){
    firebase.auth().onAuthStateChanged(function (user){
        if (user){
            console.log("User Signed In!");
        } else{
            console.log("User Signed out");
        }
    });
}
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
function login(){
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
function signOut(){
    firebase.auth().signOut().then(() => {
        console.log("Signed Out");
    }).catch((error) => {
        console.log(error);
    })
}

function initListeners(){

    
    
    console.log(navToggle);
    $(window).on("hashchange", function(e){
        let hashTag = window.location.hash;
        let pageID = hashTag.replace("#/", "");
        // console.log(pageID);

        MODEL.route(pageID);
        if (pageID == "login"){
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
function initLoginFunction(){
    $(".signin_btn").click(function(e){
        e.preventDefault();
        let btnID = e.currentTarget.id;
        if (btnID == "create"){
            createUser();
        } else if (btnID == "log_in"){
            login();
        } else {
            signOut();
        }
    });
    $(".login_form_btn").click(function(e){
        e.preventDefault();
        let btnID = e.currentTarget.id;
        if (btnID == "create"){
            createUser();
        } else if (btnID == "log_in"){
            login();
        } else {
            signOut();
        }
    });
}


$(document).ready(function(){
    initListeners();
    // root from in-info-web4.informatics.edu /~username/class-folder/Jungle_Cook/index.html#home
    // window.location.href = "index.html#/home";
    window.location.href = "/~hicksjc/N315/Jungle_Cook_2/index.html#/home";
    try{
        let app = firebase.app();
        initFirebase();
        initListeners();
    } catch (e) {
        console.log(e);
    }
    MODEL.route("home", showContent);
})