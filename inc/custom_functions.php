<?php

function enqueue_styles_scripts() { 
	wp_enqueue_style( 'foll-style', get_template_directory_uri() . '/build/screen.css', array(), '116' );
	
	wp_enqueue_script( 'foll-modenizr', get_template_directory_uri() . '/js/vendor/modernizr.custom.98000.js', array(), false);		
	wp_enqueue_style('gfonts', 'http://fonts.googleapis.com/css?family=Roboto|Roboto+Slab');

	wp_enqueue_script( 'foll-main', get_template_directory_uri() . '/build/main.min.js', array('jquery'),'116', true);	

	// wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');

	if ( is_page_template( 'page-search-app.php' ) ) {
		wp_enqueue_script( 'foll-app', get_template_directory_uri() . '/build/app.min.js', array('jquery'), '116', true);	
	}	
} 

add_action('wp_enqueue_scripts', 'enqueue_styles_scripts');




/**
 * Adds the custom fields to the registration form and profile editor
 *
 */
function pw_rcp_add_user_fields() {
	
	$profession = get_user_meta( get_current_user_id(), 'rcp_profession', true );
	$location   = get_user_meta( get_current_user_id(), 'rcp_location', true );
	$interests   = get_user_meta( get_current_user_id(), 'rcp_interests', true );

	?>
	<p>
		<label for="rcp_profession"><?php _e( 'Your Profession', 'rcp' ); ?></label>
		<input name="rcp_profession" id="rcp_profession" type="text" value="<?php echo esc_attr( $profession ); ?>"/>
	</p>
	<p>
		<label for="rcp_location"><?php _e( 'Your Location', 'rcp' ); ?></label>
		<input name="rcp_location" id="rcp_location" type="text" value="<?php echo esc_attr( $location ); ?>"/>
	</p>

	<p>
		<label for="rcp_interests"><?php _e( 'Your interests:', 'rcp' ); ?></label>
		<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Birds"> <span>Birds</span></p>
		<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Walks"> <span>Walks</span></p>
		<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Butterflies and Moths"> <span>Butterflies and Moths</span></p>
		<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Dragonflies and Damselflies"> <span>Dragonflies and Damselflies</span></p>
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
	
	$profession = get_user_meta( $user_id, 'rcp_profession', true );
	$location   = get_user_meta( $user_id, 'rcp_location', true );
	$interests   = get_user_meta( get_current_user_id(), 'rcp_interests', true );

	?>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_profession"><?php _e( 'Profession', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_profession" id="rcp_profession" type="text" value="<?php echo esc_attr( $profession ); ?>"/>
			<p class="description"><?php _e( 'The member\'s profession', 'rcp' ); ?></p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_profession"><?php _e( 'Location', 'rcp' ); ?></label>
		</th>
		<td>
			<input name="rcp_location" id="rcp_location" type="text" value="<?php echo esc_attr( $location ); ?>"/>
			<p class="description"><?php _e( 'The member\'s location', 'rcp' ); ?></p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row" valign="top">
			<label for="rcp_profession"><?php _e( 'interests', 'rcp' ); ?></label>
		</th>
		<td>
			<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Birds"> <span>Birds</span></p>
			<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Walks"> <span>Walks</span></p>
			<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Butterflies and Moths"> <span>Butterflies and Moths</span></p>
			<p><input name="rcp_interests" id="rcp_interests" type="checkbox" value="Dragonflies and Damselflies"> <span>Dragonflies and Damselflies</span></p>

			<p class="description"><?php _e( 'The member\'s interests', 'rcp' ); ?></p>
		</td>
	</tr>	
	<?php
}
add_action( 'rcp_edit_member_after', 'pw_rcp_add_member_edit_fields' );

/**
 * Stores the information submitted during registration
 *
 */
function pw_rcp_save_user_fields_on_register( $posted, $user_id ) {

	if( ! empty( $posted['rcp_profession'] ) ) {
		update_user_meta( $user_id, 'rcp_profession', sanitize_text_field( $posted['rcp_profession'] ) );
	}

	if( ! empty( $posted['rcp_location'] ) ) {
		update_user_meta( $user_id, 'rcp_location', sanitize_text_field( $posted['rcp_location'] ) );
	}

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

	if( ! empty( $_POST['rcp_profession'] ) ) {
		update_user_meta( $user_id, 'rcp_profession', sanitize_text_field( $_POST['rcp_profession'] ) );
	}

	if( ! empty( $_POST['rcp_location'] ) ) {
		update_user_meta( $user_id, 'rcp_location', sanitize_text_field( $_POST['rcp_location'] ) );
	}

	if( ! empty( $_POST['rcp_interests'] ) ) {
		update_user_meta( $user_id, 'rcp_interests', sanitize_text_field( $posted['rcp_interests'] ) );
	}	

}
add_action( 'rcp_user_profile_updated', 'pw_rcp_save_user_fields_on_profile_save', 10 );
add_action( 'rcp_edit_member', 'pw_rcp_save_user_fields_on_profile_save', 10 );




























?>
