var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = require('../app');

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

    console.log('auth------------');

    //console.log(req.users);
    console.log('auth2------------');
    
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
      console.log("email: "+email);
      console.log(users[email]);
      //console.log(users[email]["password"]);
      if (users[email] != undefined) {
          
        if (password == users[email]["password"]) {
          console.log(1);
          console.log(req);
          console.log(2);
          console.log(req.session);
          
          req.session.loggedin = true;
          req.session.username = email;

          console.log(req.session.username);
          console.log(req.session.loggedin);

          //res.redirect('/welcome');
          res.render('welcome', { user: email.substring(0, email.indexOf('@')), time: users[email]["lastAccess"] });
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

