<div class="foll-slider innerWrap">
<?php if( have_rows('slides') ): ?>

	<ul class="bxslider-home">

	<?php while( have_rows('slides') ): the_row(); 

		// vars
		$image = get_sub_field('image');
		$title = get_sub_field('title');
		$link = get_sub_field('link');
		$btn_text = get_sub_field('button_text');

		?>

		<li class="slide">
		
			<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
			
			<div class="inner_slide">
				<h2><?php echo $title; ?></h2>
				<div class="foll-hr"></div>
				<?php if( $link ): ?>
					<a href="<?php echo $link; ?>" class="foll-btn accent-1">
				<?php endif; ?>
					<?php echo $btn_text; ?>
				<?php if( $link ): ?>
					</a>
				<?php endif; ?>
			</div>					    

		</li>

	<?php endwhile; ?>

	</ul>

<?php endif; ?>	
</div>