/**
 * Created by butwhole on 10/10/2016.
 */
var express = require('express');
var router = express.Router();
var client = require('../db/redisClient')
var async = require('async');

router.get('/getKeys', function(req, res) {

    client.keys('*sess:*', function (err, keys) {
        if (err) return console.log(err);
        var handler = function(trythis){
            var arr = [];
            async.series([function(callback){
                keys.forEach(function(key){
                    client.get(key,function(err,reply){
                        if (err) throw err;

                        arr.push({key: key, user: JSON.stringify(JSON.parse(reply).user)});

                        //res.send(key + " : " + JSON.stringify(reply.toString()));

                    });

                });
                callback(arr)
            }], function(err,results){
                trythis(err,results)
            });
        }



        handler(function(err,results){
            if(!err){
                res.render('index', { keys: arr});
            }
        })
    });

});

router.get('/', function(req, res, next) {

});
module.exports = router;