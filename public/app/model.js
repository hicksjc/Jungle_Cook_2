var MODEL = (function(){
    function _route(navID, callback){
        let hashTag = window.location.hash;
        let pageID = hashTag.replace("#/", "");

        if (!pageID){
            if(navID =="home"){
                navToPage("home", callback);
            }
        }
        else {
            navToPage(pageID, callback);
        }
    }
    function navToPage(pageName, callback){
        $.get(`pages/${pageName}/${pageName}.html`, function(data){
            $(".app").html(data);
            if(callback){
                callback(pageName);
            }
        });
    }
    return {
        route : _route
    }
    // //accept the navID in a form called route!
    // function _route(navID, callback){
    //     let hashTag = window.location.hash;
    //     let pageID = hashTag.replace("#/", "");
    //     console.log(hashTag);

    //     //if the pageID is empty then navigate to the home page 
    //     if (!pageID){
    //     if (navID == "home"){
    //         navToPage("home");
    //     } //else navigate to the page that was clicked on by injecting it from the pages folder! 
    //     else {
    //         navToPage(pageID);
    //     }

    //     if (callback){
    //         callback(navID);
    //     }
    // }

    // //Inject the pages from the pages folder
    // function navToPage(pageName){
    //     //the ID of the navigation should be the same as the html file name in pages
    //     $.get(`pages/${pageName}/${pageName}.html`, function(data){
    //         //console.log(data);
    //         //inject the HTML into the app div.
    //         $(".app").html(data);
    //     });
    // }

    // return {
    //     route : _route
    // }
})();