'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('game', {
        title: '¡A jugar!',
        user: {
            id: req.session.user_id,
            name: req.session.user_name,
            username:req.session.user_username
        }
    });
});

module.exports = router;