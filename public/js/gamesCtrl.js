$(document).ready(function() {
    $('#newGameForm').submit(function(event) {
        event.preventDefault();
        let name = $('#newGameName').val();
        $.post('/game/', {
            name: name
        }, function(data) {
            if (typeof data !== "undefined" && data !== "") {
                console.log(data);
                window.location.replace('/game/' + data.gameId);
            }
        });
    });

    $('#connectGameForm').submit(function(event) {
        event.preventDefault();
        let gameId = $('#connectGameId').val().trim();
        $.ajax({
            url: '/game/',
            type: 'PUT',
            data: {
                gameId: gameId
            },
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
            url: '/game/',
            data: {
                id: target.attr('id')
            },
            type: 'DELETE',
            success: function(data) {
                if (typeof data !== "undefined" && data !== null) {
                    if (data.valid === false) {
                        $('#errorBlock').removeClass('hidden');
                        $('#errorMsgBlock').append('<p><strong>Ohh, shoo  </strong>We had a problem');
                    } else {
                        if (data.deleted === false) {
                            $('#errorBlock').removeClass('hidden');
                            $('#errorMsgBlock').append('<p><strong>Ohh, shoo  </strong>No se pudo borrar.');
                        } else {
                            window.location.replace('/game/');
                        }
                    }
                }
            }
        });
    });
});
