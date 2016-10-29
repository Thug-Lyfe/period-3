/**
 * Created by butwhole on 05/09/2016.
 */
var preId = "58149baa585e2f0589ae"
var connection = require("../db/db");
var ObjectId = require('mongodb').ObjectId;

module.exports.allJokes =   function(callback){
    var db = connection.get();
    db.collection("jokes").find().toArray(function(err,data){
        if(err) callback(err,null);
        else callback(null,data);
    });
    //db.close();
};

module.exports.findJoke =   function(id,callback){
    var db = connection.get();
    db.collection("jokes").find({_id: ObjectId(preId+id)}).toArray(function(err,data){
        if(err) callback(err,null);
        else callback(null,data);
    });
};

module.exports.addJoke =    function(jokeToAdd,callback){
    var db = connection.get();
    db.collection("jokes").insertOne(jokeToAdd,function(err,data){
        if(err) callback(err,null);
        else callback(null,data);
    });
};

module.exports.editJoke =   function(jokeToEdit,callback){
    var db = connection.get();
    db.collection("jokes").replaceOne({_id: ObjectId(preId + JokeToEdit._id)},jokeToEdit,function(err,data){
        if(err) callback(err,null);
        else callback(null,data);
    });
};

module.exports.deleteJoke = function(id,callback){
    var db = connection.get();
    db.collection("jokes").deleteOne({_id: ObjectId(preId + id)},function(err,data){
        if(err) callback(err,null);
        else callback(null,data);
    });
};

module.exports.randomJoke = function randomJoke(callback){
    var db = connection.get();
    var data = db.collection("jokes").find().toArray(function(err,data){
        if(err) callback(err,null);
        else callback(null,data[Math.floor(Math.random() * data.length)]);
    });
    //db.close();
    }


