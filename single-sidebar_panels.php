<?php
/**
 * The template for displaying all single posts.
 *
 * @package foll
 */

get_header(); ?>

<div class="wrap">
	
	<div id="main" class="site-main" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<?php
					// vars
					$image = get_field('panel_image');
					$content = get_field('panel_text');
					$link = get_field('panel_link');
					$head = get_field('category_heading');

					include "inc/inc-sidebar-loop.php";  

				?>

		<?php the_post_navigation(); ?>

	<?php endwhile; // end of the loop. ?>

		
<?php // get_sidebar(); ?>
<?php get_footer(); ?>
