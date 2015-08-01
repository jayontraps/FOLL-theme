<div class="wrap sub-menu-bar">
	<div class="innerWrap">


<div class="sub-menu-bar-join">
   <a class="foll-btn accent-2" href="<?php bloginfo('url'); ?>/become-a-member/">Become a member</a>
</div>
<div class="sub-menu-bar-donate">
   <a class="foll-btn accent-1" href="<?php bloginfo('url'); ?>/donate/">Donate</a>
</div>


<?php

      if (is_404() || is_search() || is_archive() ) {
        // do nothing
      } else {

        if($post->post_parent) {
          $children = wp_list_pages("sort_column=menu_order&title_li=&child_of=".$post->post_parent."&echo=0");
        } else {
           $children = wp_list_pages("sort_column=menu_order&title_li=&child_of=".$post->ID."&echo=0");
        }

        if ($children) { ?>
          <ul class="nav sub-menu-nav">
            <?php echo $children; ?>
          </ul>
        <?php } 

      }

?>

 	</div>
</div>