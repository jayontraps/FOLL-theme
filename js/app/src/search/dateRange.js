// utils
var els = require('./../utils/els.js');
var theSearch = require('./../utils/theSearch.js');
var sortByDate = require('./../utils/sortByDate.js');
var maxNumResults = require('./../utils/maxNumResults.js');
var escapeDateFun = require('./../utils/escapeDateFun.js');

// search
var displayResults = require('./displayResults.js');


module.exports = function dateRange(resultsArr, theSearch) {

	var dateInputChecked = $('input[name="date-range"]:checked');
	var userStartDate = $('#start input[type="hidden"]').val();
	var userEndtDate = $('#end input[type="hidden"]').val();
	var filteredArr = [];		
	

	if (dateInputChecked.length > 0) {

		if (dateInputChecked.val() === "by-range") {

			theSearch.bymonth = "";
			
			if (userStartDate.length === 0 || userEndtDate.length === 0) {

				escapeDateFun();

			} else {

				var startDate = moment(userStartDate);
				var endDate = moment(userEndtDate);


				if (endDate.isBefore(startDate)) {
					escapeDateFun();

				} else {

					// var startDate = new Date(userStartDate);
					// var endDate = new Date(userEndtDate);				
						
					theSearch.daterange = true;
					theSearch.startdate = userStartDate;
					theSearch.enddate = userEndtDate;

					for (var index = 0; index < theSearch.numOfResults; index++) {
						
						// var currentDate = new Date(resultsArr[index].formatted_date);
						var currentDate = moment(resultsArr[index].formatted_date);					

						// if (currentDate > startDate && currentDate < endDate ) {
						// 	filteredArr.push(resultsArr[index]);
						// }

						if ( currentDate.isBetween(startDate, endDate) ) {
							filteredArr.push(resultsArr[index]);
						}

					}

					theSearch.numOfResults = filteredArr.length;
					sortByDate(filteredArr, theSearch);
					maxNumResults(filteredArr, theSearch);							
					displayResults(filteredArr, theSearch);
				}

			}			

		} else if(dateInputChecked.val() === "by-month") {

			theSearch.daterange = false;
			
			// grab the inout value
			var userMonthSelected = $('#byMonth').val();	
			theSearch.bymonth = userMonthSelected;			
				
			// generate filteredArr
			for (var i = 0; i < theSearch.numOfResults; i++) {
				
				if (resultsArr[i].month === userMonthSelected) {
					filteredArr.push(resultsArr[i]);
				}
			}

			theSearch.numOfResults = filteredArr.length;
			sortByDate(filteredArr, theSearch);
			maxNumResults(filteredArr, theSearch);
			displayResults(filteredArr, theSearch);


		} else if (dateInputChecked.val() === "all-dates") {

			theSearch.bymonth = "";

			theSearch.daterange = false;			
			sortByDate(resultsArr);
			maxNumResults(resultsArr, theSearch);		
			displayResults(resultsArr, theSearch);
		
		}

	} else{
		
		sortByDate(resultsArr);
		maxNumResults(resultsArr, theSearch);
		displayResults(resultsArr, theSearch);
	}	
};