<?php if( $link ): ?>
	<a href="<?php echo $link; ?>">
<?php endif; ?>

	<div class="panel">
	
		<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />

		<div class="parent_title ">
			<h2><?php echo $head; ?></h2>
		</div>

		<div class="panel-content">
			<?php echo $content; ?>
		</div>			    	

    </div>

<?php if( $link ): ?>
	</a>
<?php endif; ?>