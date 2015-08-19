// utils
var els = require('./../utils/els.js');
var locationInitialsToName = require('./../utils/locationInitialsToName.js');
var theSearch = require('./../utils/theSearch.js');
var reverseDateString = require('./../utils/reverseDateString.js');


// search
var buildDomEls = require('./buildDomEls.js');



module.exports = function displayResults(resultsArr, theSearch) {
	
	var totalResults = "";
	// if maxNumResults - totalResults will be different from theSearch.numOfResults
	if (theSearch.limitNum) {
		totalResults = 300;
	} else {
		totalResults = theSearch.numOfResults;
	}

		
	var summarizeDateRange = "";
	if (theSearch.daterange) { 
		// format the start and end dates for reading back with reverseDateString()
		var jsStartDate = theSearch.startdate;
		var userStartDate = reverseDateString(jsStartDate);
		var jsEndDate = theSearch.enddate;
		var userEndtDate = reverseDateString(jsEndDate);
		summarizeDateRange = " from " + userStartDate + " to " + userEndtDate;
	}

	var hasMaxNumber = "";
	if (theSearch.limitNum) {
		hasMaxNumber = theSearch.limitNum;
	} 

	var chosenMonth = "";
	if (theSearch.bymonth) {
		if (theSearch.bymonth === "1") {
			chosenMonth = " recorded in January. ";
		} else if(theSearch.bymonth === "2") {
			chosenMonth = " recorded in Febuary. ";
		} else if(theSearch.bymonth === "3") {
			chosenMonth = " recorded in March. ";
		} else if(theSearch.bymonth === "4") {
			chosenMonth = " recorded in April. ";
		} else if(theSearch.bymonth === "5") {
			chosenMonth = " recorded in May. ";
		} else if(theSearch.bymonth === "6") {
			chosenMonth = " recorded in June. ";
		} else if(theSearch.bymonth === "7") {
			chosenMonth = " recorded in July. ";
		} else if(theSearch.bymonth === "8") {
			chosenMonth = " recorded in August. ";
		} else if(theSearch.bymonth === "9") {
			chosenMonth = " recorded in September. ";
		} else if(theSearch.bymonth === "10") {
			chosenMonth = " recorded in October. ";
		} else if(theSearch.bymonth === "11") {
			chosenMonth = " recorded in November. ";
		} else if(theSearch.bymonth === "12") {
			chosenMonth = " recorded in December. ";
		}
	}

	theSearch.loc = locationInitialsToName(theSearch.loc);

	var readBackResults = "<b>" + theSearch.numOfResults + " records for " + theSearch.species + " at " + theSearch.loc + ", " +summarizeDateRange + " " + chosenMonth + " " + hasMaxNumber + "</b>";

	$(readBackResults).appendTo(els.searchSummary);		

	buildDomEls(totalResults, resultsArr);

	setTimeout(function(){ els.overlay.removeClass('loading'); }, 500);
};