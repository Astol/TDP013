var mongodb = require("mongodb");
var bodyParser = require("body-parser");

module.exports = function(app)
{
    var dbmodule = require('./database.js');
    var db = dbmodule.startdb();
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
    app.use(require("express").static("../html"));

    app.post('/saveuser', function(req, res){
        var theuser = req.body;
        console.log(theuser);
        dbmodule.saveuser(theuser, function(err, result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else { res.sendStatus(200); }
        });
    });
    
    app.post('/verifyuser', function(req, res){
        var theuser = req.body;
        console.log(theuser);
        dbmodule.verifyuser(theuser, function(err, result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else { res.sendStatus(200); }
        });
    });

    app.post('/postmsg', function(req, res){
        var message = req.body;
        dbmodule.addpost( message , function(err,result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else { res.status(200).send(result); }  
        });
    });

    app.post('/getposts', function(req, res){
        var user = req.body;
        dbmodule.getposts( user, function(err, result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else { res.status(200).send(result); }
        });
    });

    app.post('/getusers', function(req, res){
        var users = req.body;
        dbmodule.getsearch( users, function(err, result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else {
                res.status(200).send(result); }
        });
    });

    /*
    app.post('/addfriend', function(req, res){
        var users = req.body;
        dbmodule.addfriend( useryou, function(err, result){
            if(err && err instanceof mongodb.MongoError) { res.sendStatus(500); }
            else if(err){ res.sendStatus(400); }
            else {
                res.status(200).send(result); }
        });
    });
    */
};
