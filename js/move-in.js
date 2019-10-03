var formHandler = (function($){
    // references to all our inputs so we can do some validation on the front end
    var firstName = $('#first_name');
    var lastName = $('#last_name');
    var homePhone = $('#home_phone');
    var cellPhone = $('#cell_phone');
    var email = $('#email');
    var address1 = $('#address_1');
    var address2 = $('#address_2');
    var state = $('#state');
    var city = $('#city');
    var zip = $('#zip');
    var note = $('#note');
    var prospectFirstName = $('#prospect_first_name');
    var prospectLastName = $('#prospect_last_name');
    var typeOfService = $('#type_of_service');
    var submitButton = $('#submit_button');

    /**
     * checks all the inputs to make sure they are in a good state
     * @return errors object|false
     */
    var checkInputs = function(){
        // do some validation on the input values
    }

    /**
     * updates the DOM to notify a user about improper form data
     */
    var displayErrors = function(){
        // when some data is not present
        // give some tips to the user on what to do
        // to put the form in a good state
    }

    /**
     * Grabs all the form values and extra data needed for form submission
     */
    var packageData = function(){
        return {
            action: 'move_in_form_submission',
            nonce: FROM_WP.nonce,
            firstName: firstName.val(),
            lastName: lastName.val(),
            homePhone: homePhone.val(),
            cellPhone: cellPhone.val(),
            email: email.val(),
            address1: address1.val(),
            address2: address2.val(),
            city: city.val(),
            state: state.val(),
            zip: zip.val(),
            note: note.val(),
            prospectFirstName: prospectFirstName.val(),
            prospectLastName: prospectLastName.val(),
            typeOfService: typeOfService.val(),
        };
    }

    var submitForm = function(data){
        // if button isnt disabled
        // submit the information to OUR server
        $.ajax({
            method: "POST",
            url: FROM_WP.ajax_url, //localize the ajax url from wp
            data: data, // package all the data up first
            success: function(res){
                // some success actions
                console.log('good')
            },
            error: function(){
                // some error actions
                console.log('bad')

            }
        });
    }

    var handleSubmit = function(){
        // check for violations
        var hasErrors = checkInputs();
        // if some violations display Errors
        if (hasErrors) {
            // early return because there are errors
            displayErrors();
            return;
        }

        // if everything is good, pack up the data and submit
        var data = packageData();
        submitForm(data);
    }

    var init = function(){
        submitButton.click(handleSubmit)
    }

    return { init: init }


})(jQuery);

jQuery(document).ready(function () {
    formHandler.init();
});

