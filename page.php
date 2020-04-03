<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package foll
 */

get_header(); ?>

	<div class="wrap foll-content">

		<?php while ( have_posts() ) : the_post(); ?>

		<div class="innerWrap">

			<div class="col-2-3">
				
				<div class="main-content">

					<?php $parent_title =  empty( $post->post_parent ) ? get_the_title( $post->ID ) : get_the_title( $post->post_parent ); ?>	

				<div class="parent_title">			
					<h2><?php echo $parent_title; ?></h2>
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
