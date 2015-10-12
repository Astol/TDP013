
var name = $.cookie("name");
$("#namehead").text(name);

var getfrom = {"name": name};

getAllPosts(getfrom);

function getAllPosts(jsonname){
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:3000/getposts",
            data: jsonname,
            success: addAllSite
        }
    );
};

$(document).ready(function() {

    $( "#submitmsg" ).click(function(){
        var dt = new Date();
        var time = dt.toDateString();
        
        var thepost = [$("#msgboard").val(), name, time];
        
        var form = {"to": $("#namehead").text() , "body": $("#msgboard").val(), "from": name, "time": time};
        
        $.ajax(
            {
                type: "POST",
                url: "http://localhost:3000/postmsg",
                data: form,
                success: getAllPosts
            }
        );
    });


    $("#namesearch").on("input", function(){
        sendLiveSearch();
    });

    $("#submit").click(function(){
        var username = $("#namesearch").val();
        console.log(username);
        $("#namehead").text(username);
        var getfrom = {"name": username};
        getAllPosts(getfrom);
    });

    $("#logout").click(function(){
        alert("logout!");
        $.removeCookie("name");
        window.open("http://localhost:3000/home.html", "_self");
    });
/*
    $("#friend").click(function(){
        var friend = $("#namehead").val();
        addFriend(friend);
    });
*/
   /* $("#unfriend").click(function(){
        var unfriend = $("#namehead").val();
        
    });*/
    
});


function addPostSite(topost){
    $("#posts").prepend("<li>" + topost[0] + "<p>"+ "<b>" + topost[1] + ":   " + "</b>" + topost[2] + "</p>" + "</li>");
}

function addAllSite(data){
    $("#posts").empty();
    var jsonObj = $.parseJSON(data);
    for(var i in jsonObj){
        add = [jsonObj[i]["body"], jsonObj[i]["from"], jsonObj[i]["time"]];
        addPostSite(add);
        add = [];
    }
};

function sendLiveSearch(){
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:3000/getusers",
            success: getLiveSearch
        }
    );
};
function getLiveSearch(data){
    var searchres = [];
    for(var i in data){
        searchres.push(data[i]["name"]);
    };
    $("#namesearch").autocomplete({
        source: searchres,
        messages: {
            noResults: "",
            results: function(){}
        }
    });
};
/*
function addFriend(friend){
    var form = { "friend": friend, "you": $.cookie("name")};
    $.ajax(
        {
            type: "POST",
            url: "http://localhost:3000/addfriend",
            data: form,
            success: 
        }
    );
};

function succs(data){
    console.log(data);
    
};
*/
