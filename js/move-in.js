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
    var hpCpEmail = $('#hp_cp_email');
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
        $('#first_name_error').empty();
        $('#prospect_first_name_error').empty();
        $('#last_name_error').empty();
        $('#prospect_last_name_error').empty();
        $('#hp_cp_email_error').empty();

        // do some validation on the input values
        // check first name is length > 0
        var first_name_error = firstName.val().length > 0
                                ? false
                                : true;

        // check prospect first name
        var prospect_first_name_error = prospectFirstName.val().length > 0
                                        ? false
                                        : true;

        // checkl last name is length > 0
        var last_name_error = lastName.val().length > 0
                                ? false
                                : true;

        // check prospect last name
        var prospect_last_name_error = prospectLastName.val().length > 0
                                        ? false
                                        : true;

        // check if email has a value
        // if yes, check if value is valid                               

        // check if at least one hp cp email has value
        // check if that one is valid
        // var hp_cp_email_error = function() {
        //     if (email.val().length <= 0 && homePhone.val().length <= 0 && cellPhone.val().length <= 0) {
        //         console.log('hp_cp_email_error is true');
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } 

        // check if email has a value
        var emailHasValue = email.val().length > 0
                                ? true 
                                : false; 
        console.log('emailHasValue ' + emailHasValue);

        var hp_cp_email_error = function(){
            if (emailHasValue) {
                // check if email is valid
                console.log('email entered: ' + email.val());
                if (validateEmail(email.val())) {
                    // looks good, send it
                    console.log('send email data');
                }
            } else if (homePhone.val().length > 0 || cellPhone.val().length > 0) {
                // check if number is valid
                if (homePhone.val().length > 0) {
                    var home_phone_error = validatePhoneNum(homePhone.val())
                                            ? true
                                            : false;
                }
                
                if (cellPhone.val().length > 1) {

                }

            } else {
                console.log('no contact fields were filled out');
                return true;
            }
        }

        var validatePhoneNum = function(phoneNum){
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (phoneNum.match(phoneno)) {
                return true;
            } else {
                return false;
            }
        }
        

        // if (hp_cp_email_error) {
        //     return {
        //         first_name: first_name_error,
        //         last_name: last_name_error,
        //         prospect_first_name: prospect_first_name_error,
        //         prospect_last_name: prospect_last_name_error,
        //         hp_cp_email: hp_cp_email_error
        //     };
        // }

        var requiredFields = [first_name_error, prospect_first_name_error, last_name_error, prospect_last_name_error, hp_cp_email_error()];

        for (var i=0; i<requiredFields.length; i++) {
            if (requiredFields[i]) {
                switch (i) {
                    case 0:
                        displayErrors(firstName);
                        break;
                    case 1:
                        displayErrors(prospectFirstName);
                        break;
                    case 2:
                        displayErrors(lastName);
                        break;
                    case 3: 
                        displayErrors(prospectLastName);
                        break;
                    case 4: 
                        displayErrors(hpCpEmail);
                        break;
                    default:
                        console.log('Sorry, something went wrong');
                }
            }
        }


    }

    // returns true or false ?
    var validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * updates the DOM to notify a user about improper form data
     */
    var displayErrors = function(field_id){
        $('#error_message').empty();
        // when some data is not present
        // give some tips to the user on what to do
        // to put the form in a good state
        $('#error_message').append('<h2>There was a problem with your submission. Errors have been highlighted below.</h2>');

        if (field_id.selector == '#hp_cp_email') {
            $(field_id.selector + '_error').append('<span>At least one point of contact is required, please provide a home phone, cell phone, or email.</span>');
        } else {
            $(field_id.selector + '_error').append('<span>This field is required.</span>');
        }
        
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
                if(!res.success){
                    console.log('something bad happened');
                    return;
                }
                // display success message
                console.log('you made it');
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
        console.log(hasErrors);
        // if (hasErrors) {
        //     // early return because there are errors
        //     displayErrors();
        //     return;
        // }

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

