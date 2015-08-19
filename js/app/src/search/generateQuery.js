// utils
var els = require('./../utils/els.js');
var emptyList = require('./../utils/emptyList.js');
var theSearch = require('./../utils/theSearch.js');


// search
var dateRange = require('./../search/dateRange.js');

module.exports = function generateQuery(results) {

	emptyList();

	// clear arrival and departures radio inputs
	$(".arrive-depart").prop('checked', false);

	var len = results.data.length - 1;			
	var index = 0;
	var resultsArr = [];
	var locationSearch = $('#locationSearch').val();
	var speciesSearch = $('.speciesSearch').selectivity('value');
	// var theSearch = {};


	if (!speciesSearch && !locationSearch) {

		for (var counter = 0; counter < len; counter++) {
			resultsArr.push(results.data[counter]);
			index++; 
		}
					
		theSearch.species = "all species";
		theSearch.loc = "all locations";
		
	} 	else if (speciesSearch && locationSearch) {

			for (var ind = 0; ind < len; ind++) {				
				if (results.data[ind].species === search && results.data[ind].location === locationSearch) {
					resultsArr.push(results.data[ind]);
					index++; 
				}
			}
							
			theSearch.species = speciesSearch;
			theSearch.loc = locationSearch;
			
	}	else if (speciesSearch) {
		
			for (var i = 0; i < len; i++) {				
				if (results.data[i].species === search) {
					resultsArr.push(results.data[i]);
					index++; 
				}
			}
							
			theSearch.species = speciesSearch;
			theSearch.loc = "all locations";
			

	}	else if (locationSearch) {

			for (var count = 0; count < len; count++) {				
				if (results.data[count].location === locationSearch) {
					resultsArr.push(results.data[count]);
					index++; 
				}
			}
							
			theSearch.species = "all species";
			theSearch.loc = locationSearch;				
	}

	theSearch.numOfResults = index;
	dateRange(resultsArr, theSearch);

};


