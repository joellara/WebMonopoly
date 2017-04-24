var mongoose = require('mongoose');

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
    turn:Number,
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
            position:{
                type:Number,
                default:0
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
            }
        }
    }]
});
gameSchema.methods.propertyIsOwned = function(cardId) {
    let found = false;
    this.players.forEach((player, index, players) => {
        player.status.properties.forEach((property, index, properties) => {
            if (property === cardId) {
                found = true;
            }
        });
    });
    return found;
};
gameSchema.methods.buyProperty = function(playerId, cardId, price) {
    let rst = {
        valid: false,
        message: 'We had an internal error'
    };
    if (this.propertyIsOwned(cardId)) {
        return {
            valid: true,
            bought: false,
            message: 'The property is owned by someone.'
        };
    } else {
        this.players.forEach((player, index, players) => {
            if (player.id === playerId) {
                if(player.status.money >= price){
                    player.status.money -= price;
                    player.status.properties.push(cardId);
                    rst = {
                        valid: true,
                        bought: true,
                        message: 'Player bought property with id= ' + cardId
                    };
                }else{
                    rst = {
                        valid: true,
                        bought: false,
                        message: "Player didn't have enough money"
                    };
                }
            }
        });
    }
    return rst;
};
gameSchema.methods.pay = function(playerId, cardId, price) {
    let rst = {};
    money = 0;
    if (this.propertyIsOwned(cardId)) {
        this.players.forEach((player, index, players) => {
            if(player.id == playerId){
                if(player.status.state !== "Lost" && player.status.money > 0 ){
                    money = player.status.money;
                    player.status.money -= price;
                    if(player.status.money < 0){
                        player.status.state = "Lost";
                        rst = {
                            valid:true,
                            lost:true,
                            message:'Player lost'
                        };
                    }
                }
            }
        });
        this.players.forEach((player, index, players) => {
            player.status.properties.forEach((property, index, properties) => {
                if (property === cardId) {
                    player.status.money+=money;
                    rst = {
                        valid:true,
                        payed:true,
                        message:'Player payed'
                    };
                }
            });
        });
    } else {
        return {
            valid: true,
            pay: false,
            message: 'The property is not owned.'
        };
    }
    this.checkEndGame();
    return rst;
};
gameSchema.methods.shiftTurn = function(){
    this.turn = (this.turn+1) % this.players.length;
    return this.turn;
};
gameSchema.methods.checkEndGame = function(){
    let count = 0;
    this.players.forEach((player,index,players)=>{
        if(player.status.money < 0){
            count++;
        }
    });
    if(count == this.players.length-1){
        this.status = "Finished";
        return true;
    }else{
        return false;
    }
};
module.exports = mongoose.model('Game', gameSchema);
