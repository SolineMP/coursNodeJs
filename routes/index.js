var express = require('express');
var router = express.Router();
/* Pour créer un objectID */
const ObjectId = require('mongodb').ObjectID;
/* Pour se connecter à la DB */
const dbConnection = require('../dbConnection')

const findTweets = function(db, callback) {
  db.collection('tweets')
  .find({})
  .toArray(function(err, docs) {
    callback(docs);
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session)
 // Use connect method to connect to the server
  dbConnection(function(db) {
  // Accéder aux tweets 
    findTweets(db, function(tweets){
      res.render('index', { title: 'Twitter', posts: tweets, user: req.session.user });
    }) 
  });
});
module.exports = router;

/* Search page */

router.get('/search', function(req, res, next) {
  console.log(req.query.input)
  const regex = new RegExp('.*'+ req.query.input +'.*', 'i')
  dbConnection(function(db) {
    db.collection('tweets')
    .find({tweet: regex })
    .toArray(function(err, tweets) {
      console.log(tweets)
      res.render('showTweet', {posts: tweets}, function(err, html) {
        res.json({template: html}).end()
      });
    })
  })
})
