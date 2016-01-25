<?php
/**
 * The template for displaying all single avifauna posts.
 *
 * @package foll
 */

get_header(); ?>

<div class="wrap foll-content">
		
	<?php while ( have_posts() ) : the_post(); ?>


		<div class="innerWrap">

			<div class="col-3-4">

				<div class="main-content">

					<div class="parent_title">			
						<h2>Avifauna</h2>
					</div>

					<div class="col-1-3">
						<?php include "inc/inc-sites-nav.php";?>
					</div>
					
					<div class="col-2-3">											
						<?php get_template_part( 'content', 'sites' ); ?>
					</div>

				</div><!-- .main-content -->
												
			</div>

			<div class="col-1-4">	
				<div class="sites-aside">
					<?php include "inc/inc-right-col-image.php"; ?>
				</div>							
			</div>
		
		</div>

</div><!-- .wrap -->	
			

<?php endwhile; // end of the loop. ?>

		
<?php // get_sidebar(); ?>
<?php get_footer(); ?>
