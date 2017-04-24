var path = require('path');
var Game = require(path.join(__dirname, '../models/Game.js'));

module.exports = function(io) {
    let games = {};
    io.on('connection', function(socket) {
        console.log('User connected.');
        socket.on('disconnect', function() {
            console.log('User disconnected');
            socket.broadcast.emit('leaveGame', {
                gameId: socket.gameId,
                userId: socket.userId
            });
            let indexO = -1;
            games[socket.gameId].forEach((user,index,users)=>{
                if(user.id === socket.userId){
                    indexO = index;
                }
            });
            games[socket.gameId].splice(indexO,1);
            console.log(socket.userName+' left game with index found: '+indexO);
            console.log(games[socket.gameId]);
        });
        socket.on('joinGame', function(msg) {
            socket.userId = msg.userId;
            socket.gameId = msg.gameId;
            socket.userName = msg.userName;
            if (!games[msg.gameId]) {
                console.log('New game on sockets');
                console.log('User '+msg.userName);
                games[msg.gameId] = [{
                    id: msg.userId,
                    name: msg.userName
                }];
            } else { //Ya existe el juego
                console.log('New user to game on sockets');
                console.log('User '+msg.userName);
                games[msg.gameId].push({
                    id:msg.userId,
                    name:msg.userName
                });
                socket.emit('joinGame', {
                    gameId: msg.gameId,
                    users: games[msg.gameId]
                });

                socket.broadcast.emit('newUser', {
                    gameId: msg.gameId,
                    user:{
                        id:msg.userId,
                        name:msg.userName
                    }
                });
                console.log('Usuarios adentro:',games[msg.gameId]);
            }
        });

        socket.on('move',function(msg){

        });
        socket.on('startGame',function(){
            socket.broadcast.emit('startGame');
        });
    });
};
