<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package foll
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php include "inc/inc-svg-defs.php"; ?>
<div id="page" class="hfeed site wrap">

	<?php include "inc/inc-top-bar.php"; ?>


	<div id="main" class="site-main" role="main">

	<div class="header-outer">
		<header id="masthead" class="site-header innerWrap" role="banner">

			<div class="site-branding">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<div class="bittern">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bittern.png" alt="FOLL bittern" />
					</div>
						
					<img class="logo" src="<?php echo get_stylesheet_directory_uri(); ?>/img/logo.svg">
	<!-- 
					<h1 class="site-title">Friends of Lavell's Lake</h1> -->
				</a>
			</div><!-- .site-branding -->

			<nav role="navigation" class="cf desktop-nav-wrap" id="lg-screen-nav" itemscope itemtype='https://schema.org/SiteNavigationElement'>
				<?php wp_nav_menu( array( 
				'theme_location' => 'primary',
				'menu_class'      => 'desktop-nav nav' ) ); ?>
			</nav>
		</header><!-- #masthead -->
	</div>

	<?php include "inc/inc-sub-menu-bar.php"; ?>


	




	<div class="off-canvas-navigation menu-button menu-button-mb">
<!-- 		<div class="menu-title">
	  		<h2>Menu</h2>
		</div> -->
	  	<div class="menu menu-btn">
		    <span class="menu-global menu-top"></span>
		    <span class="menu-global menu-middle"></span>
		    <span class="menu-global menu-bottom"></span>
	  	</div>                
	</div> 	
