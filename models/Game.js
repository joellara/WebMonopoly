'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var data = require('../config/data.json').data;

var gameSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending" //Pending, Started, Finished
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turn: {
        type: Number,
        default: 0
    },
    canMove: {
        type: Boolean,
        default: true
    },
    players: [{
        id: { //attribute
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            state: {
                type: String,
                defualt: ""
            },
            position: {
                type: Number,
                default: 0
            },
            token: {
                type: String,
                default: "NoToken"
            },
            money: {
                type: Number,
                default: 1500
            },
            properties: {
                type: [Number],
                default: []
            },
            color:String
        }
    }]
});
gameSchema.methods.propertyIsOwned = function() {
    let found = false;
    let cardId = this.players[this.turn].status.position;
    this.players.forEach((player, index, players) => {
        player.status.properties.forEach((property, index, properties) => {
            if (property === cardId) {
                found = true;
            }
        });
    });
    return found;
};
gameSchema.methods.buyProperty = function() {
    let playerId = this.players[this.turn].id;
    let price = data[this.players[this.turn].status.position].price;
    let cardId = this.players[this.turn].status.position;
    this.players.forEach((player, index, players) => {
        if (player.id === playerId) {
            if (player.status.money >= price) {
                player.status.money -= parseInt(price);
                player.status.properties.push(cardId);
            }
        }
    });
};
gameSchema.methods.pay = function() {
    let money = 0;
    let playerId = this.players[this.turn].id;
    let price = data[this.players[this.turn].status.position].price;
    let cardId = this.players[this.turn].status.position;
    this.players.forEach((player, index, players) => {
        if (player.id == playerId) {
            money = player.status.money;
            player.status.money -= price;
            if (player.status.money < 0) {
                player.status.state = "Lost";
            }
        }
    });
    this.players.forEach((player, index, players) => {
        if (player.id !== playerId) {
            player.status.properties.forEach((property, index, properties) => {
                if (property === cardId) {
                    player.status.money += parseInt(price);
                }
            });
        }
    });
    this.checkEndGame();
};
gameSchema.methods.nextTurn = function() {
    let prev = this.turn;
    this.turn = (this.turn + 1) % this.players.length;
    this.canMove = true;
};
gameSchema.methods.checkEndGame = function() {
    let count = 0;
    let playerId;
    this.players.forEach((player, index, players) => {
        if (player.status.money < 0) {
            count++;
        }else{
            playerId = player.id;
        }
    });
    if (count == this.players.length - 1) {
        this.status = "Finished";
        this.winner = playerId;
    }
};
gameSchema.methods.move = function(playerId, count) {
    let position;
    this.players.forEach((player, index, players) => {
        if (player.id.toString() === playerId && index === this.turn) {
            position = player.status.position;
            player.status.position = (player.status.position + count) % (data.length - 1);
            if(player.status.position < position){
                player.status.money += parseInt(200);
            }
            position = player.status.position;
        }
    });
    this.canMove = false;
    return position;
};
module.exports = mongoose.model('Game', gameSchema);
