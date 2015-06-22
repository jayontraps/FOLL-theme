<?php
/**
 * Template name: home page
 *
 */

get_header(); ?>

	<div class="wrap">

	<!-- <div id="main" class="site-main" role="main"> -->

		<?php while ( have_posts() ) : the_post(); ?>


		<?php include "inc/inc-homepage-slider.php"; ?>

		

		<?php if( have_rows('home_panels') ): ?>

			<div class="innerWrap home-panels">

			<?php while( have_rows('home_panels') ): the_row(); 

				// vars
				$image = get_sub_field('image');
				$heading = get_sub_field('heading');
				$copy = get_sub_field('copy');
				$link = get_sub_field('panel_link');

				?>

				<div class="h-panel">


					

					<h2><?php echo $heading; ?></h2>
					<p><?php echo $copy; ?></p>

					<?php if( $link ): ?>
						<a href="<?php echo $link; ?>">
					<?php endif; ?>
						<div class="h-panel-img-wrap">

							<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />

							<div class="h-panel-overlay">
								<div class="outer">
									<div class="inner">
										<div class="centered"><h4>Explore</h4></div>
									</div>
								</div>						
							</div>

						</div>
						

					<?php if( $link ): ?>
						</a>
					<?php endif; ?>
									    
				</div>

			<?php endwhile; ?>

			</div><!-- .home-panels -->

		<?php endif; ?>
			

		
		

		

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>
