<?php 
	$temp = $wp_query; 
	$wp_query = null; 
	$wp_query = new WP_Query(); 

	$today = date('Ymd');

	$args = array (			
		'post_type' => 'post',
		'posts_per_page' => 10,
		'paged' => $paged,
		'cat' => -15,	
		'orderby' => 'meta_value_num',
		'order' => 'DESC'					    
	);

  $wp_query->query($args); 

  while ($wp_query->have_posts()) : $wp_query->the_post(); 

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
	<?php // boc_entry_meta(); ?>
	<?php the_excerpt(); ?>
	<hr />

</article>

<?php endwhile; 
wp_reset_postdata(); 
?>


<?php /* Display navigation to next/previous pages when applicable */ ?>
<?php if ( function_exists('foll_pagination') ) { foll_pagination(); } else if ( is_paged() ) { ?>
	<nav id="post-nav">
		<div class="post-previous"><?php next_posts_link( __( '&larr; Older posts', 'foll' ) ); ?></div>
		<div class="post-next"><?php previous_posts_link( __( 'Newer posts &rarr;', 'foll' ) ); ?></div>
	</nav>
<?php } ?>



<?php 
  $wp_query = null; 
  $wp_query = $temp;  // Reset
?>		
