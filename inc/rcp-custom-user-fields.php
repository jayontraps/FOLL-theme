<?php
/**
 * Adds the custom fields to the registration form and profile editor
 *
 */
function pw_rcp_add_user_fields() {
	
	$phone = get_user_meta( get_current_user_id(), 'rcp_phone', true );
	$address   = get_user_meta( get_current_user_id(), 'rcp_address', true );
	$postcode   = get_user_meta( get_current_user_id(), 'rcp_postcode', true );

	?>
	<p>
		<label for="rcp_phone"><?php _e( 'Phone number', 'rcp' ); ?></label>
		<input name="rcp_phone" id="rcp_phone" type="text" value="<?php echo esc_attr( $phone ); ?>"/>
	</p>
	<p>
		<label for="rcp_address"><?php _e( 'Address', 'rcp' ); ?></label>
		<textarea name="rcp_address" id="rcp_address" type="text"><?php echo esc_attr( $address ); ?></textarea>
	</p>
	<p>
		<label for="rcp_postcode"><?php _e( 'Postcode', 'rcp' ); ?></label>
		<input name="rcp_postcode" id="rcp_postcode" type="text" value="<?php echo esc_attr( $postcode ); ?>"/>
	</p>
	<?php
}
add_action( 'rcp_after_password_registration_field', 'pw_rcp_add_user_fields' );
add_action( 'rcp_profile_editor_after', 'pw_rcp_add_user_fields' );

/**
 * Adds the custom fields to the member edit screen
 *
 */
function pw_rcp_add_member_edit_fields( $user_id = 0 ) {
	
	$phone = get_user_meta( $user_id, 'rcp_phone', true );
	$address   = get_user_meta( $user_id, 'rcp_address', true );
	$postcode   = get_user_meta( $user_id, 'rcp_postcode', true );

	?>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_phone"><?php _e( 'phone', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_phone" id="rcp_phone" type="text" value="<?php echo esc_attr( $phone ); ?>"/>
			<p class="description"><?php _e( 'The member\'s phone', 'rcp' ); ?></p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_phone"><?php _e( 'address', 'rcp' ); ?></label>
		</th>
		<td>
			<textarea name="rcp_address" id="rcp_address" type="text" ><?php echo esc_attr( $address ); ?></textarea> 
			<p class="description"><?php _e( 'The member\'s address', 'rcp' ); ?></p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_postcode"><?php _e( 'postcode', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_postcode" id="rcp_postcode" type="text" value="<?php echo esc_attr( $postcode ); ?>"/>
			<p class="description"><?php _e( 'The member\'s postcode', 'rcp' ); ?></p>
		</td>
	</tr>
	<?php
}
add_action( 'rcp_edit_member_after', 'pw_rcp_add_member_edit_fields' );
 
/**
 * Determines if there are problems with the registration data submitted
 *
 */
function pw_rcp_validate_user_fields_on_register( $posted ) {

	if( empty( $posted['rcp_phone'] ) ) {
		rcp_errors()->add( 'invalid_phone', __( 'Please enter your phone', 'rcp' ), 'register' );
	}

	if( empty( $posted['rcp_address'] ) ) {
		rcp_errors()->add( 'invalid_address', __( 'Please enter your address', 'rcp' ), 'register' );
	}
	if( empty( $posted['rcp_postcode'] ) ) {
		rcp_errors()->add( 'invalid_postcode', __( 'Please enter your postcode', 'rcp' ), 'register' );
	}

}
add_action( 'rcp_form_errors', 'pw_rcp_validate_user_fields_on_register', 10 );

/**
 * Stores the information submitted during registration
 *
 */
function pw_rcp_save_user_fields_on_register( $posted, $user_id ) {

	if( ! empty( $posted['rcp_phone'] ) ) {
		update_user_meta( $user_id, 'rcp_phone', sanitize_text_field( $posted['rcp_phone'] ) );
	}

	if( ! empty( $posted['rcp_address'] ) ) {
		update_user_meta( $user_id, 'rcp_address', sanitize_text_field( $posted['rcp_address'] ) );
	}

	if( ! empty( $posted['rcp_postcode'] ) ) {
		update_user_meta( $user_id, 'rcp_postcode', sanitize_text_field( $posted['rcp_postcode'] ) );
	}

}
add_action( 'rcp_form_processing', 'pw_rcp_save_user_fields_on_register', 10, 2 );

/**
 * Stores the information submitted profile update
 *
 */
function pw_rcp_save_user_fields_on_profile_save( $user_id ) {

	if( ! empty( $_POST['rcp_phone'] ) ) {
		update_user_meta( $user_id, 'rcp_phone', sanitize_text_field( $_POST['rcp_phone'] ) );
	}

	if( ! empty( $_POST['rcp_address'] ) ) {
		update_user_meta( $user_id, 'rcp_address', sanitize_text_field( $_POST['rcp_address'] ) );
	}

	if( ! empty( $_POST['rcp_postcode'] ) ) {
		update_user_meta( $user_id, 'rcp_postcode', sanitize_text_field( $_POST['rcp_postcode'] ) );
	}

}
add_action( 'rcp_user_profile_updated', 'pw_rcp_save_user_fields_on_profile_save', 10 );
add_action( 'rcp_edit_member', 'pw_rcp_save_user_fields_on_profile_save', 10 );