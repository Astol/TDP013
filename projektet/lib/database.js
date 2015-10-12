var mongodb = require("mongodb");
var db = null;

exports.startdb = function() {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/tdp013';
    MongoClient.connect(url, function(err, _db) {
      /* istanbul ignore if */
        if (err) throw err;
        db = _db;
    });
};

exports.saveuser = function(user, callback) {
    db.collection("users").find({ name: user.name }).toArray(function(err, docs){
        if (docs.length > 0)
        {
            callback(new Error("User already exists"),null);
            return;
        }
        db.collection("users").insert(user, function(err,success){
            if(err){
                callback(err, null);}
            else {
                console.log("Added user successfully!");
                var userwall = {"name": user.name,
                               "posts": []};
                db.collection("walls").insert(userwall, function(err, success){
                    if(err){
                        callback(err, null);}
                    else {
                        console.log("Added user to post db!");
                        callback(null,success);
                    }
                });
            }
        });
    });
};                             

            
exports.verifyuser = function(user, callback) {
    
    db.collection("users").find().toArray(function(err,docs){
        if(err){
            callback(err, null);}
        else{
            for(var i in docs){
                if(user["name"] == docs[i]["name"])
                {
                    if(user["pass"] == docs[i]["pass"])
                    {
                        console.log("Login successfull!!!!");
                        callback(null, docs[i]["name"]);
                    }
                    else
                    {
                        callback(new Error("Wrong Password"),null);
                    }
                }
            }
        }
    });
};

exports.addpost = function(message, callback) {
    var addto = message.to;
    delete message.to;
    db.collection("walls").find({"name": addto}).toArray(function(err, docs){
        db.collection("walls").update({ "name": addto },{ $push: { "posts": message } }, function(err,success){
            if(err){
                callback(err, null);
            }
            else{
                callback(null,{"name": addto});
            }
        });
    });
};

exports.getposts = function(user, callback){
    var getuser = user["name"];
    db.collection("walls").find({"name": getuser}).toArray(function(err, docs){
        if(err){
            callback(err,null);
        }
        else{
            var posts = JSON.stringify(docs[0]["posts"]);
            callback(null, posts);
        }
    });
};

exports.getsearch = function(search, callback){
    db.collection("users").find().toArray(function(err,docs){
        if(err){
            callback(err,null);
        }
        else{
            callback(null, docs);
        }
    });
};

/*
exports.addfriend = function(search, callback){
    db.collection("users").find().toArray(function(err,docs){
        if(err){
            callback(err,null);
        }
        else{
            callback(null, docs);
        }
    });
};
*/
