if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../sw.js');
        
        //navigator.serviceWorker.ready always resolve
        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service worker successfully registered on scope', registration.scope);
        });
    });
}

var showInstallationPopUp = true;


$(this.document).ready(function(){

    $('.appInput').each(function() {
        $(this).transformAppInput();
    });




    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        //showInstallPromotion();

        var localStorageShowPopUp = localStorage.getItem('LoginAppShowInstall');
        if (localStorageShowPopUp != null && 
                localStorageShowPopUp != undefined && 
                localStorageShowPopUp == "false") {
            showInstallationPopUp = false;
        }

        if(showInstallationPopUp){
            window.setTimeout(function() {
                $.showInstallMessage( {
                    "parent": "#loginScreen", 
                    "message": "Do you want to install the app for a better user experience?",
                    "installCallback": async () => {
                        $.removeInstallMessage();
                        localStorage.setItem('LoginAppShowInstall', false);
                        // Hide the app provided install promotion
                    //    hideInstallPromotion();
                        // Show the install prompt
                        deferredPrompt.prompt();
                        // Wait for the user to respond to the prompt
                        const { outcome } = await deferredPrompt.userChoice;
                        // Optionally, send analytics event with outcome of user choice
                        console.log(`User response to the install prompt: ${outcome}`);
                        // We've used the prompt, and can't use it again, throw it away
                        deferredPrompt = null;
                    },
                    "cancelCallback": function(){
                        $.removeInstallMessage();
                        localStorage.setItem('LoginAppShowInstall', false);
                        showInstallationPopUp = false;
                    }
                })
            }, 3000);
        }

        // Optionally, send analytics event that PWA install promo was shown.
        console.log(`'beforeinstallprompt' event was fired.`);
    });



      window.addEventListener('appinstalled', () => {

        $.removeInstallMessage();
        showInstallationPopUp = false;

        // Hide the app-provided install promotion
     //   hideInstallPromotion();
        // Clear the deferredPrompt so it can be garbage collected
        deferredPrompt = null;
        // Optionally, send analytics event to indicate successful install
        console.log('PWA was installed');
      });


      window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
        let displayMode = 'browser';
        if (evt.matches) {
          displayMode = 'standalone';
        }
        // Log display mode change to analytics
        console.log('DISPLAY_MODE_CHANGED', displayMode);
      });


      console.log(getPWADisplayMode());


});