// utils
var locationInitialsToName = require('./../utils/locationInitialsToName.js');
var els = require('./../utils/els.js');

module.exports = function buildFormEls (results) {

	var locationArray = [];
	var speciesArray = [];
	var l = results.data.length - 1;		

	for (var index = 0; index < l; index++) {		
		var currentLocation = results.data[index].location;
		var currentSpecies = results.data[index].species;

		if ($.inArray(currentLocation, locationArray) === -1){
			locationArray.push(currentLocation);
		}	

		if ($.inArray(currentSpecies, speciesArray) === -1){
			speciesArray.push(currentSpecies);
		}

		var day = results.data[index].day,
			month = results.data[index].month,
			year = results.data[index].year;

			if (day.length === 1) {
				day = "0" + day;
			}
			if (month.length === 1) {
				month = "0" + month;
			}
				
		results.data[index].formatted_date = year + "-" + month + "-" + day;  // format yyyy m d					
	}	


	locationArray.sort();	
	var convertedLocName = "";	
	// build option tags - appendTo list
	for (var i = 0; i < locationArray.length; i++) {
		convertedLocName = locationInitialsToName(locationArray[i]);
		$('<option value="' + locationArray[i] + '">' + convertedLocName + '</option>').appendTo(els.locList);
	}

	speciesArray.sort();
	// pass to selectivity plugin 
	$(".speciesSearch").selectivity({
	    allowClear: true,
	    items: speciesArray,
	    placeholder: 'No species selected'
	});	

	els.overlay.removeClass('loading');
	
};

