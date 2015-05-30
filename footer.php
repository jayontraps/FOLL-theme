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

	<footer id="colophon" class="footer-container innerWrap clear" role="contentinfo">
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'foll' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'foll' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'foll' ), 'foll', '<a href="http://underscores.me/" rel="designer">Underscores.me</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->


</div><!-- .wrap -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
