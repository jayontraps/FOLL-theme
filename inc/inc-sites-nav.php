<?php 
$args = array(
  'post_type'=>'sites',
  'title_li'=> __(''),  
  'sort_column'  => 'menu_order, post_title',
);
?>
<ul class="sites-nav">
	<?php wp_list_pages( $args ); ?>
</ul>
