<?php
/**
 * The template for displaying all single posts.
 *
 * @package foll
 */

get_header(); ?>

<div class="wrap foll-content">
		
	<?php while ( have_posts() ) : the_post(); ?>


		<div class="innerWrap">

			<div class="col-2-3">
				
				<div class="main-content">	

					<div class="parent_title"><h2>Events</h2></div>					

					<?php get_template_part( 'content', 'events' ); ?>

					<?php // the_post_navigation(); ?>

				</div>

			</div>

			<div class="col-1-3">

<?php 

	$fp_array = array( 1559, 1560 );
	$args = array( 
		'post_type' => 'sidebar_panels', 
		'post__in' => $fp_array,
		'orderby' => 'post__in', 
		 ); 

	$the_query = new WP_Query( $args );  

	if ( $the_query->have_posts() ) : ?>

		<div class="panel-wrap">

			<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>	

				<?php
					// vars
					$image = get_field('panel_image');
					$content = get_field('panel_text');
					$link = get_field('panel_link');
					$head = get_field('category_heading');

					include "inc/inc-sidebar-loop.php";  

					wp_reset_postdata(); 
				?>

			<?php endwhile; ?>

		</div>		

	<?php endif; ?>

			</div>
		
		</div>

</div><!-- .wrap -->	
			

<?php endwhile; // end of the loop. ?>

		
<?php // get_sidebar(); ?>
<?php get_footer(); ?>
