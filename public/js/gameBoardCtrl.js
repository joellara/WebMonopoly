let gameBoardSizeCorner = 11;
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
let tokens = [{
    name: "Penguin",
    icon: "/img/tokens/penguin.svg"
}, {
    name: "Cannon",
    icon: "/img/tokens/cannon.svg"
}, {
    name: "Lantern",
    icon: "/img/tokens/lantern.svg"
}, {
    name: "Horse",
    icon: "/img/tokens/horse.svg"
}, {
    name: "Thimble",
    icon: "/img/tokens/thimble.svg"
}, {
    name: "Battleship",
    icon: "/img/tokens/battleship.svg"
}];

let imgCards = {
    station: '/img/station.svg',
    chance: '/img/chance.svg',
    chest: '/img/chest.svg',
    tax: '/img/tax.svg',
    goToJail: '/img/prison.svg',
    jail: '/img/prison.svg',
    freeParking: '/img/freeParking.svg',
    start: '/img/start.svg'
};
let dataBoard = [{
    name: "Go",
    price: "200",
    color: "",
    type: 9
}, {
    name: "Old Kent Road",
    price: "60",
    color: "Brown",
    type: 1
}, {
    name: "Community Chest",
    price: "",
    color: "",
    type: 4
}, {
    name: "Whitechapel Road",
    price: "60",
    color: "Brown",
    type: 1
}, {
    name: "Income Tax",
    price: "200",
    color: "",
    type: 5
}, {
    name: "Kings cross station",
    price: "200",
    color: "",
    type: 2
}, {
    name: "The angel, islington",
    price: "100",
    color: "SkyBlue",
    type: 1
}, {
    name: "Chance",
    price: "",
    color: "",
    type: 3
}, {
    name: "Euston road",
    price: "100",
    color: "SkyBlue",
    type: 1
}, {
    name: "Pentonville Roard",
    price: "120",
    color: "SkyBlue",
    type: 1
}, {
    name: "Jail",
    price: "",
    color: "",
    type: 6
}, {
    name: "Pall Mall",
    price: "140",
    color: "Pink",
    type: 1
}, {
    name: "Electric company",
    price: "150",
    color: "",
    type: 7
}, {
    name: "Whitehall",
    price: "140",
    color: "Pink",
    type: 1
}, {
    name: "Northumrl'd",
    price: "160",
    color: "Pink",
    type: 1
}, {
    name: "Marylebone station",
    price: "200",
    color: "",
    type: 2
}, {
    name: "Bow street",
    price: "180",
    color: "Orange",
    type: 1
}, {
    name: "Community Chest",
    price: "",
    color: "",
    type: 4
}, {
    name: "Marlborough",
    price: "180",
    color: "Orange",
    type: 1
}, {
    name: "Vine street",
    price: "200",
    color: "Orange",
    type: 1
}, {
    name: "Free Parking",
    price: "",
    color: "",
    type: 10
}, {
    name: "Strand",
    price: "220",
    color: "Red",
    type: 1
}, {
    name: "Chance",
    price: "",
    color: "",
    type: 3
}, {
    name: "Fleet Street",
    price: "220",
    color: "Red",
    type: 1
}, {
    name: "Trafalgar square",
    price: "240",
    color: "Red",
    type: 1
}, {
    name: "Fenchurch St. station",
    price: "200",
    color: "",
    type: 2
}, {
    name: "Leicester square",
    price: "260",
    color: "Yellow",
    type: 1
}, {
    name: "Coventry street",
    price: "260",
    color: "Yellow",
    type: 1
}, {
    name: "Water Works",
    price: "150",
    color: "7",
    type: 1
}, {
    name: "Piccadilly",
    price: "280",
    color: "Yellow",
    type: 1
}, {
    name: "Go to Jail",
    price: "",
    color: "",
    type: 8
}, {
    name: "Regent street",
    price: "300",
    color: "Green",
    type: 1
}, {
    name: "Oxford street",
    price: "300",
    color: "Green",
    type: 1
}, {
    name: "Community chest",
    price: "",
    color: "",
    type: 4
}, {
    name: "Bond street",
    price: "320",
    color: "Green",
    type: 1
}, {
    name: "Liverpool St. Station",
    price: "200",
    color: "",
    type: 2
}, {
    name: "Chance",
    price: "",
    color: "",
    type: 3
}, {
    name: "Park Lane",
    price: "350",
    color: "Blue",
    type: 1
}, {
    name: "Super Tax",
    price: "100",
    color: "",
    type: 5
}, {
    name: "Mayfair",
    price: "400",
    color: "Blue",
    type: 1
}];

