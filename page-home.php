<?php
/**
 * Template name: home page
 *
 */

get_header(); ?>

	<div class="wrap">

	<!-- <div id="main" class="site-main" role="main"> -->

		<?php while ( have_posts() ) : the_post(); ?>

		<div class="innerWrap">

			
			<?php include "inc/inc-homepage-slider.php"; ?>
		
			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
