'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/login/', function(req, res, next){

});

router.post('/new-user/', function(req, res, next){

});

router.post('/logout/', function(req, res, next){

});

module.exports = router;
