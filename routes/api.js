'use strict';
var path = require('path');
var express = require('express');
var router = express.Router();
var Game = require(path.join(__dirname, '../models/Game.js'));

router.put('/:id', (req, res, next) => {
    next();
});

router.get('/:id', (req, res, next) => {
    Game.findOne({
        'players.id': req.session.user_id,
        _id: req.params.id
    }, (err, game) => {
        if (err) res.json({
            valid: false,
            message: 'Tuvimos un error interno, intente más tarde'
        });
        if (typeof game !== "undefined" && game !== null) {
            res.json({
                valid:true,
                result:true,
                name: game.name,
                id: game._id,
                players: game.players
            });
        }else{
            res.json({
                valid:true,
                result:false
            });
        }
    });
});
module.exports = router;
