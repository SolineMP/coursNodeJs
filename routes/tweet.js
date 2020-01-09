var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const dbConnection = require('../dbConnection')

/* GET tweet */

router.post('/', function (req, res, next) {
    console.log(req.body.message);
    dbConnection(function (db) {
      db.collection('tweets')
        .insertOne({
          tweet: req.body.message,
          user: {
            
            id : req.session.user._id,
            name : req.session.user.name,
            avatar : req.session.user.avatar,
          },
          date: new Date(),
          likes: [],
          retweets: [],
          comments: []
        });
        res.status(201).json({}); 
    });
  })

/* READ One Tweet */

router.get('/:id', function(req, res, next) {
    console.log(req.params.id)

    dbConnection(function(db){
        db.collection('tweets') 
            .findOne({ _id: new ObjectId(req.params.id) }, null, function(err, tweet){
                if (err) {
                    return
                } 
                console.log(tweet)
                res.render('editTweet', { title: 'Twitter', tweet: tweet })
            })
    })
})

/* UPDATE tweet */

router.put('/:id', function(req, res, next) {
    dbConnection(function(db) {
        db.collection('tweets')
        .updateOne({ _id : new ObjectId(req.params.id)}, {$set: {tweet: req.body.message}}, null, function(err) {
            res.end();
        })
    })
}) 

router.delete('/:id', function(req, res, next) {
  dbConnection(function(db) {
      db.collection('tweets')
      .updateOne({ _id : new ObjectId(req.params.id)}, {$set: {tweet: req.body.message}}, null, function(err) {
          res.end();
      })
  })
}) 

module.exports = router;