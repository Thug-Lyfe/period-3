/**
 * Created by butwhole on 05/09/2016.
 */
var connection = require("../db/db");
var mongodb = require('mongodb');
var jokes = [
    "alex is such a faggot, that it is not even funny anymore",
    "at what age is it appropriate to tell your son he is not really a virgin",
    "wat?"
];


module.exports.allJokes =   function(callback){
    var db = connection.get();

    db.collection('jokes').find({}).toArray(function (err, data) {
        if(err){ callback(err);}
        else {callback(null,data);}
    })
    //var db = connection.close();
};
module.exports.findJoke =   function(id,callback){

    callback(null, jokes.get(id))
};
module.exports.addJoke =    function(jokeToAdd,callback){
    var db = connection.get();

};
module.exports.editJoke =   function(jokeToEdit,callback){};
module.exports.deleteJoke = function(id,callback){};
module.exports.randomJoke = function randomJoke(callback){
        return callback(jokes[Math.floor(Math.random() * jokes.length)]);
    }


