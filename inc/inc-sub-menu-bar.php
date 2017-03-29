<div class="wrap sub-menu-bar">
	<div class="innerWrap">


<div class="sub-menu-bar-join">
   <a class="foll-btn accent-2" href="<?php bloginfo('url'); ?>/become-a-member/">Become a member</a>
</div>
<div class="sub-menu-bar-donate">
   <a class="foll-btn accent-1" href="<?php bloginfo('url'); ?>/donate/">Donate</a>
</div>


<?php

      if (is_404() || is_search() || is_archive() || is_page("contact-us") || is_page_template( 'page-home.php' )) {
        // do nothing
      } elseif (is_single() && get_post_type( $post ) === 'avifauna') {
        $args = array(
          'child_of'     => 17,
          'depth'        => 1,
          'title_li'     => __('')
        );
        echo "<ul class='nav sub-menu-nav'>";
        echo "<li class='current_page_parent'><a href=";
        echo site_url();
        echo "/birds/>Birds</a></li>";
        wp_list_pages( $args );
         echo "</ul>";

      }  elseif (is_single() && get_post_type( $post ) === 'sites') {
        $args = array(
          'child_of'     => 11,
          'depth'        => 1,
          'title_li'     => __('')
        );
        echo "<ul class='nav sub-menu-nav'>";
        echo "<li class='current_page_parent'><a href=";
        echo site_url();
        echo "/visiting/>Visiting</a></li>";
        wp_list_pages( $args );
         echo "</ul>";

      } elseif (is_page_template( 'page-members.php' )) {

          if ( is_user_logged_in() ) {

            wp_nav_menu( array(
              'theme_location' => 'members',
              'menu_class'      => 'nav sub-menu-nav' )
            );

          }
      }  else {
        echo "<ul class='nav sub-menu-nav'>";
        wp_list_pages( array('title_li'=>'','include'=>get_post_top_ancestor_id()) );
        wp_list_pages( array('title_li'=>'','depth'=>1,'child_of'=>get_post_top_ancestor_id()) );
        echo "</ul>";
      }

?>

 	</div>
</div>
