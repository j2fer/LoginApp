$(this.document).ready(function(){


    $('#loginForm').on('blur', '#email', function(e) {
        var emailVal = $(e.target).val();
        if (emailVal.length > 0) {
            if (!validateEmail(emailVal)) {
                $.showValidationError({
                    "message": "Email incorrecto"
                });
                //alert('email incorrecto');
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
            alert('comprobar usuario');
            $(e.target).submit();
        } else {
            //alert('datos incorrectos');
            $.showValidationError({
                "message": "Datos incorrectos"
            });
        }
    });

});