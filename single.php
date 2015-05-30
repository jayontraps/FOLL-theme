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

		<?php get_template_part( 'content', 'single' ); ?>

		<?php the_post_navigation(); ?>

	<?php endwhile; // end of the loop. ?>

		
<?php // get_sidebar(); ?>
<?php get_footer(); ?>
