<?php

/**
 * Adds the custom fields to the registration form and profile editor
 *
 */
function pw_rcp_add_user_fields_to_reg_form() {
	
	$interests = get_user_meta( get_current_user_id(), 'rcp_interests', true );

	?>
	<div class="interests">
		<p>
			<label for="rcp_interests"><?php _e( 'Your Interests:', 'rcp' ); ?></label>
		</p>

		<div><input class="interest-options" id="birds" type="checkbox" value="Birds"> <span>Birds</span></div>
		<div><input class="interest-options" id="walks" type="checkbox" value="Walks"> <span>Walks</span></div>
		<div><input class="interest-options" id="butterflies" type="checkbox" value="Butterflies and Moths"> <span>Butterflies and Moths</span></div>
		<div><input class="interest-options" id="dragonflies" type="checkbox" value="Dragonflies and Damselflies"> <span>Dragonflies and Damselflies</span></div>		
		<div><input class="interest-options" id="all" type="checkbox" value="all"> <span>All the above</span></div>

		<input name="rcp_interests" id="rcp_interests" type="hidden" value="<?php echo esc_attr( $interests ); ?>"/>
	</div>
	
	<?php
}
add_action( 'rcp_after_password_registration_field', 'pw_rcp_add_user_fields_to_reg_form' );


/**
 * Adds the custom field to the profile editor
 *
 */
function pw_rcp_add_user_fields() {
	
	$interests = get_user_meta( get_current_user_id(), 'rcp_interests', true );
	// $location   = get_user_meta( get_current_user_id(), 'rcp_location', true );

	?>
	<p>
		<label for="rcp_interests"><?php _e( 'Your Interests', 'rcp' ); ?></label>
<!-- 		<input name="rcp_interests" id="rcp_interests" type="text" value="<?php echo esc_attr( $interests ); ?>"/>
 -->
		<textarea rows="2" name="rcp_interests" id="rcp_interests"><?php echo esc_attr( $interests ); ?></textarea>

 	</p>


	<?php
}

add_action( 'rcp_profile_editor_after', 'pw_rcp_add_user_fields' );





/**
 * Adds the custom fields to the member edit screen
 *
 */
function pw_rcp_add_member_edit_fields( $user_id = 0 ) {
	
	$interests = get_user_meta( $user_id, 'rcp_interests', true );
	$location   = get_user_meta( $user_id, 'rcp_location', true );

	?>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_interests"><?php _e( 'Interests', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_interests" id="rcp_interests" type="text" value="<?php echo esc_attr( $interests ); ?>"/>
			<p class="description"><?php _e( 'The member\'s Interests', 'rcp' ); ?></p>
		</td>
	</tr>



	<?php
}
add_action( 'rcp_edit_member_after', 'pw_rcp_add_member_edit_fields' );
 
/**
 * Determines if there are problems with the registration data submitted
 *
 */
// function pw_rcp_validate_user_fields_on_register( $posted ) {

// 	if( empty( $posted['rcp_interests'] ) ) {
// 		rcp_errors()->add( 'invalid_Interests', __( 'Please enter your Interests', 'rcp' ), 'register' );
// 	}
// }
// add_action( 'rcp_form_errors', 'pw_rcp_validate_user_fields_on_register', 10 );

/**
 * Stores the information submitted during registration
 *
 */
function pw_rcp_save_user_fields_on_register( $posted, $user_id ) {

	if( ! empty( $posted['rcp_interests'] ) ) {
		update_user_meta( $user_id, 'rcp_interests', sanitize_text_field( $posted['rcp_interests'] ) );
	}
}
add_action( 'rcp_form_processing', 'pw_rcp_save_user_fields_on_register', 10, 2 );

/**
 * Stores the information submitted profile update
 *
 */
function pw_rcp_save_user_fields_on_profile_save( $user_id ) {

	if( ! empty( $_POST['rcp_interests'] ) ) {
		update_user_meta( $user_id, 'rcp_interests', sanitize_text_field( $_POST['rcp_interests'] ) );
	}
}
add_action( 'rcp_user_profile_updated', 'pw_rcp_save_user_fields_on_profile_save', 10 );
add_action( 'rcp_edit_member', 'pw_rcp_save_user_fields_on_profile_save', 10 );