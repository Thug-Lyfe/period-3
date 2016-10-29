var express = require('express');
var router = express.Router();
var jokes = require(__base+ 'model/jokes.js');
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {

  jokes.allJokes(function (err, data) {
  if(err)console.log(err);
    else{
  res.render('index', {
    title: 'Express' ,
    stuff:'click to get joke',
    allJokes: data});
   }
});
});

router.get('/randomJoke', function(req, res, next) {
  jokes.randomJoke(function(err,data){
      if(err){console.log(err)}
      else{
        res.render('index', {
          title: 'Express' ,
          stuff:'click to get joke',
          allJokes: data});
      }

  });
});
router.get('/allJokes', function(req, res, next) {
  jokes.allJokes(function (err, data) {
    if(err)console.log(err);
    else{
      res.render('index', {
        title: 'Express' ,
        stuff:'click to get joke',
        allJokes: data});
    }
  });
});

router.get('/joke/:id', function(req, res, next) {
  jokes.findJoke(req.params.id,function (err, data) {
    if(err)console.log(err);
    else{
      res.render('index', {
        title: 'Express' ,
        stuff:'click to get joke',
        allJokes: data});
    }
  });
});

router.post('/newJoke', function(req, res, next) {
  var joke = {};
  joke.joke = req.body.joke;
  joke.lastEdited = new Date();
  jokes.addJoke(joke,function(err,data){
    if(err)console.log(err);
    else{
      res.render('index', {
        title: 'Express' ,
        stuff:'click to get joke',
        allJokes: data});
    }
  })
});
router.put('/editJoke',function(req,res){
  var joke = {};
  joke.joke = req.body.joke;
  joke.lastEdited = new Date();
  jokes.editJoke(joke,function(err,data){
    if(err)console.log(err)
    else{
      res.render('index', {
        title: 'Express' ,
        stuff:'click to get joke',
        allJokes: data});
    }
  })
});

router.delete('deleteJoke/:id',function(req,res){
  jokes.deleteJoke(req.params.id,function(err,data){
    if(err)console.log(err);
    else{
      res.render('index', {
        title: 'Express' ,
        stuff:'click to get joke',
        allJokes: data});
    }
  })
});
module.exports = router;