function getColCard(card) {
    let htmlBoard = "";
    if (card.type === 1) {
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<p>' + card.price + '</p>';
    } else if (card.type === 2) { //station
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<p>' + card.price + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.station + '"/>';
    } else if (card.type === 3) { //Chance
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.chance + '"/>';
    } else if (card.type === 4) { //Chest
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.chest + '"/>';
    } else if (card.type === 5) { //Tax
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.tax + '"/>';
    } else if (card.type === 6) { //Jail
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.jail + '"/>';
    } else if (card.type === 7) { //Company
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<p>' + card.price + '</p>';
    } else if (card.type === 8) { //Go to jail
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.goToJail + '"/>';
    } else if (card.type === 9) { //Start
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.start + '"/>';
    } else if (card.type === 10) { //Free parking
        htmlBoard += '<p>' + card.name + '</p>';
        htmlBoard += '<img class="img-responsive" src="' + imgCards.freeParking + '"/>';
    }
    return htmlBoard;
}

function createBoard() {

    //first row
    let htmlBoard = '<div class="row text-center">';
    for (let i = 0; i < gameBoardSizeCorner; i++) {
        htmlBoard += '<div class="col-xs-1 ' + dataBoard[i].color + '  center-block card" id="' + i + '">';
        htmlBoard += getColCard(dataBoard[i]);
        htmlBoard += '</div>';
    }
    htmlBoard += '</div>';
    //intermidiate rows
    for (let i = 40 - 1; i >= 40 - 9; i--) {
        htmlBoard += '<div class="row text-center">';
        htmlBoard += '<div class="col-xs-1 ' + dataBoard[i].color + '  center-block card" id="' + i + '">';
        htmlBoard += getColCard(dataBoard[i]);
        htmlBoard += '</div>';
        htmlBoard += '<div class="col-xs-9">';
        htmlBoard += '</div>';
        htmlBoard += '<div class="col-xs-1 ' + dataBoard[50 - i].color + '  center-block card" id="' + (50 - i) + '">';
        htmlBoard += getColCard(dataBoard[50 - i]);
        htmlBoard += '</div>';
        htmlBoard += '<div class="col-xs-1">';
        htmlBoard += '</div>';
        htmlBoard += '</div>';
    }
    //last row
    htmlBoard += '<div class="row text-center">';
    for (let i = 19 + gameBoardSizeCorner; i >= 20; i--) {
        htmlBoard += '<div class="col-xs-1 ' + dataBoard[i].color + '  center-block card" id="' + i + '">';
        htmlBoard += getColCard(dataBoard[i]);
        htmlBoard += '</div>';
    }
    htmlBoard += '</div>';
    return htmlBoard;
}
$(document).ready(function() {
    function updateBoard() {
        $.ajax({
            url: '/api/state/' + gameId,
            type: 'GET'
        }).done(function(data) {
            if (typeof data !== "undefined" && data !== null && data.valid === true && data.result === true) {
                gameState = data.game;
                if(typeof myTurn === "undefined" || myTurn !== null){
                    data.game.players.forEach(function(player, index, players) {
                        if (player.id === userId) {
                            myTurn = index;
                        }
                    });
                }
                for (let i = 0; i < gameState.players.length; i++) {
                    $('#' + gameState.players[i].id).remove();
                    $('#' + gameState.players[i].status.position).append('<img src="/img/tokens/cannon.svg" alt="User" class="abs '+gameState.players[i].status.color+'" id="' + gameState.players[i].id + '"/>');
                    for (let j = 0; j < gameState.players[i].status.properties.length; j++) {
                        $('#' + gameState.players[i].status.properties[j]).addClass('owned'+gameState.players[i].status.color);
                    }
                }
                if (data.game.status === "Started") {
                    $('#startGame').attr('disabled',true);
                    $('#startGame').text('Juego empezado.');
                    if (userId == gameState.players[gameState.turn].id && gameState.canMove === true) {
                        $('#rollDice').removeAttr('disabled');
                    } else {
                        $('#rollDice').attr('disabled',true);
                    }
                    if (userId == gameState.players[gameState.turn].id && gameState.canMove === false) {
                        $('#buyProperty').removeAttr('disabled');
                        $('#skipTurn').removeAttr('disabled');
                    } else {
                        $('#buyProperty').attr('disabled',true);
                        $('#skipTurn').attr('disabled',true);
                    }
                    $('#money').text(data.game.players[myTurn].status.money);
                }else if(data.game.status === "Finished"){
                    $('#startGame').attr('disabled',true);
                    $('#startGame').text('Juego empezado.');
                }
                updateUsers();
            }
        });
    }
    function updateUsers() {
        $('#usersList').empty();
        if (typeof gameState !== "undefined" && gameState !== null) {
            usersInGame.forEach(function(user, index, users) {
                let classe = "";
                if (user.id === gameState.players[gameState.turn].id) {
                    classe +="active ";
                }
                $('#usersList').append('<li class="'+classe+' list-group-item">' + user.name + '</li>');
            });
        }
    }
    function getInitialState() {
        //Check initial state
        $.ajax({
            url: '/api/state/' + gameId,
            type: 'GET'
        }).done(function(data) {
            if (typeof data !== "undefined" && data !== null && data.valid === true && data.result === true) {
                gameState = data.game;
                data.game.players.forEach(function(player, index, players) {
                    if (player.id === userId) {
                        myTurn = index;
                    }
                });
                if (data.game.status === "Started") {
                    $('#startGame').attr('disabled',true);
                    $('#startGame').text('Juego empezado.');
                } else if (data.game.status === "Finished") {
                    $('#startGame').attr('disabled',true);
                    $('#startGame').text('El juego ha terminado.');
                }
                socket.emit('joinGame', {
                    gameId: gameId,
                    userId: userId,
                    userName: userName
                });
            } else {
                console.log('We had an error');
            }
        }).fail(function() {
            console.log('Ohh, shoo');
        });
    }
    let usersInGame = [];
    let socket = io();
    let gameId = $('#gameId').text();
    let userId = $('#userId').text();
    let userName = $('#userName').text();
    let myTurn;
    let gameState;
    $('#gameBoard').empty().html(createBoard());

    socket.on('notification',function(msg){
        $('#notification').text(msg.msg);
        $('#diceResult').text('');
    });
    socket.on('joinGame', function(msg) {
        if (msg.gameId === gameId) {
            msg.users.forEach(function(user, index, users) {
                usersInGame.push({
                    id: user.id,
                    name: user.name
                });
            });
            updateBoard();
        }
    });
    socket.on('newUser', function(msg) {
        if (msg.gameId === gameId) {
            usersInGame.push(msg.user);
            updateBoard();
        }
    });
    socket.on('connect', function() {
        getInitialState();
    });
    socket.on('disconnect', function() {

    });
    socket.on('leaveGame', function(msg) {
        if (msg.gameId === gameId) {
            let indexO = -1;
            usersInGame.forEach((user, index, users) => {
                if (user.id === msg.userId) {
                    indexO = index;
                }
            });
            usersInGame.splice(indexO, 1);
            updateBoard();
        }
    });
    socket.on('moved', function(msg) {
        if (msg.gameId === gameId) {
            updateBoard();
            $('#diceResult').text('Te has movido: '+msg.position+' posiciones.');
        }
    });

    //make a move
    socket.on('updateBoard', function(msg) {
        if (msg.gameId === gameId) {
            updateBoard();
        }
    });

    //start game
    socket.on('startGame', function(msg) {
        if (msg.gameId === gameId) {
            updateBoard();
        }
    });
    $('#startGame').click(function() {
        socket.emit('startGame');
    });
    $('#rollDice').click(function() {
        if (myTurn === gameState.turn && gameState.canMove === true) {
            socket.emit('rollDice');
        }
    });
    $('#buyProperty').click(function() {
        if (myTurn === gameState.turn && gameState.canMove === false) {
            socket.emit('buyProperty');
            $('#diceResult').text('');
        }
    });
    $('#skipTurn').click(function() {
        if (myTurn === gameState.turn && gameState.canMove === false) {
            socket.emit('skipTurn');
            $('#diceResult').text('');
        }
    });
});
