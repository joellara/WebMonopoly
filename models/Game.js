var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    players: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            stat: {
                type: String,
                default: "Pending"
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

module.exports = mongoose.model('Game', gameSchema);
