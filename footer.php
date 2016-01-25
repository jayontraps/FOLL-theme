<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package foll
 */
?>

	</div><!-- role="main" -->

   	<nav role="complementary" class="nav-wrap cf js-nav" itemscope itemtype='https://schema.org/SiteNavigationElement'>

		<?php wp_nav_menu( array( 
		'theme_location' => 'primary',
		'menu_class'      => 'navmenu' ) ); ?>	

   	</nav>
	
   	<?php
			if (is_page_template("page-home.php" )) {
				include "inc/inc-donate-row.php";
			}
   	  ?>

	<footer id="colophon" class="footer-container clear" role="contentinfo">
		<div class="site-info foll-footer innerWrap">
			<div class="col-1-3">&copy; Friends of Lavell’s Lake <?php echo date('Y'); ?>. All rights reserved.</div>
			<div class="col-1-3"><?php get_sidebar( 'footer' ); ?></div>
			<div class="col-1-3"><a href="<?php bloginfo('url'); ?>/contact-us">Contact us</a></div>
			
		</div><!-- .site-info -->
	</footer><!-- #colophon -->


<!-- </div> -->	<!-- .wrap -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
