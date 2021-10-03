$(this.document).ready(function(){

    // Form binds
    //-----------
    
    $('#loginForm, #registerForm').on('blur', '#email', function(e) {
        var emailVal = $(e.target).val();
        if (emailVal.length > 0) {
            if (!validateEmail(emailVal)) {
                $.showValidationError({
                    "message": "Incorrect email"
                });
            } else {
                $.hideValidationError();
            }
        } else {
            $.hideValidationError();
        }
    });

    $('#loginForm, #registerForm').on('click', '#login, #register',  function(e) {
        e.preventDefault();
        if (validateLogin()) {
            $.hideValidationError();
            $(e.target).closest('form').submit();
        } else {
            $.showValidationError({
                "message": "Incorrect email and/or password"
            });
        }
    });

    $('#registerForm').on('blur', '#password, #repeatPassword', function(e) {
        var repeatPass = $('#repeatPassword').val();
        var password = $('#password').val()
        if (password.length > 0 && repeatPass.length > 0) {
            if (repeatPass != password) {
                $.showValidationError({
                    "message": "Password does not match"
                });
            }
        }
    });

});