"use strict";
var express =  require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var exprEJSLay = require('express-ejs-layouts');

//Routes
var index =  require(path.join(__dirname,'routes/index.js'));
var user =  require(path.join(__dirname,'routes/users.js'));
var auth = require(path.join(__dirname,'routes/auth.js'));
var game = require(path.join(__dirname,'routes/game.js'));

var app = express();

//HTTP & HTTPS
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    passphrase: '1a2s3d4f5g6h7j8k9l0'
};

function ensureSecure(req, res, next){
  if(req.secure || req.headers["x-forwarded-proto"] === "https"){
    return next();
  };
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}

//EJS Settings
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middleware for layout
app.use(exprEJSLay);

//cookieSesssion middleware
app.use(cookieSession({
  name: 'session',
  secret: '1a2s3d4f5g6h7j8k9l0',
  maxAge: 24 * 60 * 60 * 1000
}));

//Other middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower',express.static(path.join(__dirname,'bower_components')));

//check https
app.all('*', ensureSecure);

//routes
app.use('/',index);
app.use('/auth/',auth);
app.use('/user/',user);
app.use('/game/',game);

//Catch 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

mongoose.connect('mongodb://localhost/web_monopoly');
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', err => {
  console.log('Mongoose Error. ' + err);
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

process.on('SIGINT', function () {
  console.log("Terminando el servidor...");
  process.exit(0);
});