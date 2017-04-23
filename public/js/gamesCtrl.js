$(document).ready(function() {
    $('#newGameForm').submit(function(event) {
        event.preventDefault();
        let name = $('#newGameName').val();
        $.post('/game/', {
            name: name
        }, function(data) {
            if(typeof data !== "undefined" && data !== ""){
                console.log(data);
                window.location.replace('/game/'+data.gameId);
            }
        });
    });
});
