var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const dbConnection = require('../dbConnection')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/userCo', function (req, res, next) {
  res.render('userCo')
})

router.post('/userCo', function(req, res, next) {
  console.log(req.body)
  dbConnection(function (db) {
    db.collection('users')
    .findOne({name: req.body.nick, password: req.body.password}, null, function(err, user) {
      if (user !== null) {
        req.session.user = user
        res.redirect('/')
      } else {
        res.redirect('/users/userCo')
      }
    })
  })
})

router.get('/logout', function(req, res, next) {
  console.log(req.body)
  req.session.destroy(function (err) {
    res.redirect('/')
  })
})

