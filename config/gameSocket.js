var path = require('path');
var _ = require('underscore');
var Game = require(path.join(__dirname, '../models/Game.js'));
var data = require(path.join(__dirname, '../config/data.json')).data;

module.exports = function(io) {
    let games = {}; //has users inside
    io.on('connection', function(socket) {
        console.log('User connected.');
        socket.on('disconnect', function() {
            console.log('User disconnected');
            socket.broadcast.emit('leaveGame', {
                gameId: socket.gameId,
                userId: socket.userId
            });
            let indexO = -1;
            games[socket.gameId].forEach((user, index, users) => {
                if (user.id === socket.userId) {
                    indexO = index;
                }
            });
            games[socket.gameId].splice(indexO, 1);
        });
        socket.on('joinGame', function(msg) {
            socket.userId = msg.userId;
            socket.gameId = msg.gameId;
            socket.userName = msg.userName;
            if (!games[msg.gameId]) {
                games[msg.gameId] = [{
                    id: msg.userId,
                    name: msg.userName
                }];
            } else { //Ya existe el juego
                let exist = false;
                games[msg.gameId].forEach((user, index, users) => {
                    if (user.id == msg.userId) {
                        exist = true;
                    }
                });
                if (!exist) {
                    games[msg.gameId].push({
                        id: msg.userId,
                        name: msg.userName
                    });
                }
                socket.emit('joinGame', {
                    gameId: msg.gameId,
                    users: games[msg.gameId]
                });

                socket.broadcast.emit('newUser', {
                    gameId: msg.gameId,
                    user: {
                        id: msg.userId,
                        name: msg.userName
                    }
                });
                console.log('Usuarios adentro:', games[msg.gameId]);
            }
        });

        socket.on('rollDice', function(msg) {
            let dice1 = _.random(1, 6);
            let dice2 = _.random(1, 6);
            Game.findOne({
                'players.id': socket.userId,
                _id: socket.gameId
            }, (err, game) => {
                if (!err) {
                    let newPosition = game.move(socket.userId, dice1 + dice2);
                    if (typeof newPosition !== "undefined" && newPosition !== null) {
                        game.players.forEach((player, index) => {
                            if (player.id === socket.userId) {
                                player.status.position = newPosition;
                            }
                        });
                        /*
                            //1: Normal card
                            //2: Station
                            //3: Chance
                            //4: Chest
                            //5: Tax
                            //6: Jail
                            //7: Company
                            //8: Go to Jail
                            //9: Start
                            //10: Free Parking
                        */
                       let newLocationCard = data[newPosition];
                        if(newLocationCard.type == 1 || newLocationCard.type == 7 || newLocationCard.type == 2){
                            if (!game.propertyIsOwned() && game.players[game.turn].status.money > newLocationCard.price) {
                                game.canMove = false;
                            } else if (!game.propertyIsOwned() && game.players[game.turn].status.money < newLocationCard.price) {
                                game.nextTurn();
                            }
                            if(game.propertyIsOwned()){
                                game.pay();
                                game.nextTurn();
                            }
                        }else if(newLocationCard.type == 3 || newLocationCard.type == 4){
                            game.nextTurn();
                        }else if(newLocationCard.type == 5){
                            game.pay();
                            game.nextTurn();
                        }else if(newLocationCard.type == 8){
                            game.players[game.turn].position = 10;
                            game.nextTurn();
                        }else{
                            game.nextTurn();
                        }
                        game.save((err, game) => {
                            if (!err) {
                                socket.broadcast.emit('updateBoard', {
                                    gameId: socket.gameId
                                });
                                socket.emit('updateBoard', {
                                    gameId: socket.gameId
                                });
                            }
                        });
                    }
                }
            });
        });
        socket.on('buyProperty', function() {
            Game.findOne({
                'players.id': socket.userId,
                _id: socket.gameId
            }, (err, game) => {
                if (!err) {
                    game.buyProperty();
                    game.nextTurn();
                    game.save((err)=>{
                        socket.emit('updateBoard',{
                            gameId:socket.gameId
                        });
                        socket.broadcast.emit('updateBoard',{
                            gameId:socket.gameId
                        });
                    });
                }
            });
        });
        socket.on('startGame', function() {
            Game.findOne({
                'players.id': socket.userId,
                _id: socket.gameId
            }, (err, game) => {
                if (!err && typeof game !== "undefined" && game !== null) {
                    if (game.status !== "Started" && game.status !== "Finished") {
                        game.status = "Started";
                        game.save((err, game) => {
                            if (!err) {
                                socket.broadcast.emit('startGame', {
                                    gameId: socket.gameId
                                });
                                socket.emit('startGame', {
                                    gameId: socket.gameId
                                });
                            }
                        });
                    }
                }
            });
        });
    });
};
