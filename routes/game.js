'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('game', {
        title: '¡A jugar!',
        username: {
            id: req.session.player_id,
            name: req.session.player_name
        }
    });
});

module.exports = router;