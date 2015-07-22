
var generateQuery = function(results) {
	emptyList();

	// clear arrival and departures radio inputs
	$(".arrive-depart").prop('checked', false);

	var len = results.data.length - 1;			
	var index = 0;
	var resultsArr = [];
	var locationSearch = $('#locationSearch').val();
	var speciesSearch = $('.speciesSearch').selectivity('value');
	var theSearch = {};


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


var maxNumResults = function(resultsArr, theSearch) {
	// this is where lazylading or pagination should happen
	if (theSearch.numOfResults > 2000) {
		theSearch.limitNum = "Displaying the most recent 2000 records.";		
		resultsArr = resultsArr.slice(0, 2000);
		displayResults(resultsArr, theSearch);

	} else {
		displayResults(resultsArr, theSearch);
	}		
};


var emptyList = function() {
	resultsList.find('tbody td').remove();		
	$(searchSummary).html('Results: ');
	$('.sort-icon').removeClass('active');

	resultsList_2.find('tbody td').remove();
};


var escapeDateFun = function() {
	alert('Invalid date range.');
	table_overlay.removeClass('loading');
	return false;
};


var sortByDate = function(resultsArr, theSearch) {
	resultsArr.sort(function(a, b){
	 	var dateA = new Date(a.formatted_date), 
	 		dateB = new Date(b.formatted_date);
	 	return dateB - dateA; //sort by date decending
	});
};


var dateRange = function(resultsArr, theSearch) {

	var dateInputChecked = $('input[name="date-range"]:checked');
	var userStartDate = $('#start input[type="hidden"]').val();
	var userEndtDate = $('#end input[type="hidden"]').val();
	var filteredArr = [];		
	

	if (dateInputChecked.length > 0) {

		if (dateInputChecked.val() === "by-range") {

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
				}




			}

		} else if(dateInputChecked.val() === "by-month") {

			
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


		} else if (dateInputChecked.val() === "all-dates") {
			
			sortByDate(resultsArr);
			maxNumResults(resultsArr, theSearch);		
		
		}

	} else{
		
		sortByDate(resultsArr);
		maxNumResults(resultsArr, theSearch);
	}
};


var reverseDateString = function(dateString) {
	dateString = dateString.split('-');		
	dateString = dateString[2] + "-" + dateString[1] + "-" + dateString[0];
	return dateString;
};


var buildDomEls = function(totalResults, resultsArr) {
	var newRows = $('<span/>');
	var convertedLocName = "";
	for (var i = 0; i < totalResults; i++) {
		convertedLocName = locationInitialsToName(resultsArr[i].location);
		$('<tr/>', {
			html : '<td class="species">'  + resultsArr[i].species + '</td> '  + '<td class="date">'  + resultsArr[i].date_from + '</td> '  + '<td class="location">' + convertedLocName + '</td> '  + '<td class="count">'  + resultsArr[i].count + '</td> ' + '<td class="observer">'  + resultsArr[i].observer + '</td> ' + '<td class="notes">'  + resultsArr[i].notes + '</td>'
			}						
		).appendTo(newRows);			
	}
	$(newRows.html()).appendTo(resultsList);
};


var displayResults = function(resultsArr, theSearch) {
	
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

	$(readBackResults).appendTo(searchSummary);		

	buildDomEls(totalResults, resultsArr);

	setTimeout(function(){ table_overlay.removeClass('loading'); }, 300);
};


