<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package foll
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php if ($post->post_parent > 0 ): ?>
	
		<header class="entry-header">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header>

	<?php endif; ?>

	

	<div class="entry-content">
		<?php if ( has_post_thumbnail() ) {the_post_thumbnail();} ?> 		
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'foll' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php // edit_post_link( __( 'Edit', 'foll' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
