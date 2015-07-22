// ARRIVAL / DEPARTURES
var date_sort_asc = function (date1, date2) {

  if (date1 > date2) {
  	return 1;
  }
  if (date1 < date2) {
  	return -1;
  }
  return 0;
};
 
var arriveDepart = function(results) {

	var loadingClass = function(){
	  var d = $.Deferred();
	    table_overlay.addClass('loading');
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

var arrivalAndDeparture = function(results, theRange, theSeason) {

	emptyList();

	var length = results.data.length - 1;	
	var speciesName = $('.speciesSearch').selectivity('value');
	var resultsArr = [];
	var earliest_date_within_each_year_arr = [];
	var latest_date_within_each_year_arr = [];
	var earliest_date_within_second_half_arr = [];
	var latest_date_within_first_half_arr = [];
	var theObj = {};	
	var yearArray = [];
	var finalArr = [];
	var i;
	var convertedLocName = "";
	var arrLength, 
		asDateObj_1,
		asDateObj_2,
		finalArrLen,
		inc,
		newRows,
		counter;

	// SUMMER / WINTER splicing
	var arrBySeason = [],
		monthAsNum,
		d;	

	var foo; 		



	// populate resultsArr
	for (i = 0; i < length; i++) {				
		if (results.data[i].species === search) {
			resultsArr.push(results.data[i]);					
		}
	}	

	var l = resultsArr.length;

	// create array of the years found within results
	for (i = 0; i < l; i++) {

		var currentYear = resultsArr[i].year;

		// if not already in the year array then push it - avoid duplication
		if ($.inArray(currentYear, yearArray) === -1){
			yearArray.push(currentYear);
		}	
	}




	// group by year in theObj:

	// theObj = {
	// 	"2012" : {
	// 		0 : n, // n = moment.js date object
	// 		1 : n,
	// 		etc..
	// 	},
	//  "2014" : {
	// 		0 : n,
	// 		etc...
	// 	}
	// }

	// MAIN LOOP SETTING UP THE ARRAYS AND REFERENCE OBJECT
	for (var c = 0; c < yearArray.length; c++) {

		theObj[yearArray[c]] = {};
		theObj[yearArray[c]].monthArr = [];
		theObj[yearArray[c]].dayArr = [];
		theObj[yearArray[c]].datesArr = [];
		theObj[yearArray[c]].orderedDates = [];
		theObj[yearArray[c]].earliestDate = "";
		theObj[yearArray[c]].latestDate = "";
		theObj[yearArray[c]].firstHalf = [];
		theObj[yearArray[c]].secondHalf = [];


		for (var ind = 0; ind < l; ind++) {
			if (resultsArr[ind].year === yearArray[c]) {
				// format and push dates
				// var currentDate = new Date(resultsArr[ind].formatted_date);
				var currentDate = moment(resultsArr[ind].formatted_date);

				theObj[yearArray[c]].datesArr.push(currentDate);	


				// generate array of results within months 1 - 6 
				if (currentDate.isBefore(yearArray[c] + '-06-30')) {
					theObj[yearArray[c]].firstHalf.push(currentDate);
				}

				// generate array of results within months 7 - 12 
				if (currentDate.isAfter(yearArray[c] + '-06-30')) {
					theObj[yearArray[c]].secondHalf.push(currentDate);
				}

				// sort the arrays ascending
	    		theObj[yearArray[c]].firstHalf.sort(date_sort_asc);
				theObj[yearArray[c]].secondHalf.sort(date_sort_asc);
	    		theObj[yearArray[c]].datesArr.sort(date_sort_asc);
			}									
		}	



		// earliest and latest dates across the year
		var arrLen = theObj[yearArray[c]].datesArr.length;
		// get earliest => [0]
		var earliestDate = theObj[yearArray[c]].datesArr[0];
		// get latest => [arrLen -1] -1 because of zero index
		var latestDate = theObj[yearArray[c]].datesArr[arrLen - 1];

		earliest_date_within_each_year_arr.push(earliestDate);
		latest_date_within_each_year_arr.push(latestDate);




		// earliest date across the months 7 - 12 (winter / earliest)
		arrLen = theObj[yearArray[c]].secondHalf.length;
		// get earliest => [0]
		earliestDate = theObj[yearArray[c]].secondHalf[0];

		earliest_date_within_second_half_arr.push(earliestDate);




		// latest date across month 1 - 6 (winter / latest)
		arrLen = theObj[yearArray[c]].firstHalf.length;
		// get latest => [arrLen -1] -1 because of zero index
		latestDate = theObj[yearArray[c]].firstHalf[arrLen - 1];		

		latest_date_within_first_half_arr.push(latestDate);


		
	}

	// sort all arrays ascending
	earliest_date_within_each_year_arr.sort(date_sort_asc);
	latest_date_within_each_year_arr.sort(date_sort_asc);
	earliest_date_within_second_half_arr.sort(date_sort_asc);
	latest_date_within_first_half_arr.sort(date_sort_asc);



	// CONSOLE RESULTS
	// theObj[the year].datesArr = array of moment.js date objects sorted ascending
	console.log(theObj);
	// array of earliest dates within the year, for each year recorded
	console.log(earliest_date_within_each_year_arr);
	// array of latest dates within the year, for each year recorded
	console.log(latest_date_within_each_year_arr);

	console.log(earliest_date_within_second_half_arr);

	console.log(latest_date_within_first_half_arr);

							


	if (theSeason === "summer" && theRange === "earliest") {
		foo = earliest_date_within_each_year_arr;
	} else if (theSeason === "summer" && theRange === "latest") {
		foo = latest_date_within_each_year_arr;
	} else if (theSeason === "winter" && theRange === "earliest") {
		foo = earliest_date_within_second_half_arr;
	} else if (theSeason === "winter" && theRange === "latest") {
		foo = latest_date_within_first_half_arr;
	}


	// if (theSeason === "summer" && theRange === "earliest" || theSeason === "winter" && theRange === "latest") {
	// 	foo = earliest_date_within_each_year_arr;
	// } else if (theSeason === "summer" && theRange === "latest" || theSeason === "winter" && theRange === "earliest") {
	// 	foo = latest_date_within_each_year_arr;
	// }

	arrLength = foo.length;
			
	for (inc = 0; inc < arrLength; inc++) {
		
		asDateObj_1 = foo[inc];
		
		// loop through resultsArr matching earliest dates and push to finalArr

		for (i = 0; i < l; i++) {

			asDateObj_2 = moment(resultsArr[i].formatted_date);

			if (moment(asDateObj_1).isSame(asDateObj_2)) {

				finalArr.push(resultsArr[i]);
				
			}
		}
	}

	sortByDate(finalArr);			

	if (theSeason === "summer" && theRange === "earliest" || theSeason === "winter" && theRange === "latest") {

		for (d = 0; d < finalArr.length; d++) {
			monthAsNum = parseInt(finalArr[d].month);
			if (monthAsNum <= 6) {
				arrBySeason.push(finalArr[d]);
			}
		}

	} else if (theSeason === "summer" && theRange === "latest" || theSeason === "winter" && theRange === "earliest") {

		for (d = 0; d < finalArr.length; d++) {
			monthAsNum = parseInt(finalArr[d].month);
			if (monthAsNum > 6) {
				arrBySeason.push(finalArr[d]);
			}
		}
	}


	finalArrLen = arrBySeason.length;

	newRows = $('<span/>');

	for (counter = 0; counter < finalArrLen; counter++) {
		convertedLocName = locationInitialsToName(arrBySeason[counter].location);
		$('<tr/>', {
			html : '<td class="date">'  + arrBySeason[counter].date_from + '</td> '  + '<td class="location">' 					 + convertedLocName + '</td> '  + '<td class="count">'  + arrBySeason[counter].count + '</td> ' + '<td class="observer">'  + arrBySeason[counter].observer + '</td> ' + '<td class="notes">'  + arrBySeason[counter].notes + '</td>'
			}						
		).appendTo(newRows);			
	}
	$(newRows.html()).appendTo(resultsList_2);

	setTimeout(function(){ table_overlay.removeClass('loading'); }, 300);

	// reset 
	finalArrLen.length = 0;

};