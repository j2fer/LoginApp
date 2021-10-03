// Email validation
//-----------------
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


// Login/register validation
//--------------------------
function validateLogin() {
    const email = $('#email').val();
    const password = $('#password').val();
    let repeatPassword = $('#password').val();
    if ($('#repeatPassword').length) {
        repeatPassword = $('#repeatPassword').val();
    }
    return validateEmail(email) && 
        password.length > 0 && 
        repeatPassword.length > 0 && 
        password == repeatPassword;
}


// Count time since last access
//-----------------------------
function countTimeSinceLastAccess(time) {
    const now = new Date();
    var intTime = 0;
    if (time.length > 0){
        intTime = parseInt(time);
    }
    return now.getTime() - intTime;
}


// Get display mode
//-----------------
function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if (navigator.standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
}