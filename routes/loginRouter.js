var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = require('../app');
var utils = require('../util/utils');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    user: "", 
    errorMessage: "", 
    displayError: "style='display:none'"
  });
});

router.get('/login', function(req, res, next) {
  res.render('index', { 
    user: "",
    errorMessage: "You are not logged in", 
    displayError: "style=display:block"
  });
});

router.post('/login', function(req, res, next) {
    
    var users = app.users;

    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
      console.log(users[email]);
      if (users[email] != undefined) {
        if (password == users[email]["password"]) {
          req.session.loggedin = true;
          req.session.username = email;

          let lastAccess = users[email]["lastAccess"];

          users[email]["lastAccess"] = (new Date()).getTime();
          
          utils.writeFile('users.json', users);

          res.render('welcome', { 
            user: email.substring(0, email.indexOf('@')), 
            time: lastAccess 
          });
        } else {
          //res.send('Incorrect email and/or password');
          res.render('index', { 
            user: email, 
            errorMessage: "Incorrect password", 
            displayError: "style=display:block"
          });
        }
      } else {
        res.render('index', { 
          user: email,
          errorMessage: "Incorrect email", 
          displayError: "style=display:block"
        });
      }
      res.end();
    } else {
      res.send('Please enter email and password');
      res.end();
    }
  });

router.get('/logout', function(req, res, next) {
    console.log("logout get");
    var email = req.session.username;
    req.session.loggedin = false;
    req.session.username = "";
    res.render('index', { 
      user: email, 
      errorMessage: "", 
      displayError: "style=display:none"
    });

    res.end();
});

module.exports = router;

