$("#signup-form").submit(function(event) {
    event.preventDefault();
    var name = $('#signup-name').val();
    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    var password_rep = $('#signup-password-repeat').val();
    if (password !== password_rep) {
        $('#helpBlockPassword').removeClass('invisible');
        $('#password-block').addClass('has-error');
    } else {
        $.post('/auth/signup/', {
                name: name,
                username: username,
                password: password
            },
            function(data) {
                console.log(data);
                if (data.valid === true && data.loggedIn === true) {
                    window.location.replace('/');
                } else {
                    $('#helpBlockUsername').removeClass('invisible');
                    $('#helpBlockUsername').html(data.message);
                    $('#username-block').addClass('has-error');
                }
            });
    }
});
