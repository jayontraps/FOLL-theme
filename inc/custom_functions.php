<?php

function enqueue_styles_scripts() { 
	wp_enqueue_style( 'foll-style', get_template_directory_uri() . '/build/screen.css', array(), '103' );
	
	wp_enqueue_script( 'foll-modenizr', get_template_directory_uri() . '/js/vendor/modernizr.custom.98000.js', array(), false);		
	wp_enqueue_style('gfonts', 'http://fonts.googleapis.com/css?family=Roboto');

	wp_enqueue_script( 'foll-main', get_template_directory_uri() . '/build/main.min.js', array('jquery'),'2015', true);	

	// wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
} 

add_action('wp_enqueue_scripts', 'enqueue_styles_scripts');

?>
