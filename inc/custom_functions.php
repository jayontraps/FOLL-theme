<?php

function enqueue_styles_scripts() { 
	wp_enqueue_style( 'foll-style', get_template_directory_uri() . '/build/screen.css', array(), '122' );
	
	wp_enqueue_script( 'foll-modenizr', get_template_directory_uri() . '/js/vendor/modernizr.custom.98000.js', array(), false);		
	wp_enqueue_style('gfonts', 'http://fonts.googleapis.com/css?family=Roboto|Roboto+Slab');

	wp_enqueue_script( 'foll-main', get_template_directory_uri() . '/build/main.min.js', array('jquery'),'122', true);	

	// wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');

	if ( is_page_template( 'page-search-app.php' ) ) {
		wp_enqueue_script( 'foll-app', get_template_directory_uri() . '/build/app.min.js', array('jquery'), '122', true);	
	}	
} 

add_action('wp_enqueue_scripts', 'enqueue_styles_scripts');




// show admin bar only for admins and editors
if (!current_user_can('edit_posts')) {
	add_filter('show_admin_bar', '__return_false');
}

// Soliloquy slider 
add_filter( 'soliloquy_defaults', 'tgm_soliloquy_default_settings', 20, 2 );
function tgm_soliloquy_default_settings( $defaults, $post_id ) {
    
    $defaults['slider_width']  = 800; // Slider width.
    $defaults['slider_height'] = 400; // Slider height.
    $defaults['auto'] = 0; 
    $defaults['smooth'] = 0; 
    $defaults['slider'] = 0; 
    
    return $defaults;
    
}


















?>
