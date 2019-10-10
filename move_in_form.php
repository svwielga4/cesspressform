<?php

/**
 * Template Name: Move In Form
 */

get_header();
?>
<style>
.error {
    color: red;
}
</style>

<h1>Lead Information</h1>
<div class="error" id="error_message" style="display:none">
    <h2>There was a problem with your submission. Errors have been highlighted below.</h2>
</div>

<label for="first_name">*First Name: </label>
<input type="text" id="first_name" maxlength="50">
<span class="error" id="first_name_error" style="display:none">
    <span>This field is required.</span>
</span>
<br/>

<label for="last_name">*Last Name: </label>
<input type="text" id="last_name" maxlength="50">
<span class="error" id="last_name_error" style="display:none">
    <span>This field is required.</span>
</span>
<br/>

<h2>You must fill in at least one: Home Phone, Cell Phone or Email</h2>

<label for="home_phone">Home Phone: </label>
<input type="text" id="home_phone" maxlength="50">
<br/>

<label for="cell_phone">Cell Phone: </label>
<input type="text" id="cell_phone" maxlength="50">
<br/>

<label for="email">Email: </label>
<input type="text" id="email" maxlength="100">
<br/>
<div id="hp_cp_email"></div>
<span class="error" id="hp_cp_email_error" style="display:none">
    <span>At least one point of contact is required, please provide a home phone, cell phone, or email.</span>
</span>

<h2>Mailing Address</h2>

<label for="address_1">Address 1: </label>
<input type="text" id="address_1" maxlength="30">
<br/>

<label for="address_2">Address 2: </label>
<input type="text" id="address_2" maxlength="25">
<br/>

<label for="city">City: </label>
<input type="text" id="city" maxlength="25">
<br/>

<label for="state">State: </label>
<input type="text" id="state" size="2" maxlength="2">
<br/>

<label for="zip">Zip: </label>
<input type="text" id="zip" size="10" maxlength="10">
<br/>

<label for="note">Where did you hear about our Community? </label><br>
<textarea id="note" cols="30" rows="10" maxlength="4000"></textarea>
<br/>

<label for="prospect_first_name">*Prospect First Name: </label>
<input type="text" id="prospect_first_name" maxlength="50">
<span class="error" id="prospect_first_name_error" style="display:none">
    <span>This field is required.</span>
</span>
<br/>

<label for="prospect_last_name">*Prospect Last Name: </label>
<input type="text" id="prospect_last_name" maxlength="50">
<span class="error" id="prospect_last_name_error" style="display:none">
    <span>This field is required.</span>
</span>
<br/>

<label for="typeofservice">Type of Service: </label>
<select id="type_of_service">
    <option value="N/A">-- Choose Service --</option>
    <option value="Assisted Living">Assisted Living</option>
    <option value="Independent Living">Independent Living</option>
    <option value="Short-term Rehab">Short-term Rehab</option>
    <option value="Long-term skilled nursing care/healthcare center">Long-term skilled nursing care/healthcare center</option>
</select>
<br/>
<button id="submit_button">Submit</button>


<?php
get_footer();
