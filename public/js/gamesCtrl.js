$(document).ready(function() {
    $('#newGameForm').submit(function(event) {
        event.preventDefault();
        let name = $('#newGameName').val();
        $.post('/game/', {
            name: name
        }, function(data) {
            if (typeof data !== "undefined" && data !== "") {
                window.location.replace('/game/' + data.gameId);
            }
        });
    });
    $('#connectGameForm').submit(function(event) {
        event.preventDefault();
        let gameId = $('#connectGameId').val().trim();
        $.ajax({
            url: '/game/'+gameId,
            type: 'PUT',
            success: function(data) {
                if (typeof data !== "undefined" && data !== "" && data.valid !== false) {
                    if(data.error === false){
                        if(data.new === true){
                            window.location.replace('/game/');
                        }else{
                            $('#errorConnectBlock').removeClass('hidden');
                            $('#errorConnectMsgBlock').append('<p><strong>Ohh, shoo   </strong>'+data.message+' </p>');
                        }
                    }else{
                        $('#errorConnectBlock').removeClass('hidden');
                        $('#errorConnectMsgBlock').append('<p><strong>Ohh, shoo   </strong>'+data.message+' </p>');
                    }
                }
            }
        });
    });
    $('a[href="#delete"]').click(function(event) {
        var target = $(event.currentTarget);
        $.ajax({
            url: '/game/'+target.attr('id'),
            type: 'DELETE',
            success: function(data) {
                if (typeof data !== "undefined" && data !== null) {
                    if (data.valid === false) {
                        $('#errorBlock').removeClass('hidden');
                        $('#errorMsgBlock').append('<p><strong>Ohh, shoo  </strong>We had a problem</p>');
                    } else {
                        if (data.deleted === false) {
                            $('#errorBlock').removeClass('hidden');
                            $('#errorMsgBlock').append('<p><strong>Ohh, shoo  </strong>No se pudo borrar.</p>');
                        } else {
                            window.location.replace('/game/');
                        }
                    }
                }
            }
        });
    });
    $('a[href="#game"]').click(function(event){
        $.get('/api/'+$(event.currentTarget).attr('id'),function(data){
            if(data.valid === true && data.result === true){
                if(data.players.length < 2){
                    $('#actualGameBlock').removeClass('hidden');
                    $('#actualGameMsgBlock').append('<p><strong>Ohh, shoo  </strong>Debe haber al menos dos jugadores en este juego.</p>');
                }else{
                    window.location.replace('/game/'+data.id);
                }
            }else{
                $('#actualGameBlock').removeClass('hidden');
                $('#actualGameMsgBlock').append('<p><strong>Ohh, shoo  </strong>We fdhad a problem</p>');
            }
        });
    });

});
