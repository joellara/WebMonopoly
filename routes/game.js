'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var Game = require(path.join(__dirname, '../models/Game.js'));

router.all('*', function(req, res, next) {
    if (typeof req.session.user_id === "undefined" || req.session.user_id === undefined || req.session.user_id === null || req.session.user_id === '') {
        req.session.redirect = req.originalUrl;
        res.redirect('/login/');
    } else {
        next();
    }
});
router.get('/',(req, res, next) => {
    Game.find({
        'players.id': req.session.user_id
    }, (err, games) => {
        if(err)res.render('error',{error:'Tuvimos un error interno, intente más tarde'});
        res.render('games', {
            title: 'Juegos',
            user: {
                id: req.session.user_id,
                name: req.session.user_name,
                username: req.session.user_username
            },
            games: games
        });
    });
});
router.get('/:id', function(req, res, next) {
    Game.findOne({
        'players.id': req.session.user_id,
        _id: req.params.id
    }, (err, game) => {
        if(err) res.render('error',{error:'Tuvimos un error interno, intente más tarde'});
        if (typeof game !== "undefined" && game !== null) {
            res.render('gameBoard', {
                title: '¡A jugar!',
                user: {
                    id: req.session.user_id,
                    name: req.session.user_name,
                    username: req.session.user_username
                }
            });
        }else{
            Game.find({
                'players.id': req.session.user_id
            }, (err, games) => {
                if(err)res.render('error',{error:'Tuvimos un error interno, intente más tarde'});
                res.render('games', {
                    title: 'Juegos',
                    user: {
                        id: req.session.user_id,
                        name: req.session.user_name,
                        username: req.session.user_username
                    },
                    games: games
                });
            });
        }
    });
});
router.delete('/:id',(req,res,nest)=>{
    Game.findOne({
        'players.id': req.session.user_id,
        _id: req.params.id
    },(err,game)=>{
        if (err) res.json({
            valid: false,
            message: 'Error interno. Intente de nuevo más tarde.'
        });

    });
});
router.post('/', (req, res, next) => {
    var players = [{ id: req.session.user_id }];
    var newGame = new Game({ name: req.body.name, players: players });
    if (typeof newGame !== "undefined" && newGame !== "") {
        newGame.save(function(err, game) {
            if (err) res.json({
                valid: false,
                message: 'Error interno. Intente de nuevo más tarde.'
            });
            res.json({
                valid: true,
                created: true,
                message: 'El nombre del juego:' + game.name,
                gameId: game._id
            });
        });
    } else {
        res.json({
            valid: false,
            message: 'Error interno. Intente de nuevo más tarde.'
        });
    }
});
router.use(function(req, res, next) {
    res.status(404).render('404');
});
module.exports = router;
