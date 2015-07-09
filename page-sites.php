<?php
/**
 * Template name: Sites of interest page
 *
 */

get_header(); ?>

	<div class="wrap foll-content sites">

		<?php while ( have_posts() ) : the_post(); ?>

		<div class="innerWrap">

			<div class="col-3-4">

				<div class="main-content">

					<?php $parent_title =  empty( $post->post_parent ) ? get_the_title( $post->ID ) : get_the_title( $post->post_parent ); ?>	

					<div class="parent_title">			
						<h2><?php echo $parent_title; ?></h2>
					</div>

					<header class="entry-header">
						<h1 class="entry-title">Sites of interest</h1>		
					</header>					


					<div class="col-1-3">
						<?php include "inc/inc-sites-nav.php";?>
					</div>
					
					<div class="col-2-3">											
						<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
							
							<div class="entry-content">
								<?php the_content(); ?>
							</div><!-- .entry-content -->

						</article><!-- #post-## -->
					</div>

				</div><!-- .main-content -->
												
			</div>

			<div class="col-1-4">				
				<?php include "inc/inc-sidebar.php"; ?>
			</div>
			
		</div>

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
