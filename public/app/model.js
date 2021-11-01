var MODEL = (function(){
    function _route(navID, callback){
        // let hashTag = window.location.hash;
        // let pageID = hashTag.replace("#/", "");
        // console.log(hashTag);

        //if (!pageID){
        // if (navID == "home"){
        //     navToPage("home");
        // } else {
        //     navToPage(pageID);
        // }
        navToPage(navID);

        if (callback){
            callback(navID);
        }
    }

    function navToPage(pageName){
        $.get(`pages/${pageName}/${pageName}.html`, function(data){
            //console.log(data);
            $(".app").html(data);
        });
    }

    return {
        route : _route
    }
})();