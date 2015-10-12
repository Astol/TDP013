
var loginuser;
var audio = new Audio("magicword.wav");
audio.loop = true;

$(document).ready(function() {
    
    $( "#formswitch" ).click(function(e){
        $("#error").text("");
        
        if($("h1").text() == "Login"){
            $("h1").text("Register");
            $("#logreg").text("Register");
            $("#formswitch").text("Login");
        }
        else{
            $("h1").text("Login");
            $("#logreg").text("Login");
            $("#formswitch").text("Register");
      }
        
        e.preventDefault();
    });
    
    $( "#logreg" ).click(function(){
        $("#error").text("");
        
        if($("h1").text() == "Login")
        {
            var form = {"name" : $("#name").val(), "pass" : $("#password").val(), "status": "singel"};
            loginuser = form["name"];
            $.ajax(
              {
                  type: "POST",
                  url: "http://localhost:3000/verifyuser",
                  data: form,
                  success: great,
                  error: passError
              }
            );
        }
        else
        {
            var form = {"name" : $("#name").val(), "pass" : $("#password").val(), "friends": [], "status": "singel"};
            $.ajax(
                {
                  type: "POST",
                    url: "http://localhost:3000/saveuser",
                    data: form,
                    error: regError
              }
            );
        } 
    });    
});

function great(data){
    $.cookie("name", $("#name").val());
    window.open("http://localhost:3000/profile.html", "_self");
};

function passError(data){
    audio.play();
    $("#error").text("Wrong password!");
    
};

function regError(data){
    $("#error").text("User already exists!");
};
