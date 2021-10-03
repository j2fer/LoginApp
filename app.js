var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var loginRouter = require('./routes/loginRouter');
var utils = require('./util/utils')

var app = express();




//------------------
// View engine setup
//------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));




//----------------
// Read users file
//----------------
let users = utils.readFile('./users.json');

exports.users = users;




//-----------
// Set router
//-----------
app.use('/', loginRouter);



//---------------------------------------
// Catch 404 and forward to error handler
//---------------------------------------
app.use(function(req, res, next) {
  next(createError(404));
});



//--------------
// Error handler
//--------------
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
