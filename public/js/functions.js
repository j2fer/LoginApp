function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateLogin() {
    const email = $('#email').val();
    const password = $('#password').val();
    return validateEmail(email) && password.length > 0;
}

function countTimeSinceLastAccess(time) {
    const now = new Date();
    var intTime = 0;
    if (time.length > 0){
        intTime = parseInt(time);
    }
    return now.getTime() - intTime;
}