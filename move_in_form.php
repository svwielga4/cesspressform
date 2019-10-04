<?php

/**
 * Template Name: Move In Form
 */

get_header();
?>

<h1>Lead Information</h1>

<label for="first_name">*First Name: </label>
<input type="text" id="first_name" size="50" maxlength="50">
<br/>

<label for="last_name">*Last Name: </label>
<input type="text" id="last_name" size="50" maxlength="50">
<br/>

<h2>You must fill in at least one: Home Phone, Cell Phone or Email</h2>

<label for="home_phone">Home Phone: </label>
<input type="text" id="home_phone">
<br/>

<label for="cell_phone">Cell Phone: </label>
<input type="text" id="cell_phone">
<br/>

<label for="email">Email: </label>
<input type="text" id="email">
<br/>

<h2>Mailing Address</h2>

<label for="address_1">Address 1: </label>
<input type="text" id="address_1">
<br/>

<label for="address_2">Address 2: </label>
<input type="text" id="address_2">
<br/>

<label for="city">City: </label>
<input type="text" id="city">
<br/>

<label for="state">State: </label>
<input type="text" id="state">
<br/>

<label for="zip">Zip: </label>
<input type="text" id="zip">
<br/>

<label for="note">Where did you hear about our Community? </label><br>
<textarea id="note" cols="30" rows="10" maxlength="4000"></textarea>
<br/>

<label for="prospect_first_name">*Prospect First Name: </label>
<input type="text" id="prospect_first_name">
<br/>

<label for="prospect_last_name">*Prospect Last Name: </label>
<input type="text" id="prospect_last_name">
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
