<?php 
$args = array(
	// arguments for your query
	'post-type' => 'post',
	'posts_per_page'=> 10,
	'paged' => $paged,
	'cat' => -15,	
	'orderby' => 'meta_value_num',
	'order' => 'DESC'	
);
// the query
$the_query = new WP_Query( $args ); ?>

<?php if ( $the_query->have_posts() ) : ?>

	<!-- the loop -->
	<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
		<div class="news-item">
			<h3 class="article-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
			<?php just_posted_date(); ?>
			<?php the_excerpt(); ?>
		</div>
	<?php endwhile; wp_reset_postdata();  ?>
	<!-- end of the loop -->


<?php else : ?>
	<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
<?php endif; ?>