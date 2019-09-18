var express = require('express');
var router = express.Router();

var userModel = require('../models/user');

/* POST sign-up route. */
router.post('/sign-up', function(req, res, next) {
  userModel.findOne(
    { email: req.body.emailFromFront }, function (err, user) {
    if(!user){
      var newUser = new userModel({
        username: req.body.usernameFromFront,
        email: req.body.emailFromFront.toLowerCase(),
        password: req.body.passwordFromFront,
      });
      newUser.save(
        function(error, user) {
          console.log("STEP 1 | USER SAVED ---> ", user)
          // Once the user is saved, and the script is completed, I want to ask my database to give me all the cities (it will return "citiesFromDataBase" as I defined it). To do so, I can use find()
          req.session.user = user;
          res.redirect('/cities');
        });
    } else {
      console.log("user already exist");
      res.redirect('/')
    }
  });
});

/* POST sign-in route. */
router.post('/sign-in', function(req, res, next) {
  userModel.findOne(
    { email: req.body.emailFromFront.toLowerCase(),
      password: req.body.passwordFromFront
    },
    function (err, user) {
      console.log("JE SUIS ICI")
      console.log(user)
      console.log(req.body.passwordFromFront)
    if(user){
      req.session.user = user;
      res.redirect('/cities');
    } else {
      console.log("wrong password");
      res.redirect('/')
    }
  });
});

/* GET new home login page. */
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  console.log(req.session.user);
  res.redirect('/')
});

module.exports = router;
