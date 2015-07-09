<?php if( have_rows('right_column_image') ): ?>

	<?php while( have_rows('right_column_image') ): the_row(); 

		// vars
		$image = get_sub_field('image');
		$caption = get_sub_field('caption');

		?>

		<div class="image-panel">

			<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />

			<?php if( $caption ): ?>
				<p><?php echo $caption; ?></p>
			<?php endif; ?>


		</div>

	<?php endwhile; ?>

<?php endif; ?>