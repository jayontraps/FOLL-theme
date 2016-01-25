<?php
/**
 * Template name: members page
 *
 */

get_header(); ?>

	<div class="wrap foll-content">

		<?php while ( have_posts() ) : the_post(); ?>

		<div class="innerWrap">

			<div class="col-2-3">
				
				<div class="main-content">					

				<div class="parent_title">			
					<h2>Members Area</h2>
				</div>									

				<?php get_template_part( 'content', 'page' ); ?>

				</div>

			</div>

			<div class="col-1-3">
				<?php include "inc/inc-sidebar.php"; ?>
			</div>
			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
