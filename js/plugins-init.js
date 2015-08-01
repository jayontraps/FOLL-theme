(function($) {		
	$(document).ready(function() {
		
		$('.bxslider-home').bxSlider({
			pager: false,
			mode: 'fade',
			auto: true,
			pause: 6000,
			speed: 1000,
			onSliderLoad: function() {
				$('.foll-slider').addClass('loaded');
			}
		 });	


		// $('.page-slider').bxSlider({
		// 	mode: 'fade',
		// 	captions: true,
		// 	controls: false
		// });
		
	});
})(jQuery);