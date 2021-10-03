var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = require('../app');
var utils = require('../util/utils');
const fs = require('fs');




//-----------
// Index page
//----------- 
router.get('/', function(req, res, next) {
  res.render('index', { 
    user: "", 
    errorMessage: "", 
    displayError: "style='display:none'"
  });
});




//---------------------------
// Login from url not allowed
//---------------------------
router.get('/login', function(req, res, next) {
  res.render('index', { 
    user: "",
    errorMessage: "You are not logged in", 
    displayError: "style=display:block"
  });
});




//----------------
// Login post form
//----------------
router.post('/login', function(req, res, next) {
    
    var users = app.users;

    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {

      if (users[email] != undefined) {
        // User in db

        if (password == users[email]["password"]) {
          // Login success

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
          // Login failed
          res.render('index', { 
            user: email, 
            errorMessage: "Incorrect password", 
            displayError: "style=display:block"
          });
        }
      } else {
        // User not exists. Login failed, 
        res.render('index', { 
          user: email,
          errorMessage: "Incorrect email", 
          displayError: "style=display:block"
        });
      }
      res.end();
    } else {
      res.render('index', { 
        user: email,
        errorMessage: "Incorrect email and/or password", 
        displayError: "style=display:block"
      });
      res.end();;
    }
  });


//--------------
// Logout button
//--------------
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



//-----------------------
// Register new user page
//-----------------------
router.get('/register', function(req, res, next) {
  res.render('register', { 
    user: "", 
    errorMessage: "", 
    displayError: "style='display:none'"
  });
});



//----------------------------
// Register new user post form
//----------------------------
router.post('/register', function(req, res, next) {

  var users = app.users;
  var email = req.body.email;
  var password = req.body.password;
  var repeatPassword = req.body.repeatPassword;

  if (email && password) {
    
    if (users[email] != undefined && repeatPassword == undefined) {
      // User in db
      
      if (password == users[email]["password"]) {
        // Login success
        
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
        // Login failed
        res.render('index', { 
          user: email, 
          errorMessage: "Incorrect password", 
          displayError: "style=display:block"
        });
      }

    } else if (users[email] == undefined && repeatPassword == undefined) {
      // User not exists and not creating new user. Login failed, 
      res.render('index', { 
        user: email,
        errorMessage: "Incorrect email", 
        displayError: "style=display:block"
      });

    } else if (users[email] == undefined && repeatPassword != undefined) {
      // User not exists. Register new user
      req.session.loggedin = true;
      req.session.username = email;

      users[email] = {
        "email": email,
        "password": password,
        "lastAccess": (new Date()).getTime()
      };
        
      utils.writeFile('users.json', users);

      res.render('welcome', {
        user: email.substring(0, email.indexOf('@')), 
        time: "" 
      });

    } else if (users[email] != undefined && repeatPassword != undefined) {
      // Trying to add an user that already exists
      res.render('register', { 
        user: email,
        errorMessage: "This email already exists", 
        displayError: "style=display:block"
      });

    }
    res.end();
  } else {
    res.render('index', { 
      user: email,
      errorMessage: "Incorrect email and/or password", 
      displayError: "style=display:block"
    });
    res.end();
  }
});



module.exports = router;

