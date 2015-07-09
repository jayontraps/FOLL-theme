<?php
/**
 * Template name: news page
 *
 */


get_header(); ?>

	<div class="wrap foll-content">

	<!-- <div id="main" class="site-main" role="main"> -->

		<?php while ( have_posts() ) : the_post(); ?>

		<div class="innerWrap">

			<div class="col-2-3">
				
				<div class="main-content">

					<?php $parent_title =  empty( $post->post_parent ) ? get_the_title( $post->ID ) : get_the_title( $post->post_parent ); ?>	

				<div class="parent_title">			
					<h2><?php echo $parent_title; ?></h2>
				</div>
									
				<?php get_template_part( 'content', 'page' ); ?>

				<?php include "inc/inc-news-list.php"; ?>

				</div>

			</div>

			<div class="col-1-3">
				<?php include "inc/inc-sidebar.php"; ?>
			</div>
			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
