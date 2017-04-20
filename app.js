var express =  require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var bodyparser = require('body-parser');

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

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public'));

var app = express();
app.all('*', ensureSecure);