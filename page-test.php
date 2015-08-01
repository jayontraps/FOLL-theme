<?php
/**
 * Template name: test page
 *
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

				<ul class="page-slider">
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/apple-blossom.jpg" title="Funky roots" /></li>
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/crassula-removal.jpg" title="The long and winding road" /></li>
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/Elecampane-Innula-Nelenium.jpg" title="Happy trees" /></li>
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/loddon-lilies.jpg" title="Happy trees" /></li>
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/mortimers-meadow-buttercups.jpg" title="Happy trees" /></li>
				  <li><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/test-gallery/spring-phragmites.jpg" title="Happy trees" /></li>
				</ul>				

				</div>

			</div>

			<div class="col-1-3">
				<?php include "inc/inc-sidebar.php"; ?>
			</div>
			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
