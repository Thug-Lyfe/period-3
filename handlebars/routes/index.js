var express = require('express');
var router = express.Router();
var jokes = require(__base+ 'model/jokes.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,stuff:'click to get joke'});
});

router.get('/joke', function(req, res, next) {

  res.render('joke', { title: 'Joke', joke: jokes.getRandomJoke()});
});

router.get('/allJokes', function(req, res, next) {
  var j = [];
  jokes.allJokes(function (err, data) {
    data.forEach(function(joke){
      j.push(joke)
    })
  })
  res.render('allJokes', { title: 'All Jokes', jokes: j});
});

router.get('/newJoke', function(req, res, next) {
  res.render('newJoke', { title: 'New Joke'});
});
router.post('/storeJoke',function(req,res){
  jokes.addJoke(req.body.njoke)
  router.redirect('/newJoke')
});

module.exports = router;
