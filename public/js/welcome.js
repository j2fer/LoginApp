$(this.document).ready(function(){

    const lastAccess = $('#lastAccessTime').text();

    if(lastAccess.length > 0){
        window.setInterval(function() {
            let diff = countTimeSinceLastAccess(lastAccess);
            let days = Math.floor(diff / (24 * 60 * 60 * 1000));
            diff = diff - (days * 24 * 60 * 60 * 1000);
            let hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
            diff = diff - (hours * 60 * 60 * 1000);
            let minutes = Math.floor(diff / (60 * 1000)) % (24 * 60);
            diff = diff - (minutes * 60 * 1000);
            let seconds = Math.floor(diff / 1000) % (24 * 60 * 60);

            $('#daysCounter .counterNumber').text(('0' + days).slice(-2));
            $('#hoursCounter .counterNumber').text(('0' + hours).slice(-2));
            $('#minutesCounter .counterNumber').text(('0' + minutes).slice(-2));
            $('#secondsCounter .counterNumber').text(('0' + seconds).slice(-2));
        }, 1000);
    } else {
        $('header p').text('This is your first time here!');
    }


});