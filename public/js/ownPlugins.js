(function($){
	
	$.fn.transformAppInput = function(){
		
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

    $.showValidationError = function(options){

        let defaultOptions = {
            "message": "error"
        };

        var properties = $.extend(defaultOptions, options);
		
        $.hideValidationError();

        $('#errorBlock').empty();

        $('#errorBlock').text(properties["message"]);
        
        $('#errorBlock').show();
	}

    
    $.hideValidationError = function(){
        $('#errorBlock').hide();
    }
	
})(jQuery);