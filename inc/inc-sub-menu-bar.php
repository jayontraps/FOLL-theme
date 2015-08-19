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
        echo "<ul class='nav sub-menu-nav'";
        wp_list_pages( array('title_li'=>'','include'=>get_post_top_ancestor_id()) );
        wp_list_pages( array('title_li'=>'','depth'=>1,'child_of'=>get_post_top_ancestor_id()) );
        echo "</ul>";
      }

?>

 	</div>
</div>