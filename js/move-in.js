// error representation is bad

var formHandler = (function ($) {
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
    var prospectAge = $('#prospect_age');
    var prospectAnnualIncome = $('#prospect_annual_income');
    var prospectIntHob = $('#prospect_int_hob');
    //var typeOfService = $('#type_of_service');
    var submitButton = $('#submit_button');
    var topErrorMessage = $('#error_message');
    var apiErrorMessage = $('#api_error_message');
    var successMessage = $('#success_message');

    var clearDisplayedErrors = function () {
        $('#first_name_error').hide();
        $('#prospect_first_name_error').hide();
        $('#last_name_error').hide();
        $('#prospect_last_name_error').hide();
        $('#hp_cp_email_error').hide();
    }

    var clearInputs = function () {
        $('input').val('');
    }

    var clearMessages = function () {
        $('#api_error_message').empty();
        $('#success_message').hide();
        $('#error_message').hide();
    }

    var hasNoValue = function (field) {
        return field.val().length > 0
            ? false
            : true;
    }

    /**
     * checks all the inputs to make sure they are in a good state
     * @return errors object|false
     */
    var checkInputs = function () {
        clearDisplayedErrors();
        // do some validation on the input values
        // check first name is length > 0
        var first_name_error = hasNoValue(firstName);
        // check prospect first name
        var prospect_first_name_error = hasNoValue(prospectFirstName);
        // checkl last name is length > 0
        var last_name_error = hasNoValue(lastName);
        // check prospect last name
        var prospect_last_name_error = hasNoValue(prospectLastName);
        var contact_fields_error = contactFieldsHaveErrors();

        var errors = [
            first_name_error, prospect_first_name_error,
            last_name_error, prospect_last_name_error,
            contact_fields_error
        ];
        
        if (errors.indexOf(true) === -1) {
            return false;
        }

        // object of fields with error at 0 and jQuery reference at 1
        // errors are true
        var requiredFieldsErrors = {
            firstName: [first_name_error, firstName],
            prospectFirstName: [prospect_first_name_error, prospectFirstName],
            lastName: [last_name_error, lastName],
            prospectLastName: [prospect_last_name_error, prospectLastName],
            contactFields: [contact_fields_error, hpCpEmail]
        }

        return requiredFieldsErrors;
    }

    var showError = function (field_id) {
        // when some data is not present
        // give some tips to the user on what to do
        // to put the form in a good state
        topErrorMessage.show();
        $(field_id.selector + '_error').show();
    }

    /**
     * updates the DOM to notify a user about improper form data
     */
    var displayErrors = function (errors) {
        for (field in errors) {
            var fieldhasError = errors[field][0];
            var element = errors[field][1];
            if (fieldhasError) {
                showError(element);
            }
        }
    }

    var contactFieldsHaveErrors = function () {
        // check if email has value
        var emptyEmail = hasNoValue(email);
        // check if hp has value
        var emptyHomePhone = hasNoValue(homePhone);
        // check if cp has value
        var emptyCellPhone = hasNoValue(cellPhone);
        // 
        var contacts = [emptyEmail, emptyHomePhone, emptyCellPhone];

        // if no value return novalueerror
        if (contacts.indexOf(false) === -1) {
            return true;
        }

        // if there is one validate the ones present
        var isValidEmail = validateEmail(email);
        var isValidHomePhone = validatePhoneNum(homePhone);
        var isValidCellPhone = validatePhoneNum(cellPhone);
        var validStuff = [isValidEmail, isValidHomePhone, isValidCellPhone];

        // TODO: not acting right here
        if (validStuff.indexOf(true) !== -1) {
            return false;
        }

        return false;
    }


    var validatePhoneNum = function (phoneNum) {
        num = phoneNum.val();
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (num.match(phoneno)) {
            return true;
        }

        return false;
    }

    // returns true or false ?
    var validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Grabs all the form values and extra data needed for form submission
     */
    var packageData = function () {
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
            note: note.val() 
                + " PROSPECT ANNUAL INCOME: "
                + prospectAnnualIncome.val()
                + " PROSPECT AGE: " 
                + prospectAge.val() 
                + " PROSPECT INTERESTS/HOBBIES: " 
                + prospectIntHob.val(),
            prospectFirstName: prospectFirstName.val(),
            prospectLastName: prospectLastName.val(),
            typeOfService: 'Independent',
        };
    }

    var submitForm = function (data) {
        // if button isnt disabled
        // submit the information to OUR server
        $.ajax({
            method: "POST",
            url: FROM_WP.ajax_url, //localize the ajax url from wp
            data: data, // package all the data up first
            success: function (res) {
                // some success actions
                if (!res.success) {
                    //var stringApiErrorMessage = apiErrorMessage.text(res.data.toString().replace(/"/g, ""));
                    if (res.data.toString().indexOf("Duplicate") == 1) {
                        $('#error_message').show();
                        return apiErrorMessage.text("Sorry, this prospect is already in the system. If this is a mistake, please call for further assistance.");
                    }
                    
                    return apiErrorMessage.text(res.data.toString().replace(/"/g, ""));
                }
                clearInputs();
                $('#form').empty();
                // display a success message
                successMessage.show();
                console.log('Lead Loaded Successfully');
            },
            error: function () {
                // display some error to the user
                console.log('Something went wrong')

            }
        });
    }

    var handleSubmit = function () {
        clearMessages();
        // check for violations
        var errors = checkInputs();
        // if some violations display Errors
        if (errors) {
            // early return because there are errors
            displayErrors(errors);
            return;
        }

        // if everything is good, pack up the data and submit
        var data = packageData();
        submitForm(data);
    }

    var init = function () {
        submitButton.click(handleSubmit)
    }

    return { init: init }


})(jQuery);

jQuery(document).ready(function () {
    formHandler.init();
});

