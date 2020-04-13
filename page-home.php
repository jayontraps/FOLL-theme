<?php
/**
 * Template name: home page
 *
 */

get_header(); ?>

	<div class="wrap homepage-content">

	<!-- <div id="main" class="site-main" role="main"> -->

		<?php while ( have_posts() ) : the_post(); ?>

		<?php include "inc/inc-homepage-slider.php"; ?>		

		<div class="home-row">
			<div class="feed">
				<?php include "inc/feed-twitter.php"; ?>
			</div>			
			<div class="feed">
				<?php include "inc/feed-facebook.php"; ?>
			</div>
			<div class="feed">
				<?php include "inc/feed-youtube.php"; ?>
			</div>			
		</div>

		<div class="home-row">
			<?php 
				$rows = get_field('home_panels');
				$first = array_shift($rows);
				// sub fields
				$first_image = $first['image'];
				$first_heading = $first['heading'];
				$first_copy = $first['copy'];
				$first_link = $first['panel_link'];
			?>

			<div class="h-panel">				
				<h2><?php if( $first_link ): ?><a href="<?php echo $first_link; ?>"><?php endif; ?>	<?php echo $first_heading; ?><?php if( $first_link ): ?></a><?php endif; ?>	</h2>

				<p><?php echo $first_copy; ?></p>

				<?php if( $first_link ): ?>
					<a href="<?php echo $first_link; ?>">
				<?php endif; ?>
					<div class="h-panel-img-wrap">

						<img src="<?php echo $first_image['url']; ?>" alt="<?php echo $first_image['alt'] ?>" />

						<div class="h-panel-overlay">
							<div class="centered">
								<h4>Explore</h4>
							</div>	
						</div>
					</div>						
				<?php if( $first_link ): ?>
					</a>
				<?php endif; ?>									    
			</div>

			<div class="h-panel">							
				<h2><a href="/">Latest News</a></h2>						
				<div class="h-panel__inner">
					<?php include('inc/feed-events.php') ?>			    
				</div>
			</div>

		</div>

							
		
		<?php if( have_rows('home_panels') ): ?>

			<div class="home-row">

			<?php foreach( $rows as $row ) : ?>
	
			<div class="h-panel">				
				<h2><?php if( $row['panel_link'] ): ?><a href="<?php echo $row['panel_link']; ?>"><?php endif; ?>	<?php echo $row['heading']; ?><?php if( $row['panel_link'] ): ?></a><?php endif; ?>	</h2>
				<p><?php echo $row['copy']; ?></p>

				<?php if( $row['panel_link'] ): ?>
					<a href="<?php echo $row['panel_link']; ?>">
				<?php endif; ?>
					<div class="h-panel-img-wrap">

						<img src="<?php echo $row['image']['url']; ?>" alt="<?php echo $row['image']['alt'] ?>" />

						<div class="h-panel-overlay">
							<div class="centered">
								<h4>Explore</h4>
							</div>	
						</div>
					</div>						
				<?php if( $row['panel_link'] ): ?>
					</a>
				<?php endif; ?>									    
			</div>

			<?php endforeach; ?>

			</div><!-- .home-panels -->

		<?php endif; ?>
			

		
		

		

	</div><!-- .wrap -->		

			

		<?php endwhile; // end of the loop. ?>
		
		

<?php get_footer(); ?>