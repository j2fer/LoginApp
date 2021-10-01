$(this.document).ready(function(){


    $('#loginForm').on('blur', '#email', function(e) {
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

    $('#loginForm').on('click', '#login',  function(e) {
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

});