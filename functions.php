<?php
/**
 * foll functions and definitions
 *
 * @package foll
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'foll_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function foll_setup() {

	// override default jQuery version (1.8.2) 
	if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
	function my_jquery_enqueue() {
	   wp_deregister_script('jquery');
	   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", false, null);
	   wp_enqueue_script('jquery');
	}


	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on foll, use a find and replace
	 * to change 'foll' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'foll', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'foll' ),
		'members' => __( 'Members Menu', 'foll' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'foll_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // foll_setup
add_action( 'after_setup_theme', 'foll_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function foll_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'foll' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer text', 'foll' ),
		'id'            => 'sidebar-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );


	register_sidebar( array(
		'name'          => __( 'Donate row - above logo', 'foll' ),
		'id'            => 'sidebar-3',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Donate row - below logo', 'foll' ),
		'id'            => 'sidebar-4',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="last-widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'foll_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function foll_scripts() {
	wp_enqueue_style( 'foll-style-definition', get_stylesheet_uri() );

	// wp_enqueue_script( 'facebook-sdk', 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v6.0&appId=1773641676192356&autoLogAppEvents=1' );

	// wp_enqueue_script( 'foll-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'foll-skip-link-focus-fix', get_template_directory_uri() . '/js/_js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'foll_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Load custom functions.
 */
require get_template_directory() . '/inc/custom_functions.php';

/**
 * Adds custom fields to RCP profile / registration: https://pippinsplugins.com/adding-custom-user-fields-restrict-content-pro/
 */
require get_template_directory() . '/inc/rcp-custom-user-fields.php';
require get_template_directory() . '/inc/rcp-custom-user-fields-gift-aid.php';

/**
 * do not want upgrades to be prorated https://docs.restrictcontentpro.com/article/1559-upgrading-between-subscription-levels
 */

add_filter( 'rcp_disable_prorate_credit', '__return_true' );

/**
 * Add attributes to Facebook script tag
 */
// add_filter( 'script_loader_tag', 'add_id_to_script', 10, 3 );
 
// function add_id_to_script( $tag, $handle, $src ) {
//     if ( 'facebook-sdk' === $handle ) {
//         $tag = '<script type="text/javascript" src="' . esc_url( $src ) . '" async defer crossorigin="anonymous"></script>';
//     }
 
//     return $tag;
// }

