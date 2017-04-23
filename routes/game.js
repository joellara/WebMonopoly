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

//get all games based on session player
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

//get an specific game
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

//Delete an specific game
router.delete('/',(req,res,nest)=>{
    Game.findOne({
        'players.id': req.session.user_id,
        _id: req.body.id
    },(err,game)=>{
        if (err) res.json({
            valid: false,
            message: 'Error interno. Intente de nuevo más tarde.'
        });
        if(game === null){
            res.json({
                valid: true,
                deleted: false,
                message: 'No se encontró el juego con ese id..'
            });
        }else{
            if(game.players.length > 1 ){
                let indexToDel = -1;
                game.players.forEach((player,index,players)=>{
                    if(players.user_id == req.session.user_id){
                        indexToDel = index;
                    }
                });
                game.players.splice(indexToDel,1);
                game.save((err,game)=>{
                    if (err) res.json({
                        valid: false,
                        message: 'Error interno. Intente de nuevo más tarde.'
                    });
                    res.json({
                        valid:true,
                        deleted:true,
                        message:'Te hemos eleminado del juego con el nombre: '+ game.name
                    });
                });
            }else{
                Game.findByIdAndRemove({
                    'players.id': req.session.user_id,
                    _id: req.body.id
                },(err,game)=>{
                    if (err) res.json({
                        valid: false,
                        message: 'Error interno. Intente de nuevo más tarde.'
                    });
                    if(typeof game !== "undefined" && game !== null){
                        res.json({
                            valid: true,
                            deleted: true,
                            message: 'Te hemos eleminado del juego con el nombre: '+ game.name
                        });
                    }
                });
            }
        }
    });
});

//Create new game
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

router.put('/',(req,res,next)=>{
    var gameId = req.body.gameId;
    Game.findOne({
        _id:gameId
    },(err,game)=>{
        if (err) res.json({
            valid: false,
            message: 'Error interno. Intente de nuevo más tarde.'
        });
        if(typeof game !== "undefined" && game !== null){
            let found = false;
            let rst = {};
            if(game.status !== "Started" && game.status !== "Finished"){
                if(game.players.length >= 3){
                    res.json({
                        valid:true,
                        error:true,
                        message:'El juego ya tiene 4 jugadores'
                    });
                }else{
                    game.players.forEach((player,index,players)=>{
                        if(player.id == req.session.user_id){
                            found = true;
                            rst = {
                                valid: true,
                                new:false,
                                error:false,
                                message: 'Ya estas unido al juego',
                                gameId: game._id
                            };
                        }
                    });
                    if(!found){
                        game.players.push({id:req.session.user_id});
                        game.save((err,game)=>{
                            if (err) res.json({
                                valid: false,
                                message: 'Error interno. Intente de nuevo más tarde.'
                            });
                            res.json({
                                valid:true,
                                error:false,
                                new:true,
                                message:'Te agregamos al juego con el id='+game.id,
                                gameId:game.id
                            });
                        });
                    }else{
                        res.json(rst);
                    }
                }
            }else{
                res.json({
                    valid:true,
                    error:true,
                    message:'El juego ya está empezado, no te puedes unir.'
                });
            }
        }else{
            res.json({
                valid:true,
                completed:false,
                message:'El juego no existe.'
            });
        }
    });
});
module.exports = router;
