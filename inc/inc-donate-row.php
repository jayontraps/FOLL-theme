
<?php if (is_active_sidebar('sidebar-3' )) : ?>


<div class="wrap donate-row">
	<div class="innerWrap">
		<div class="donate-row-inner">

			<?php dynamic_sidebar('sidebar-3' ); ?>

			<img class="bittern-sm" src="<?php echo get_stylesheet_directory_uri(); ?>/img/bittern2-sm.jpg"; />
		
			<?php if (is_active_sidebar('sidebar-4' )) : ?>

				<?php dynamic_sidebar('sidebar-4' ); ?>

			<?php endif; ?>
			
			<a href="<?php bloginfo('url'); ?>/participate/donate/" class="foll-btn accent-2">Donate</a>

		</div>
	</div>
</div>


<?php endif; ?>

