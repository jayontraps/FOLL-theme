var els = require('./../utils/els.js');
var arrivalAndDeparture = require('./arrivalAndDeparture.js');

module.exports = function arriveDepartEventHandler(results) {

	var loadingClass = function(){
	  var d = $.Deferred();
	    els.overlay.addClass('loading');
	    d.resolve();
	  	return d.promise();
	};


	var fireRes = function(theRange, theSeason){
	  var d = $.Deferred();
	  setTimeout(function() {
	    arrivalAndDeparture(results, theRange, theSeason);
	    d.resolve();
	  }, 100);
	  return d.promise();
	};	


	$('#submit_2').on('click', function( event ) {

		var theRange = $('.arrive-depart:checked').val();
		var theSeason = $('.arrive-depart:checked').data('season');
		var speciesSearch = $('.speciesSearch').selectivity('value');

		// validate		
		if (speciesSearch) {

			if ($('.arrive-depart').is(":checked")) {

				loadingClass().pipe(fireRes(theRange, theSeason));

			} else {
				alert("Select from earliest or latest dates.");
			}	

		} else {
			this.checked = false;
			alert("Please select a species");
		}
	});
};