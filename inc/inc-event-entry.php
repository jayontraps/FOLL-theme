<?php // echo date('d/M/Y', $time) . " : " . "<br>"; 
$category = get_the_category(); 
$cat = $category[0]->cat_name;

?>


<div class="e-entry <?php if ($cat == "Bird walks") {echo "bird-walk";} else {echo "work-party";}?>">

	<div class="e-date">
		<div class="e-weekday"><?php echo date('D', $time); ?></div>
		<div class="e-day"><?php echo date('d', $time); ?></div>
	</div>

	<div class="e-content">

		<div class="e-entry-header">
			<h4 class="e-title"><a href="<?php the_permalink(); ?>"><?php echo $cat; ?></a></h4>
			<div class="e-category">
			<?php if ($cat == "Bird walks") : ?> 
				<a href="<?php bloginfo('url'); ?>/participate/monthly-bird-walks/"><svg class="icon-e-category icon-bins"><use xlink:href="#icon-bins"></use></svg></a>
			<?php elseif ($cat == "Work parties") : ?>
				<a href="<?php bloginfo('url'); ?>/participate/volunteer-work-parties/"><svg class="icon-e-category icon-wheel-barrow"><use xlink:href="#icon-wheel-barrow"></use></svg></a>
			<?php endif; ?>			

			</div>			
		</div>
		
		<div class="e-content-inner">
			<div class="e-location"><p><span class="loc">Location: </span><?php the_field('location') ?></p></div>
			<div class="e-details"><?php the_excerpt(); ?></div>	
		</div>
				
		
	</div>

</div>