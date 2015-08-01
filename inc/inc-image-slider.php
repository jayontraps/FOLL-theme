<?php if( have_rows('image_gallery') ): ?>

	<ul class="page-slider">

	<?php while( have_rows('image_gallery') ): the_row(); 
		// vars
		$image = get_sub_field('image');
		$caption = get_sub_field('caption');
		?>
		<li><img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" title="<?php echo $caption; ?>" /></li>
	<?php endwhile; ?>
	
	</ul>
<?php endif; ?>