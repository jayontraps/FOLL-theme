<?php 

if (get_post_type( $post ) === 'avifauna') {
	$ptype = 'avifauna';
} else {
	$ptype = 'sites';
}

$args = array(
  'post_type'=>$ptype,
  'title_li'=> __(''),  
  'sort_column'  => 'menu_order, post_title',
);
?>

<ul class="sites-nav">
	<?php wp_list_pages( $args ); ?>
</ul>
