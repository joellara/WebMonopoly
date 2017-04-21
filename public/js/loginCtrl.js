$("#login-form").submit(function(event) {
    event.preventDefault();
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    if(password !== "" && username !== ""){
        $.post('/auth/login/', {
            username: username,
            password: password
        },
        function(data) {
            if (data.valid === true && data.loggedIn === true) {
                window.location.replace('/');
            } else {
                $('#helpBlock').removeClass('invisible');
                $('#helpBlock').html(data.message);
                $('#login-form').addClass('has-error');
            }
        }
    );
    }
});
