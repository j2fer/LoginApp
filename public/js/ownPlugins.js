(function($){
	
	$.fn.transformAppInput = function() {
		
        var input = this;
        
        if (input.val().length > 0) {
            input.addClass('has-content');
        }
        
        input.parent().css({'position':'relative', 'z-index':0});
        
        let labelElem = $('<label />');
        let borderElem = $('<span class="focus-border" />');

        if(input.attr('placeholder') != undefined && input.attr('placeholder').length > 0){
            labelElem.text(input.attr('placeholder'));
            input.removeAttr('placeholder');
        } else {
            labelElem.text(input.attr('id'));
        }

        input.after(borderElem);
        input.after(labelElem);

        input.on('focusout', function() {
            if (input.val().length > 0) {
                input.addClass('has-content');
            } else {
                input.removeClass('has-content');
            }
        });
	}

    $.showValidationError = function(options) {

        let defaultOptions = {
            "message": "error"
        };

        var properties = $.extend(defaultOptions, options);
		
        $.hideValidationError();

        $('#errorBlock').empty();

        $('#errorBlock').text(properties["message"]);
        
        $('#errorBlock').show();
	}

    
    $.hideValidationError = function() {
        $('#errorBlock').hide();
    }



    $.showInstallMessage = function(options) {

        $.removeInstallMessage();

        let defaultOptions = {
            "parent": "body", 
            "message": "Do you want to install the app for a better user experience?",
            "installCallback": "",
            "cancelCallback": ""
        };

        var properties = $.extend(defaultOptions, options);

        $(properties.parent).css({'position':'relative', 'z-index':0});
        
        let container = $('<aside id="installBlock" />');
        let topContent = $('<div />');
        let bottomContent = $('<div id="installButtonBlock" />');
        let imageBlock = $('<div id="installIconBlock"><img src="images/app-192-192.png"></div>');
        let messageBlock = $('<div id="installMessageBlock" />');
        let cancelButton = $('<button id="cancelButton" class="appButton secondary">Cancel</button>');
        let installButton = $('<button id="installButton" class="appButton">Install</button>');

        messageBlock.text(properties.message);
        topContent.append(imageBlock).append(messageBlock);
        bottomContent.append(installButton).append(cancelButton);
        container.append(topContent).append(bottomContent);
        $(properties.parent).append(container);

        installButton.on('click', function(e){
            if (properties.installCallback != undefined && properties.installCallback != '') {
                var args = Array.prototype.slice.call(arguments, 2);				
                properties.installCallback.apply(this, args);
            }
        });
        
        cancelButton.on('click', function(e){
            if (properties.cancelCallback != undefined && properties.cancelCallback != '') {
                var args = Array.prototype.slice.call(arguments, 2);				
                properties.cancelCallback.apply(this, args);
            }
        });

    }

    $.removeInstallMessage = function(options) {
        $('#installBlock').remove();
    }
	


})(jQuery);