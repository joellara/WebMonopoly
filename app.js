"use strict";
var express = require('express');
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
var index = require(path.join(__dirname, 'routes/index.js'));
var user = require(path.join(__dirname, 'routes/user.js'));
var auth = require(path.join(__dirname, 'routes/auth.js'));
var game = require(path.join(__dirname, 'routes/game.js'));
var api = require(path.join(__dirname, 'routes/api.js'));

//HTTP & HTTPS
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    passphrase: '1a2s3d4f5g6h7j8k9l0'
};

function ensureSecure(req, res, next) {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
        return next();
    };
    // res.redirect('https://' + req.host + req.url); // express 3.x
    res.redirect('https://' + req.hostname + req.url); // express 4.x
}

//Initialize handler http(express) and socket.io
var app = express();
let httpServ = http.createServer(app);
let httpsServ = https.createServer(options, app);
var io = require('socket.io')(httpsServ);


//EJS Settings
app.set('views', path.join(__dirname, 'views'));
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

//check https
app.all('*', ensureSecure);

//routes
app.use('/', index);
app.use('/auth/', auth);
app.use('/user/', user);
app.use('/game/', game);
app.use('/api/', api);
//Catch 404
app.use(function(req, res, next) {
    res.status(404).render('404');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/web_monopoly');
mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB');

    httpServ.listen(process.env.port ||  80, function() {
        let port = httpServ.address().port;
        console.log("Unsecure app now running on port", port);
    });

    httpsServ.listen(process.env.port ||  443, function() {
        let port = httpsServ.address().port;
        console.log("Secure app now running on port", port);
    });
});
mongoose.connection.on('error', err => {
    console.log('Mongoose Error. ' + err);
});

process.on('SIGINT', function() {
    console.log("Terminando el servidor...");
    process.exit(0);
});
