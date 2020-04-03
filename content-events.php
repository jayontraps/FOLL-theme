

<?php
/**
 * @package foll
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<?php $date = DateTime::createFromFormat('Ymd', get_field('expire_date')); ?>
		<div class="e-date-single"><?php echo $date->format('d-m-Y');?></div>				
		<div class="e-location-single"><p><span class="loc">Location: </span><?php the_field('location') ?></p></div>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'foll' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php // foll_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
