$('a[href="#logout"]').click(function(event) {
    event.preventDefault();
    $.post("/auth/logout/", {}, function(data) {
        if (data.validity === true && data.loggedOut === true) {
            window.location.replace('/');
        } else {
            console.log('Hubo un error interno.');
        }
    });
});
