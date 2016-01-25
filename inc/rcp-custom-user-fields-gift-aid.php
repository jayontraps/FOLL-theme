<?php

/**
 * Adds the custom fields to the registration form
 *
 */
function pw_rcp_add_giftaid_fields_to_reg_form() {
	
	$giftaid = get_user_meta( get_current_user_id(), 'rcp_giftaid', true );

	?>
	<div class="giftaid">

		<h3>Gift Aid Declaration:</h3>

		<p>If you are a UK tax payer and you have not already made a Gift Aid declaration to FOLL, you can increase the value of this and future donations by ticking the box belo. FOLL can then reclaim an additional 25p for every £1.00 donated.</p>

		<div class="giftaid-dec"><input class="giftaid-option" id="giftaid-checkbox" type="checkbox"> <span class="declaration">I am a UK taxpayer and would like FOLL to treat this and all future subscriptions and donations I make, as Gift Aid donations, until I notify them otherwise. I confirm I have paid or will pay an amount of Income Tax and/or Capital Gains Tax for each tax year (6 April to 5 April) that is at least equal to the amount of tax that all the charities or Community Amateur Sports Clubs (CASCs) that I donate to will reclaim on my gifts for that tax year. </span></div>		

		<input name="rcp_giftaid" id="rcp_giftaid" type="hidden" value="<?php echo esc_attr( $giftaid ); ?>"/>
	</div>
	
	<?php
}
add_action( 'rcp_after_password_registration_field', 'pw_rcp_add_giftaid_fields_to_reg_form' );




/**
 * Adds the custom field to the profile editor
 *
 */
function pw_rcp_add_giftaid_fields() {
	
	$giftaid = get_user_meta( get_current_user_id(), 'rcp_giftaid', true );

	?>
	<p>
		<label for="rcp_giftaid"><?php _e( 'Your giftaid', 'rcp' ); ?></label>
		<input name="rcp_giftaid" id="rcp_giftaid" type="text" value="<?php echo esc_attr( $giftaid ); ?>"/>
 	</p>

	<?php
}

add_action( 'rcp_profile_editor_after', 'pw_rcp_add_giftaid_fields' );





/**
 * Adds the custom fields to the member edit screen
 *
 */
function pw_rcp_add_giftaid_member_edit_fields( $user_id = 0 ) {
	
	$giftaid = get_user_meta( $user_id, 'rcp_giftaid', true );

	?>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_giftaid"><?php _e( 'giftaid', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_giftaid" id="rcp_giftaid" type="text" value="<?php echo esc_attr( $giftaid ); ?>"/>
			<p class="description"><?php _e( 'The member\'s giftaid', 'rcp' ); ?></p>
		</td>
	</tr>

	<?php
}
add_action( 'rcp_edit_member_after', 'pw_rcp_add_giftaid_member_edit_fields' );
 





function pw_rcp_save_giftaid_fields_on_register( $posted, $user_id ) {

	if( ! empty( $posted['rcp_giftaid'] ) ) {
		update_user_meta( $user_id, 'rcp_giftaid', sanitize_text_field( $posted['rcp_giftaid'] ) );
	}
}
add_action( 'rcp_form_processing', 'pw_rcp_save_giftaid_fields_on_register', 10, 2 );





/**
 * Stores the information submitted profile update
 *
 */
function pw_rcp_save_giftaid_fields_on_profile_save( $user_id ) {

	if( ! empty( $_POST['rcp_giftaid'] ) ) {
		update_user_meta( $user_id, 'rcp_giftaid', sanitize_text_field( $_POST['rcp_giftaid'] ) );
	}
}
add_action( 'rcp_user_profile_updated', 'pw_rcp_save_giftaid_fields_on_profile_save', 10 );
add_action( 'rcp_edit_member', 'pw_rcp_save_giftaid_fields_on_profile_save', 10 );