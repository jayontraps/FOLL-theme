
<?php if (get_field('sidebar_panel_options') == "default") : ?>
			
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

					include "inc-sidebar-loop.php";  

					wp_reset_postdata(); 
				?>

			<?php endwhile; ?>

		</div>		

	<?php endif; ?>





<?php elseif (get_field('sidebar_panel_options') == "new") : ?>

	<?php if( have_rows('new_sidebar_panels') ): ?>

		<div class="panel-wrap">

		<?php while( have_rows('new_sidebar_panels') ): the_row(); 

			// vars
			$image = get_sub_field('panel_image');
			$content = get_sub_field('panel_text');
			$link = get_sub_field('panel_link');
			$head = get_sub_field('category_heading');

			include('inc-sidebar-loop.php'); ?>

		<?php endwhile; ?>

		</div>

	<?php endif; ?>





<?php elseif (get_field('sidebar_panel_options') == "existing") : ?>
		
	<div class="panel-wrap">

	<?php 
	// get repeater field data
	$repeater = get_field('existing_sidebar_panels');
	// vars
	$selected = array();
	// populate order
	foreach( $repeater as $i => $row ) {	
		$selected[ $i ] = $row['panel_title'];	
	}

	$args = array (
	    'post_type' => 'sidebar_panels',
		'posts_per_page'   => -1,
		'order' => 'DEC'					    
	);

	$the_query = new WP_Query( $args );

	$j = count($selected);

	for($i = 0; $i < $j ; $i++) {

		if ( $the_query->have_posts() ) {
		 
			while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

				

					<?php
					// vars
					$content = get_field('category_heading');
					$panel_title = get_the_title();

					if ($selected[$i] == $panel_title) {
						// vars
						$image = get_field('panel_image');
						$content = get_field('panel_text');
						$link = get_field('panel_link');
						$head = get_field('category_heading');			
						include('inc-sidebar-loop.php'); 
					}

					?>
				

			<?php endwhile;  

			wp_reset_postdata(); 
		} 		 
	}

	?>
	 
</div>
		
<?php endif; ?>