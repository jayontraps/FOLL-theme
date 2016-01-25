(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var els = require('./../utils/els.js');
var sortByDate = require('./../utils/sortByDate.js');
var emptyList = require('./../utils/emptyList.js');
var locationInitialsToName = require('./../utils/locationInitialsToName.js');
var date_sort_asc = require('./date_sort_asc.js');

module.exports = function arrivalAndDeparture(results, theRange, theSeason) {

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
	// console.log(theObj);
	// // array of earliest dates within the year, for each year recorded
	// console.log(earliest_date_within_each_year_arr);
	// // array of latest dates within the year, for each year recorded
	// console.log(latest_date_within_each_year_arr);

	// console.log(earliest_date_within_second_half_arr);

	// console.log(latest_date_within_first_half_arr);

							


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
	$(newRows.html()).appendTo(els.resultsList_2);

	setTimeout(function(){ els.overlay.removeClass('loading'); }, 300);

	// reset 
	finalArrLen.length = 0;

};
},{"./../utils/els.js":13,"./../utils/emptyList.js":14,"./../utils/locationInitialsToName.js":16,"./../utils/sortByDate.js":19,"./date_sort_asc.js":3}],2:[function(require,module,exports){
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
},{"./../utils/els.js":13,"./arrivalAndDeparture.js":1}],3:[function(require,module,exports){
module.exports = function date_sort_asc(date1, date2) {
  if (date1 > date2) {
  	return 1;
  }
  if (date1 < date2) {
  	return -1;
  }
  return 0;
};


},{}],4:[function(require,module,exports){
// config 
var foll = foll || {};
foll.config = {
	// Please add site URL here (no trailing forward slash)

	siteUrl: "http://localhost/foll",	
	// siteUrl: "http://foll.jayontraps.com",	
	// siteUrl: "http://foll.org.uk",	
	appPageID: 69	
};

// setup
var setUpEvents = require('./setup/setUpEvents.js');
var buildFormEls = require('./setup/buildFormEls.js');
var theSearch = require('./utils/theSearch.js');
var arriveDepartEventHandler = require('./arriveDepart/arriveDepartEventHandler.js');
var validateGraphSearch = require('./histogram/validateGraphSearch.js');




window.onload = function () {	

	$.ajax({
	    url: foll.config.siteUrl + '/wp-json/pages',
	    data: {
	        filter: {
	         "page_id": foll.config.appPageID,
	        }
	    },
	    dataType: 'json',
	    type: 'GET',
	    success: function(data) {	
	    	var datasetUrl = data[0].meta.dataset.url;

			Papa.parse(datasetUrl, {
				download: true,
				header: true,
				complete: function(results) {	
					buildFormEls(results);
					setUpEvents(results);
					arriveDepartEventHandler(results);
					validateGraphSearch(results);
				}
			});
	    },
	    error: function() {
	        // error code
	    }
	});	

	// var datasetUrl = "http://localhost:3000/foll/wp-content/themes/foll/csv/dataset.csv";
	// Papa.parse(datasetUrl, {
	// 	download: true,
	// 	header: true,
	// 	complete: function(results) {	
	// 		buildFormEls(results);
	// 		setUpEvents(results);
	// 		arriveDepartEventHandler(results);
	// 		validateGraphSearch(results);
	// 	}
	// });	


};


},{"./arriveDepart/arriveDepartEventHandler.js":2,"./histogram/validateGraphSearch.js":6,"./setup/buildFormEls.js":11,"./setup/setUpEvents.js":12,"./utils/theSearch.js":20}],5:[function(require,module,exports){
module.exports = function setUpGraph(graphArr, graphObj) {

	console.log(graphObj);

	var graphArrFinal = [],
		sumOfCount = 0,
		sumOfCountDivided,
		countArr = [],
		highestNumberStore = [],
		highestNum,
		highestNumArr = [],
		i,
		c;



	for (i = 0; i < graphArr.length; i++) {

		// get the date of the record as a moment() object
		var currentDate = moment(graphArr[i].formatted_date);	

		// subtract a day from JAN 01 to include the JAN 01 in results
		var graph_start_subtracted = moment(graphObj.graph_start).subtract(1, 'days');

		// get all records between selected range
		if (currentDate.isBetween(graph_start_subtracted, graphObj.graph_end)) {					
			graphArrFinal.push(graphArr[i]);
		}
	}


	var graphArrFinalLength = graphArrFinal.length,
		countInt,
		monthInt;


	// generate sum count array

	// loop through each month within range
	for (c = 1; c < 13; c++) {	

		// for each month grab highest numbers and sum counts
		for (i = 0; i < graphArrFinal.length; i++) {	

			if (graphArrFinal[i].count === "") {
				graphArrFinal[i].count = "0";
			}

			countInt = parseInt(graphArrFinal[i].count);
			monthInt = parseInt(graphArrFinal[i].month);				

			if (monthInt === c) {
				// highestNumberStore.push(countInt);
				sumOfCount += countInt;							
			}
		}	

		// for months with no values push a zero
		// if (highestNumberStore.length === 0) {
		// 	highestNumArr.push(0);
		// } else {
		// 	// get highest value
		// 	highestNum = getMaxOfArray(highestNumberStore);
		// 	// divide by number of years
		// 	highestNum = highestNum / graphObj.numOfYears;
		// 	// push highest value to highestNumArr
		// 	highestNumArr.push(highestNum);
		// }

		// sum divided by number of years
		sumOfCountDivided = sumOfCount / graphObj.numOfYears;
		countArr.push(sumOfCountDivided);

		// reset 
		sumOfCount = 0;	
		highestNum = 0;	
		highestNumberStore.length = 0;	

	}











	// // generate highest number array

	// var length = graphObj.yearsWithinRange.length;
	// var resultsYY,
	// 	resultsMM,
	// 	resultsC;

	// var foo = 0;

	// 	graphObj.years = {};

	// for (var index = 0; index < length; index++) {

	// 	var currYear = graphObj.yearsWithinRange[index];

	// 	graphObj.years[currYear] = {};
		
	// 	for (i = 0; i < graphArrFinal.length; i++) {

	// 		resultsYY = parseInt(graphArrFinal[i].year);
	// 		resultsMM = parseInt(graphArrFinal[i].month);
	// 		resultsC = parseInt(graphArrFinal[i].count);

	// 		if (resultsYY === currYear) {

	// 			// loop through each month within year
	// 			for (c = 1; c < 13; c++) {	

	// 				if (resultsMM === c) {
	// 					graphObj.years[currYear][c] = [];	
	// 					graphObj.years[currYear][c].push(resultsC);
	// 				}

	// 			}
			
	// 		}
					
	// 	}

	// }












	console.log(countArr);

	// check if all values are 0 - i.e no records for a given period
	var counter = 0;
	for (i = 0; i < countArr.length; i++) {
		counter += countArr[i];										
	} 
	if (counter === 0) {
		alert("No records for this period.");
		if (window.myBar) {
			myBar.clear();
		}
		return false;
	} else {

		if (window.myBar) {
			// update 
			for (var l = 0; l < myBar.datasets[0].bars.length; l++) {
				myBar.datasets[0].bars[l].value = countArr[l];					
			}

			myBar.update();

		} else {

			var barChartData = {
			labels : ["January","February","March","April","May","June","July","August","September","October","November","December"],
			datasets : [
				{
					fillColor : "rgba(000,000,000,0.5)",
					strokeColor : "rgba(000,000,000,0.8)",
					highlightFill: "rgba(000,000,000,0.75)",
					highlightStroke: "rgba(000,000,000,1)",
					data : countArr
				}

				// ,
				// {
		  //           label: "My Second dataset",
		  //           fillColor: "rgba(151,187,205,0.5)",
		  //           strokeColor: "rgba(151,187,205,0.8)",
		  //           highlightFill: "rgba(151,187,205,0.75)",
		  //           highlightStroke: "rgba(151,187,205,1)",
		  //           data: highestNumArr
		  //       }
			]

			};


			var ctx = document.getElementById("canvas").getContext("2d");
			window.myBar = new Chart(ctx).Bar(barChartData, {
				responsive : true
			});	
			$('.y-axis-head').addClass('on');			
		}	

	}
};


},{}],6:[function(require,module,exports){
var setUpGraph = require('./setUpGraph.js');

module.exports = function validateGraphSearch(results) {
		
	$('#generateGraph').on('click', function(event){

		event.preventDefault();

		var speciesName = $('.speciesSearch').selectivity('value');
		// get the start date
		var s = document.getElementById("start-graph");
		var graph_start = s.options[s.selectedIndex].value;		
		// get the end date
		var e = document.getElementById("end-graph");
		var graph_end = e.options[e.selectedIndex].value;	



		if (speciesName === null) {
			alert('Please select a species');
			return false;
		}	
		

		if (speciesName) {
			
			if (graph_start === "0000" || graph_end === "0000" || graph_start > graph_end) {
				alert("Invalid date range.");
				return false;
			}		

			var graphObj = {};
			graphObj.yearsWithinRange = [];

			// number of years in search
			var grSrt = parseInt(graph_start),
				grEnd = parseInt(graph_end); 


				// add 1 to graph_end and grEnd - to shift the end date up a year...
			 	// this allows a more readable end-of-range label 
			 	// e.g. instead of reading " ... to 1st Jan 2010" to read " ... to 31st Dec 2009 <the previous year>"
			 	// reffer to the theObj for actual start and end dates - graphObj.graph_start and graphObj.graph_end
				grEnd = grEnd + 1;
				graph_end = grEnd.toString();


			var	numOfYears = grEnd - grSrt;

			// format year for moment.js	
			graph_start = graph_start + "-01-01";
			graph_end = graph_end + "-01-01";

			// array of years within range
			var counter = grSrt;
			while(counter < grEnd) {
				graphObj.yearsWithinRange.push(counter);
				counter++;
			}

			
			graphObj.graph_start = graph_start;
			graphObj.graph_end = graph_end;
			graphObj.numOfYears = numOfYears;


			var graphArr = [];
			var len = results.data.length - 1;		

			for (var i = 0; i < len; i++) {

				if (results.data[i].species === speciesName) {
					graphArr.push(results.data[i]);
				}	
			}

			setUpGraph(graphArr, graphObj);
		} 
						
	});

};
},{"./setUpGraph.js":5}],7:[function(require,module,exports){
// utils
var els = require('./../utils/els.js');
var theSearch = require('./../utils/theSearch.js');
var locationInitialsToName = require('./../utils/locationInitialsToName.js');


module.exports = function buildDomEls(totalResults, resultsArr) {
	var newRows = $('<span/>');
	var convertedLocName = "";

	for (var i = 0; i < totalResults; i++) {
		convertedLocName = locationInitialsToName(resultsArr[i].location);
		$('<tr/>', {
			html : '<td class="species">'  + resultsArr[i].species + '</td> '  + '<td class="date">'  + resultsArr[i].date_from + '</td> '  + '<td class="location">' + convertedLocName + '</td> '  + '<td class="count">'  + resultsArr[i].count + '</td> ' + '<td class="observer">'  + resultsArr[i].observer + '</td> ' + '<td class="notes">'  + resultsArr[i].notes + '</td>'
			}						
		).appendTo(newRows);			
	}
	$(newRows.html()).appendTo(els.resultsList);
};
},{"./../utils/els.js":13,"./../utils/locationInitialsToName.js":16,"./../utils/theSearch.js":20}],8:[function(require,module,exports){
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
},{"./../utils/els.js":13,"./../utils/escapeDateFun.js":15,"./../utils/maxNumResults.js":17,"./../utils/sortByDate.js":19,"./../utils/theSearch.js":20,"./displayResults.js":9}],9:[function(require,module,exports){
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
},{"./../utils/els.js":13,"./../utils/locationInitialsToName.js":16,"./../utils/reverseDateString.js":18,"./../utils/theSearch.js":20,"./buildDomEls.js":7}],10:[function(require,module,exports){
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



},{"./../search/dateRange.js":8,"./../utils/els.js":13,"./../utils/emptyList.js":14,"./../utils/theSearch.js":20}],11:[function(require,module,exports){
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


},{"./../utils/els.js":13,"./../utils/locationInitialsToName.js":16}],12:[function(require,module,exports){
// utils
var locationInitialsToName = require('./../utils/locationInitialsToName.js');
var els = require('./../utils/els.js');
var emptyList = require('./../utils/emptyList.js');
var theSearch = require('./../utils/theSearch.js');

// search
var generateQuery = require('./../search/generateQuery.js');


module.exports = function setUpEvents(results) {

	var addLoadingClass = function(){
	  var d = $.Deferred();
	    els.overlay.addClass('loading');
	    d.resolve();
	  	return d.promise();
	};


	var fireGenQ = function(){
	  var d = $.Deferred();
	  setTimeout(function() {
	    generateQuery(results, theSearch);
	    d.resolve();
	  }, 100);
	  return d.promise();
	};

	// EVENTS
	// clear results manaully
	$(".speciesSearch").on("change", function(e) {	
		search = $('.speciesSearch').selectivity('value');
		
		if (!search) {
			// change to resetAll()
			emptyList();

			els.speciesH4.html("");
			els.radioInputs.prop('checked', false);
			if (window.myBar) {
				myBar.clear();
			}

		} else {
			els.speciesH4.html(": " + search);
		}

	});


	$('#submit').on('click', function(e) {	
		e.preventDefault();
		addLoadingClass().pipe(fireGenQ);
	});

};


},{"./../search/generateQuery.js":10,"./../utils/els.js":13,"./../utils/emptyList.js":14,"./../utils/locationInitialsToName.js":16,"./../utils/theSearch.js":20}],13:[function(require,module,exports){
var els = {
	overlay : $('.overlay'),
	search : "",
	locList : $('#locationSearch'),
	resultsList : $('#results'),
	resultsList_2 : $('#results_2'),
	searchSummary : $('#search-summary'),
	radioInputs : $('input[type="radio"]'),
	speciesH4 : $('#sp-name')
};

module.exports = els;
},{}],14:[function(require,module,exports){
var els = require('./els.js');

module.exports = function emptyList() {

	els.resultsList.find('tbody td').remove();		
	els.searchSummary.html('Results: ');
	$('.sort-icon').removeClass('active');
	els.resultsList_2.find('tbody td').remove();

};
},{"./els.js":13}],15:[function(require,module,exports){
var els = require('./els.js');

module.exports = function escapeDateFun() {
	alert('Invalid date range.');
	els.overlay.removeClass('loading');
	return false;
};
},{"./els.js":13}],16:[function(require,module,exports){
module.exports = function locationInitialsToName(locationInitials) {
	if (locationInitials === "BS") {
		locationInitials = "Black Swan Lake";
		return locationInitials;
	} else if(locationInitials === "DP") {
		locationInitials = "Dinton Pastures";
		return locationInitials;

	} else if(locationInitials === "LF") {
		locationInitials = "Lea Farm Lake";
		return locationInitials;

	} else if(locationInitials === "LL") {
		locationInitials = "Lavell's Lake";
		return locationInitials;

	} else if(locationInitials === "MM") {
		locationInitials = "Middle Marsh";
		return locationInitials;

	} else if(locationInitials === "MO") {
		locationInitials = "Mortimer's Meadow";
		return locationInitials;

	} else if(locationInitials === "SA") {
		locationInitials = "Sandford Lake";
		return locationInitials;

	} else if(locationInitials === "WS") {
		locationInitials = "White Swan Lake";
		return locationInitials;
	} else if(locationInitials === "all locations") {
		locationInitials = "all locations";
		return locationInitials;
	}
};

},{}],17:[function(require,module,exports){
module.exports = function maxNumResults(resultsArr, theSearch) {
	// this is where lazylading or pagination should happen
	if (theSearch.numOfResults > 2000) {
		theSearch.limitNum = "Displaying the most recent 2000 records.";		
		resultsArr = resultsArr.slice(0, 2000);
	} 	
};
},{}],18:[function(require,module,exports){
module.exports = function reverseDateString(dateString) {
	dateString = dateString.split('-');		
	dateString = dateString[2] + "-" + dateString[1] + "-" + dateString[0];
	return dateString;
};
},{}],19:[function(require,module,exports){
module.exports = function sortByDate(resultsArr, theSearch) {
	resultsArr.sort(function(a, b){
	 	var dateA = new Date(a.formatted_date), 
	 		dateB = new Date(b.formatted_date);
	 	return dateB - dateA; //sort by date decending
	});
};

},{}],20:[function(require,module,exports){
var theSearch = {};

module.exports = theSearch;
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAvc3JjL2Fycml2ZURlcGFydC9hcnJpdmFsQW5kRGVwYXJ0dXJlLmpzIiwianMvYXBwL3NyYy9hcnJpdmVEZXBhcnQvYXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyLmpzIiwianMvYXBwL3NyYy9hcnJpdmVEZXBhcnQvZGF0ZV9zb3J0X2FzYy5qcyIsImpzL2FwcC9zcmMvZW50cnkuanMiLCJqcy9hcHAvc3JjL2hpc3RvZ3JhbS9zZXRVcEdyYXBoLmpzIiwianMvYXBwL3NyYy9oaXN0b2dyYW0vdmFsaWRhdGVHcmFwaFNlYXJjaC5qcyIsImpzL2FwcC9zcmMvc2VhcmNoL2J1aWxkRG9tRWxzLmpzIiwianMvYXBwL3NyYy9zZWFyY2gvZGF0ZVJhbmdlLmpzIiwianMvYXBwL3NyYy9zZWFyY2gvZGlzcGxheVJlc3VsdHMuanMiLCJqcy9hcHAvc3JjL3NlYXJjaC9nZW5lcmF0ZVF1ZXJ5LmpzIiwianMvYXBwL3NyYy9zZXR1cC9idWlsZEZvcm1FbHMuanMiLCJqcy9hcHAvc3JjL3NldHVwL3NldFVwRXZlbnRzLmpzIiwianMvYXBwL3NyYy91dGlscy9lbHMuanMiLCJqcy9hcHAvc3JjL3V0aWxzL2VtcHR5TGlzdC5qcyIsImpzL2FwcC9zcmMvdXRpbHMvZXNjYXBlRGF0ZUZ1bi5qcyIsImpzL2FwcC9zcmMvdXRpbHMvbG9jYXRpb25Jbml0aWFsc1RvTmFtZS5qcyIsImpzL2FwcC9zcmMvdXRpbHMvbWF4TnVtUmVzdWx0cy5qcyIsImpzL2FwcC9zcmMvdXRpbHMvcmV2ZXJzZURhdGVTdHJpbmcuanMiLCJqcy9hcHAvc3JjL3V0aWxzL3NvcnRCeURhdGUuanMiLCJqcy9hcHAvc3JjL3V0aWxzL3RoZVNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciBzb3J0QnlEYXRlID0gcmVxdWlyZSgnLi8uLi91dGlscy9zb3J0QnlEYXRlLmpzJyk7XG52YXIgZW1wdHlMaXN0ID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbXB0eUxpc3QuanMnKTtcbnZhciBsb2NhdGlvbkluaXRpYWxzVG9OYW1lID0gcmVxdWlyZSgnLi8uLi91dGlscy9sb2NhdGlvbkluaXRpYWxzVG9OYW1lLmpzJyk7XG52YXIgZGF0ZV9zb3J0X2FzYyA9IHJlcXVpcmUoJy4vZGF0ZV9zb3J0X2FzYy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycml2YWxBbmREZXBhcnR1cmUocmVzdWx0cywgdGhlUmFuZ2UsIHRoZVNlYXNvbikge1xuXG5cdGVtcHR5TGlzdCgpO1xuXG5cdHZhciBsZW5ndGggPSByZXN1bHRzLmRhdGEubGVuZ3RoIC0gMTtcdFxuXHR2YXIgc3BlY2llc05hbWUgPSAkKCcuc3BlY2llc1NlYXJjaCcpLnNlbGVjdGl2aXR5KCd2YWx1ZScpO1xuXHR2YXIgcmVzdWx0c0FyciA9IFtdO1xuXHR2YXIgZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2FyciA9IFtdO1xuXHR2YXIgbGF0ZXN0X2RhdGVfd2l0aGluX2VhY2hfeWVhcl9hcnIgPSBbXTtcblx0dmFyIGVhcmxpZXN0X2RhdGVfd2l0aGluX3NlY29uZF9oYWxmX2FyciA9IFtdO1xuXHR2YXIgbGF0ZXN0X2RhdGVfd2l0aGluX2ZpcnN0X2hhbGZfYXJyID0gW107XG5cdHZhciB0aGVPYmogPSB7fTtcdFxuXHR2YXIgeWVhckFycmF5ID0gW107XG5cdHZhciBmaW5hbEFyciA9IFtdO1xuXHR2YXIgaTtcblx0dmFyIGNvbnZlcnRlZExvY05hbWUgPSBcIlwiO1xuXHR2YXIgYXJyTGVuZ3RoLCBcblx0XHRhc0RhdGVPYmpfMSxcblx0XHRhc0RhdGVPYmpfMixcblx0XHRmaW5hbEFyckxlbixcblx0XHRpbmMsXG5cdFx0bmV3Um93cyxcblx0XHRjb3VudGVyO1xuXG5cdC8vIFNVTU1FUiAvIFdJTlRFUiBzcGxpY2luZ1xuXHR2YXIgYXJyQnlTZWFzb24gPSBbXSxcblx0XHRtb250aEFzTnVtLFxuXHRcdGQ7XHRcblxuXHR2YXIgZm9vOyBcdFx0XG5cblxuXG5cdC8vIHBvcHVsYXRlIHJlc3VsdHNBcnJcblx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHRcdFx0XHRcblx0XHRpZiAocmVzdWx0cy5kYXRhW2ldLnNwZWNpZXMgPT09IHNlYXJjaCkge1xuXHRcdFx0cmVzdWx0c0Fyci5wdXNoKHJlc3VsdHMuZGF0YVtpXSk7XHRcdFx0XHRcdFxuXHRcdH1cblx0fVx0XG5cblx0dmFyIGwgPSByZXN1bHRzQXJyLmxlbmd0aDtcblxuXHQvLyBjcmVhdGUgYXJyYXkgb2YgdGhlIHllYXJzIGZvdW5kIHdpdGhpbiByZXN1bHRzXG5cdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblxuXHRcdHZhciBjdXJyZW50WWVhciA9IHJlc3VsdHNBcnJbaV0ueWVhcjtcblxuXHRcdC8vIGlmIG5vdCBhbHJlYWR5IGluIHRoZSB5ZWFyIGFycmF5IHRoZW4gcHVzaCBpdCAtIGF2b2lkIGR1cGxpY2F0aW9uXG5cdFx0aWYgKCQuaW5BcnJheShjdXJyZW50WWVhciwgeWVhckFycmF5KSA9PT0gLTEpe1xuXHRcdFx0eWVhckFycmF5LnB1c2goY3VycmVudFllYXIpO1xuXHRcdH1cdFxuXHR9XG5cblxuXG5cblx0Ly8gZ3JvdXAgYnkgeWVhciBpbiB0aGVPYmo6XG5cblx0Ly8gdGhlT2JqID0ge1xuXHQvLyBcdFwiMjAxMlwiIDoge1xuXHQvLyBcdFx0MCA6IG4sIC8vIG4gPSBtb21lbnQuanMgZGF0ZSBvYmplY3Rcblx0Ly8gXHRcdDEgOiBuLFxuXHQvLyBcdFx0ZXRjLi5cblx0Ly8gXHR9LFxuXHQvLyAgXCIyMDE0XCIgOiB7XG5cdC8vIFx0XHQwIDogbixcblx0Ly8gXHRcdGV0Yy4uLlxuXHQvLyBcdH1cblx0Ly8gfVxuXG5cdC8vIE1BSU4gTE9PUCBTRVRUSU5HIFVQIFRIRSBBUlJBWVMgQU5EIFJFRkVSRU5DRSBPQkpFQ1Rcblx0Zm9yICh2YXIgYyA9IDA7IGMgPCB5ZWFyQXJyYXkubGVuZ3RoOyBjKyspIHtcblxuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dID0ge307XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0ubW9udGhBcnIgPSBbXTtcblx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5kYXlBcnIgPSBbXTtcblx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0FyciA9IFtdO1xuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLm9yZGVyZWREYXRlcyA9IFtdO1xuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmVhcmxpZXN0RGF0ZSA9IFwiXCI7XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0ubGF0ZXN0RGF0ZSA9IFwiXCI7XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uZmlyc3RIYWxmID0gW107XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uc2Vjb25kSGFsZiA9IFtdO1xuXG5cblx0XHRmb3IgKHZhciBpbmQgPSAwOyBpbmQgPCBsOyBpbmQrKykge1xuXHRcdFx0aWYgKHJlc3VsdHNBcnJbaW5kXS55ZWFyID09PSB5ZWFyQXJyYXlbY10pIHtcblx0XHRcdFx0Ly8gZm9ybWF0IGFuZCBwdXNoIGRhdGVzXG5cdFx0XHRcdC8vIHZhciBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHJlc3VsdHNBcnJbaW5kXS5mb3JtYXR0ZWRfZGF0ZSk7XG5cdFx0XHRcdHZhciBjdXJyZW50RGF0ZSA9IG1vbWVudChyZXN1bHRzQXJyW2luZF0uZm9ybWF0dGVkX2RhdGUpO1xuXG5cdFx0XHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmRhdGVzQXJyLnB1c2goY3VycmVudERhdGUpO1x0XG5cblxuXHRcdFx0XHQvLyBnZW5lcmF0ZSBhcnJheSBvZiByZXN1bHRzIHdpdGhpbiBtb250aHMgMSAtIDYgXG5cdFx0XHRcdGlmIChjdXJyZW50RGF0ZS5pc0JlZm9yZSh5ZWFyQXJyYXlbY10gKyAnLTA2LTMwJykpIHtcblx0XHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5maXJzdEhhbGYucHVzaChjdXJyZW50RGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBnZW5lcmF0ZSBhcnJheSBvZiByZXN1bHRzIHdpdGhpbiBtb250aHMgNyAtIDEyIFxuXHRcdFx0XHRpZiAoY3VycmVudERhdGUuaXNBZnRlcih5ZWFyQXJyYXlbY10gKyAnLTA2LTMwJykpIHtcblx0XHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmLnB1c2goY3VycmVudERhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc29ydCB0aGUgYXJyYXlzIGFzY2VuZGluZ1xuXHQgICAgXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmZpcnN0SGFsZi5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmLnNvcnQoZGF0ZV9zb3J0X2FzYyk7XG5cdCAgICBcdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uZGF0ZXNBcnIuc29ydChkYXRlX3NvcnRfYXNjKTtcblx0XHRcdH1cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHR9XHRcblxuXG5cblx0XHQvLyBlYXJsaWVzdCBhbmQgbGF0ZXN0IGRhdGVzIGFjcm9zcyB0aGUgeWVhclxuXHRcdHZhciBhcnJMZW4gPSB0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0Fyci5sZW5ndGg7XG5cdFx0Ly8gZ2V0IGVhcmxpZXN0ID0+IFswXVxuXHRcdHZhciBlYXJsaWVzdERhdGUgPSB0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0FyclswXTtcblx0XHQvLyBnZXQgbGF0ZXN0ID0+IFthcnJMZW4gLTFdIC0xIGJlY2F1c2Ugb2YgemVybyBpbmRleFxuXHRcdHZhciBsYXRlc3REYXRlID0gdGhlT2JqW3llYXJBcnJheVtjXV0uZGF0ZXNBcnJbYXJyTGVuIC0gMV07XG5cblx0XHRlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyLnB1c2goZWFybGllc3REYXRlKTtcblx0XHRsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5wdXNoKGxhdGVzdERhdGUpO1xuXG5cblxuXG5cdFx0Ly8gZWFybGllc3QgZGF0ZSBhY3Jvc3MgdGhlIG1vbnRocyA3IC0gMTIgKHdpbnRlciAvIGVhcmxpZXN0KVxuXHRcdGFyckxlbiA9IHRoZU9ialt5ZWFyQXJyYXlbY11dLnNlY29uZEhhbGYubGVuZ3RoO1xuXHRcdC8vIGdldCBlYXJsaWVzdCA9PiBbMF1cblx0XHRlYXJsaWVzdERhdGUgPSB0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmWzBdO1xuXG5cdFx0ZWFybGllc3RfZGF0ZV93aXRoaW5fc2Vjb25kX2hhbGZfYXJyLnB1c2goZWFybGllc3REYXRlKTtcblxuXG5cblxuXHRcdC8vIGxhdGVzdCBkYXRlIGFjcm9zcyBtb250aCAxIC0gNiAod2ludGVyIC8gbGF0ZXN0KVxuXHRcdGFyckxlbiA9IHRoZU9ialt5ZWFyQXJyYXlbY11dLmZpcnN0SGFsZi5sZW5ndGg7XG5cdFx0Ly8gZ2V0IGxhdGVzdCA9PiBbYXJyTGVuIC0xXSAtMSBiZWNhdXNlIG9mIHplcm8gaW5kZXhcblx0XHRsYXRlc3REYXRlID0gdGhlT2JqW3llYXJBcnJheVtjXV0uZmlyc3RIYWxmW2FyckxlbiAtIDFdO1x0XHRcblxuXHRcdGxhdGVzdF9kYXRlX3dpdGhpbl9maXJzdF9oYWxmX2Fyci5wdXNoKGxhdGVzdERhdGUpO1xuXG5cblx0XHRcblx0fVxuXG5cdC8vIHNvcnQgYWxsIGFycmF5cyBhc2NlbmRpbmdcblx0ZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRlYXJsaWVzdF9kYXRlX3dpdGhpbl9zZWNvbmRfaGFsZl9hcnIuc29ydChkYXRlX3NvcnRfYXNjKTtcblx0bGF0ZXN0X2RhdGVfd2l0aGluX2ZpcnN0X2hhbGZfYXJyLnNvcnQoZGF0ZV9zb3J0X2FzYyk7XG5cblxuXG5cdC8vIENPTlNPTEUgUkVTVUxUU1xuXHQvLyB0aGVPYmpbdGhlIHllYXJdLmRhdGVzQXJyID0gYXJyYXkgb2YgbW9tZW50LmpzIGRhdGUgb2JqZWN0cyBzb3J0ZWQgYXNjZW5kaW5nXG5cdC8vIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cdC8vIC8vIGFycmF5IG9mIGVhcmxpZXN0IGRhdGVzIHdpdGhpbiB0aGUgeWVhciwgZm9yIGVhY2ggeWVhciByZWNvcmRlZFxuXHQvLyBjb25zb2xlLmxvZyhlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyKTtcblx0Ly8gLy8gYXJyYXkgb2YgbGF0ZXN0IGRhdGVzIHdpdGhpbiB0aGUgeWVhciwgZm9yIGVhY2ggeWVhciByZWNvcmRlZFxuXHQvLyBjb25zb2xlLmxvZyhsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycik7XG5cblx0Ly8gY29uc29sZS5sb2coZWFybGllc3RfZGF0ZV93aXRoaW5fc2Vjb25kX2hhbGZfYXJyKTtcblxuXHQvLyBjb25zb2xlLmxvZyhsYXRlc3RfZGF0ZV93aXRoaW5fZmlyc3RfaGFsZl9hcnIpO1xuXG5cdFx0XHRcdFx0XHRcdFxuXG5cblx0aWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJlYXJsaWVzdFwiKSB7XG5cdFx0Zm9vID0gZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0XHRmb28gPSBsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIikge1xuXHRcdGZvbyA9IGVhcmxpZXN0X2RhdGVfd2l0aGluX3NlY29uZF9oYWxmX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0XHRmb28gPSBsYXRlc3RfZGF0ZV93aXRoaW5fZmlyc3RfaGFsZl9hcnI7XG5cdH1cblxuXG5cdC8vIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIiB8fCB0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0Ly8gXHRmb28gPSBlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyO1xuXHQvLyB9IGVsc2UgaWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJsYXRlc3RcIiB8fCB0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIikge1xuXHQvLyBcdGZvbyA9IGxhdGVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyO1xuXHQvLyB9XG5cblx0YXJyTGVuZ3RoID0gZm9vLmxlbmd0aDtcblx0XHRcdFxuXHRmb3IgKGluYyA9IDA7IGluYyA8IGFyckxlbmd0aDsgaW5jKyspIHtcblx0XHRcblx0XHRhc0RhdGVPYmpfMSA9IGZvb1tpbmNdO1xuXHRcdFxuXHRcdC8vIGxvb3AgdGhyb3VnaCByZXN1bHRzQXJyIG1hdGNoaW5nIGVhcmxpZXN0IGRhdGVzIGFuZCBwdXNoIHRvIGZpbmFsQXJyXG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cblx0XHRcdGFzRGF0ZU9ial8yID0gbW9tZW50KHJlc3VsdHNBcnJbaV0uZm9ybWF0dGVkX2RhdGUpO1xuXG5cdFx0XHRpZiAobW9tZW50KGFzRGF0ZU9ial8xKS5pc1NhbWUoYXNEYXRlT2JqXzIpKSB7XG5cblx0XHRcdFx0ZmluYWxBcnIucHVzaChyZXN1bHRzQXJyW2ldKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c29ydEJ5RGF0ZShmaW5hbEFycik7XHRcdFx0XG5cblx0aWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJlYXJsaWVzdFwiIHx8IHRoZVNlYXNvbiA9PT0gXCJ3aW50ZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJsYXRlc3RcIikge1xuXG5cdFx0Zm9yIChkID0gMDsgZCA8IGZpbmFsQXJyLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRtb250aEFzTnVtID0gcGFyc2VJbnQoZmluYWxBcnJbZF0ubW9udGgpO1xuXHRcdFx0aWYgKG1vbnRoQXNOdW0gPD0gNikge1xuXHRcdFx0XHRhcnJCeVNlYXNvbi5wdXNoKGZpbmFsQXJyW2RdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIgfHwgdGhlU2Vhc29uID09PSBcIndpbnRlclwiICYmIHRoZVJhbmdlID09PSBcImVhcmxpZXN0XCIpIHtcblxuXHRcdGZvciAoZCA9IDA7IGQgPCBmaW5hbEFyci5sZW5ndGg7IGQrKykge1xuXHRcdFx0bW9udGhBc051bSA9IHBhcnNlSW50KGZpbmFsQXJyW2RdLm1vbnRoKTtcblx0XHRcdGlmIChtb250aEFzTnVtID4gNikge1xuXHRcdFx0XHRhcnJCeVNlYXNvbi5wdXNoKGZpbmFsQXJyW2RdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cdGZpbmFsQXJyTGVuID0gYXJyQnlTZWFzb24ubGVuZ3RoO1xuXG5cdG5ld1Jvd3MgPSAkKCc8c3Bhbi8+Jyk7XG5cblx0Zm9yIChjb3VudGVyID0gMDsgY291bnRlciA8IGZpbmFsQXJyTGVuOyBjb3VudGVyKyspIHtcblx0XHRjb252ZXJ0ZWRMb2NOYW1lID0gbG9jYXRpb25Jbml0aWFsc1RvTmFtZShhcnJCeVNlYXNvbltjb3VudGVyXS5sb2NhdGlvbik7XG5cdFx0JCgnPHRyLz4nLCB7XG5cdFx0XHRodG1sIDogJzx0ZCBjbGFzcz1cImRhdGVcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLmRhdGVfZnJvbSArICc8L3RkPiAnICArICc8dGQgY2xhc3M9XCJsb2NhdGlvblwiPicgXHRcdFx0XHRcdCArIGNvbnZlcnRlZExvY05hbWUgKyAnPC90ZD4gJyAgKyAnPHRkIGNsYXNzPVwiY291bnRcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLmNvdW50ICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwib2JzZXJ2ZXJcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLm9ic2VydmVyICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwibm90ZXNcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLm5vdGVzICsgJzwvdGQ+J1xuXHRcdFx0fVx0XHRcdFx0XHRcdFxuXHRcdCkuYXBwZW5kVG8obmV3Um93cyk7XHRcdFx0XG5cdH1cblx0JChuZXdSb3dzLmh0bWwoKSkuYXBwZW5kVG8oZWxzLnJlc3VsdHNMaXN0XzIpO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgZWxzLm92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTsgfSwgMzAwKTtcblxuXHQvLyByZXNldCBcblx0ZmluYWxBcnJMZW4ubGVuZ3RoID0gMDtcblxufTsiLCJ2YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciBhcnJpdmFsQW5kRGVwYXJ0dXJlID0gcmVxdWlyZSgnLi9hcnJpdmFsQW5kRGVwYXJ0dXJlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyKHJlc3VsdHMpIHtcblxuXHR2YXIgbG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oKXtcblx0ICB2YXIgZCA9ICQuRGVmZXJyZWQoKTtcblx0ICAgIGVscy5vdmVybGF5LmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICBcdHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcblxuXG5cdHZhciBmaXJlUmVzID0gZnVuY3Rpb24odGhlUmFuZ2UsIHRoZVNlYXNvbil7XG5cdCAgdmFyIGQgPSAkLkRlZmVycmVkKCk7XG5cdCAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgIGFycml2YWxBbmREZXBhcnR1cmUocmVzdWx0cywgdGhlUmFuZ2UsIHRoZVNlYXNvbik7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICB9LCAxMDApO1xuXHQgIHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcdFxuXG5cblx0JCgnI3N1Ym1pdF8yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHRoZVJhbmdlID0gJCgnLmFycml2ZS1kZXBhcnQ6Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdHZhciB0aGVTZWFzb24gPSAkKCcuYXJyaXZlLWRlcGFydDpjaGVja2VkJykuZGF0YSgnc2Vhc29uJyk7XG5cdFx0dmFyIHNwZWNpZXNTZWFyY2ggPSAkKCcuc3BlY2llc1NlYXJjaCcpLnNlbGVjdGl2aXR5KCd2YWx1ZScpO1xuXG5cdFx0Ly8gdmFsaWRhdGVcdFx0XG5cdFx0aWYgKHNwZWNpZXNTZWFyY2gpIHtcblxuXHRcdFx0aWYgKCQoJy5hcnJpdmUtZGVwYXJ0JykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuXG5cdFx0XHRcdGxvYWRpbmdDbGFzcygpLnBpcGUoZmlyZVJlcyh0aGVSYW5nZSwgdGhlU2Vhc29uKSk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiU2VsZWN0IGZyb20gZWFybGllc3Qgb3IgbGF0ZXN0IGRhdGVzLlwiKTtcblx0XHRcdH1cdFxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0YWxlcnQoXCJQbGVhc2Ugc2VsZWN0IGEgc3BlY2llc1wiKTtcblx0XHR9XG5cdH0pO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhdGVfc29ydF9hc2MoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSA+IGRhdGUyKSB7XG4gIFx0cmV0dXJuIDE7XG4gIH1cbiAgaWYgKGRhdGUxIDwgZGF0ZTIpIHtcbiAgXHRyZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG4iLCIvLyBjb25maWcgXG52YXIgZm9sbCA9IGZvbGwgfHwge307XG5mb2xsLmNvbmZpZyA9IHtcblx0Ly8gUGxlYXNlIGFkZCBzaXRlIFVSTCBoZXJlIChubyB0cmFpbGluZyBmb3J3YXJkIHNsYXNoKVxuXG5cdHNpdGVVcmw6IFwiaHR0cDovL2xvY2FsaG9zdC9mb2xsXCIsXHRcblx0Ly8gc2l0ZVVybDogXCJodHRwOi8vZm9sbC5qYXlvbnRyYXBzLmNvbVwiLFx0XG5cdC8vIHNpdGVVcmw6IFwiaHR0cDovL2ZvbGwub3JnLnVrXCIsXHRcblx0YXBwUGFnZUlEOiA2OVx0XG59O1xuXG4vLyBzZXR1cFxudmFyIHNldFVwRXZlbnRzID0gcmVxdWlyZSgnLi9zZXR1cC9zZXRVcEV2ZW50cy5qcycpO1xudmFyIGJ1aWxkRm9ybUVscyA9IHJlcXVpcmUoJy4vc2V0dXAvYnVpbGRGb3JtRWxzLmpzJyk7XG52YXIgdGhlU2VhcmNoID0gcmVxdWlyZSgnLi91dGlscy90aGVTZWFyY2guanMnKTtcbnZhciBhcnJpdmVEZXBhcnRFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL2Fycml2ZURlcGFydC9hcnJpdmVEZXBhcnRFdmVudEhhbmRsZXIuanMnKTtcbnZhciB2YWxpZGF0ZUdyYXBoU2VhcmNoID0gcmVxdWlyZSgnLi9oaXN0b2dyYW0vdmFsaWRhdGVHcmFwaFNlYXJjaC5qcycpO1xuXG5cblxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1x0XG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogZm9sbC5jb25maWcuc2l0ZVVybCArICcvd3AtanNvbi9wYWdlcycsXG5cdCAgICBkYXRhOiB7XG5cdCAgICAgICAgZmlsdGVyOiB7XG5cdCAgICAgICAgIFwicGFnZV9pZFwiOiBmb2xsLmNvbmZpZy5hcHBQYWdlSUQsXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGRhdGFUeXBlOiAnanNvbicsXG5cdCAgICB0eXBlOiAnR0VUJyxcblx0ICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcdFxuXHQgICAgXHR2YXIgZGF0YXNldFVybCA9IGRhdGFbMF0ubWV0YS5kYXRhc2V0LnVybDtcblxuXHRcdFx0UGFwYS5wYXJzZShkYXRhc2V0VXJsLCB7XG5cdFx0XHRcdGRvd25sb2FkOiB0cnVlLFxuXHRcdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbihyZXN1bHRzKSB7XHRcblx0XHRcdFx0XHRidWlsZEZvcm1FbHMocmVzdWx0cyk7XG5cdFx0XHRcdFx0c2V0VXBFdmVudHMocmVzdWx0cyk7XG5cdFx0XHRcdFx0YXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyKHJlc3VsdHMpO1xuXHRcdFx0XHRcdHZhbGlkYXRlR3JhcGhTZWFyY2gocmVzdWx0cyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHQgICAgfSxcblx0ICAgIGVycm9yOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICAvLyBlcnJvciBjb2RlXG5cdCAgICB9XG5cdH0pO1x0XG5cblx0Ly8gdmFyIGRhdGFzZXRVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9mb2xsL3dwLWNvbnRlbnQvdGhlbWVzL2ZvbGwvY3N2L2RhdGFzZXQuY3N2XCI7XG5cdC8vIFBhcGEucGFyc2UoZGF0YXNldFVybCwge1xuXHQvLyBcdGRvd25sb2FkOiB0cnVlLFxuXHQvLyBcdGhlYWRlcjogdHJ1ZSxcblx0Ly8gXHRjb21wbGV0ZTogZnVuY3Rpb24ocmVzdWx0cykge1x0XG5cdC8vIFx0XHRidWlsZEZvcm1FbHMocmVzdWx0cyk7XG5cdC8vIFx0XHRzZXRVcEV2ZW50cyhyZXN1bHRzKTtcblx0Ly8gXHRcdGFycml2ZURlcGFydEV2ZW50SGFuZGxlcihyZXN1bHRzKTtcblx0Ly8gXHRcdHZhbGlkYXRlR3JhcGhTZWFyY2gocmVzdWx0cyk7XG5cdC8vIFx0fVxuXHQvLyB9KTtcdFxuXG5cbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0VXBHcmFwaChncmFwaEFyciwgZ3JhcGhPYmopIHtcblxuXHRjb25zb2xlLmxvZyhncmFwaE9iaik7XG5cblx0dmFyIGdyYXBoQXJyRmluYWwgPSBbXSxcblx0XHRzdW1PZkNvdW50ID0gMCxcblx0XHRzdW1PZkNvdW50RGl2aWRlZCxcblx0XHRjb3VudEFyciA9IFtdLFxuXHRcdGhpZ2hlc3ROdW1iZXJTdG9yZSA9IFtdLFxuXHRcdGhpZ2hlc3ROdW0sXG5cdFx0aGlnaGVzdE51bUFyciA9IFtdLFxuXHRcdGksXG5cdFx0YztcblxuXG5cblx0Zm9yIChpID0gMDsgaSA8IGdyYXBoQXJyLmxlbmd0aDsgaSsrKSB7XG5cblx0XHQvLyBnZXQgdGhlIGRhdGUgb2YgdGhlIHJlY29yZCBhcyBhIG1vbWVudCgpIG9iamVjdFxuXHRcdHZhciBjdXJyZW50RGF0ZSA9IG1vbWVudChncmFwaEFycltpXS5mb3JtYXR0ZWRfZGF0ZSk7XHRcblxuXHRcdC8vIHN1YnRyYWN0IGEgZGF5IGZyb20gSkFOIDAxIHRvIGluY2x1ZGUgdGhlIEpBTiAwMSBpbiByZXN1bHRzXG5cdFx0dmFyIGdyYXBoX3N0YXJ0X3N1YnRyYWN0ZWQgPSBtb21lbnQoZ3JhcGhPYmouZ3JhcGhfc3RhcnQpLnN1YnRyYWN0KDEsICdkYXlzJyk7XG5cblx0XHQvLyBnZXQgYWxsIHJlY29yZHMgYmV0d2VlbiBzZWxlY3RlZCByYW5nZVxuXHRcdGlmIChjdXJyZW50RGF0ZS5pc0JldHdlZW4oZ3JhcGhfc3RhcnRfc3VidHJhY3RlZCwgZ3JhcGhPYmouZ3JhcGhfZW5kKSkge1x0XHRcdFx0XHRcblx0XHRcdGdyYXBoQXJyRmluYWwucHVzaChncmFwaEFycltpXSk7XG5cdFx0fVxuXHR9XG5cblxuXHR2YXIgZ3JhcGhBcnJGaW5hbExlbmd0aCA9IGdyYXBoQXJyRmluYWwubGVuZ3RoLFxuXHRcdGNvdW50SW50LFxuXHRcdG1vbnRoSW50O1xuXG5cblx0Ly8gZ2VuZXJhdGUgc3VtIGNvdW50IGFycmF5XG5cblx0Ly8gbG9vcCB0aHJvdWdoIGVhY2ggbW9udGggd2l0aGluIHJhbmdlXG5cdGZvciAoYyA9IDE7IGMgPCAxMzsgYysrKSB7XHRcblxuXHRcdC8vIGZvciBlYWNoIG1vbnRoIGdyYWIgaGlnaGVzdCBudW1iZXJzIGFuZCBzdW0gY291bnRzXG5cdFx0Zm9yIChpID0gMDsgaSA8IGdyYXBoQXJyRmluYWwubGVuZ3RoOyBpKyspIHtcdFxuXG5cdFx0XHRpZiAoZ3JhcGhBcnJGaW5hbFtpXS5jb3VudCA9PT0gXCJcIikge1xuXHRcdFx0XHRncmFwaEFyckZpbmFsW2ldLmNvdW50ID0gXCIwXCI7XG5cdFx0XHR9XG5cblx0XHRcdGNvdW50SW50ID0gcGFyc2VJbnQoZ3JhcGhBcnJGaW5hbFtpXS5jb3VudCk7XG5cdFx0XHRtb250aEludCA9IHBhcnNlSW50KGdyYXBoQXJyRmluYWxbaV0ubW9udGgpO1x0XHRcdFx0XG5cblx0XHRcdGlmIChtb250aEludCA9PT0gYykge1xuXHRcdFx0XHQvLyBoaWdoZXN0TnVtYmVyU3RvcmUucHVzaChjb3VudEludCk7XG5cdFx0XHRcdHN1bU9mQ291bnQgKz0gY291bnRJbnQ7XHRcdFx0XHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XHRcblxuXHRcdC8vIGZvciBtb250aHMgd2l0aCBubyB2YWx1ZXMgcHVzaCBhIHplcm9cblx0XHQvLyBpZiAoaGlnaGVzdE51bWJlclN0b3JlLmxlbmd0aCA9PT0gMCkge1xuXHRcdC8vIFx0aGlnaGVzdE51bUFyci5wdXNoKDApO1xuXHRcdC8vIH0gZWxzZSB7XG5cdFx0Ly8gXHQvLyBnZXQgaGlnaGVzdCB2YWx1ZVxuXHRcdC8vIFx0aGlnaGVzdE51bSA9IGdldE1heE9mQXJyYXkoaGlnaGVzdE51bWJlclN0b3JlKTtcblx0XHQvLyBcdC8vIGRpdmlkZSBieSBudW1iZXIgb2YgeWVhcnNcblx0XHQvLyBcdGhpZ2hlc3ROdW0gPSBoaWdoZXN0TnVtIC8gZ3JhcGhPYmoubnVtT2ZZZWFycztcblx0XHQvLyBcdC8vIHB1c2ggaGlnaGVzdCB2YWx1ZSB0byBoaWdoZXN0TnVtQXJyXG5cdFx0Ly8gXHRoaWdoZXN0TnVtQXJyLnB1c2goaGlnaGVzdE51bSk7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gc3VtIGRpdmlkZWQgYnkgbnVtYmVyIG9mIHllYXJzXG5cdFx0c3VtT2ZDb3VudERpdmlkZWQgPSBzdW1PZkNvdW50IC8gZ3JhcGhPYmoubnVtT2ZZZWFycztcblx0XHRjb3VudEFyci5wdXNoKHN1bU9mQ291bnREaXZpZGVkKTtcblxuXHRcdC8vIHJlc2V0IFxuXHRcdHN1bU9mQ291bnQgPSAwO1x0XG5cdFx0aGlnaGVzdE51bSA9IDA7XHRcblx0XHRoaWdoZXN0TnVtYmVyU3RvcmUubGVuZ3RoID0gMDtcdFxuXG5cdH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdC8vIC8vIGdlbmVyYXRlIGhpZ2hlc3QgbnVtYmVyIGFycmF5XG5cblx0Ly8gdmFyIGxlbmd0aCA9IGdyYXBoT2JqLnllYXJzV2l0aGluUmFuZ2UubGVuZ3RoO1xuXHQvLyB2YXIgcmVzdWx0c1lZLFxuXHQvLyBcdHJlc3VsdHNNTSxcblx0Ly8gXHRyZXN1bHRzQztcblxuXHQvLyB2YXIgZm9vID0gMDtcblxuXHQvLyBcdGdyYXBoT2JqLnllYXJzID0ge307XG5cblx0Ly8gZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuXG5cdC8vIFx0dmFyIGN1cnJZZWFyID0gZ3JhcGhPYmoueWVhcnNXaXRoaW5SYW5nZVtpbmRleF07XG5cblx0Ly8gXHRncmFwaE9iai55ZWFyc1tjdXJyWWVhcl0gPSB7fTtcblx0XHRcblx0Ly8gXHRmb3IgKGkgPSAwOyBpIDwgZ3JhcGhBcnJGaW5hbC5sZW5ndGg7IGkrKykge1xuXG5cdC8vIFx0XHRyZXN1bHRzWVkgPSBwYXJzZUludChncmFwaEFyckZpbmFsW2ldLnllYXIpO1xuXHQvLyBcdFx0cmVzdWx0c01NID0gcGFyc2VJbnQoZ3JhcGhBcnJGaW5hbFtpXS5tb250aCk7XG5cdC8vIFx0XHRyZXN1bHRzQyA9IHBhcnNlSW50KGdyYXBoQXJyRmluYWxbaV0uY291bnQpO1xuXG5cdC8vIFx0XHRpZiAocmVzdWx0c1lZID09PSBjdXJyWWVhcikge1xuXG5cdC8vIFx0XHRcdC8vIGxvb3AgdGhyb3VnaCBlYWNoIG1vbnRoIHdpdGhpbiB5ZWFyXG5cdC8vIFx0XHRcdGZvciAoYyA9IDE7IGMgPCAxMzsgYysrKSB7XHRcblxuXHQvLyBcdFx0XHRcdGlmIChyZXN1bHRzTU0gPT09IGMpIHtcblx0Ly8gXHRcdFx0XHRcdGdyYXBoT2JqLnllYXJzW2N1cnJZZWFyXVtjXSA9IFtdO1x0XG5cdC8vIFx0XHRcdFx0XHRncmFwaE9iai55ZWFyc1tjdXJyWWVhcl1bY10ucHVzaChyZXN1bHRzQyk7XG5cdC8vIFx0XHRcdFx0fVxuXG5cdC8vIFx0XHRcdH1cblx0XHRcdFxuXHQvLyBcdFx0fVxuXHRcdFx0XHRcdFxuXHQvLyBcdH1cblxuXHQvLyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdGNvbnNvbGUubG9nKGNvdW50QXJyKTtcblxuXHQvLyBjaGVjayBpZiBhbGwgdmFsdWVzIGFyZSAwIC0gaS5lIG5vIHJlY29yZHMgZm9yIGEgZ2l2ZW4gcGVyaW9kXG5cdHZhciBjb3VudGVyID0gMDtcblx0Zm9yIChpID0gMDsgaSA8IGNvdW50QXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y291bnRlciArPSBjb3VudEFycltpXTtcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHR9IFxuXHRpZiAoY291bnRlciA9PT0gMCkge1xuXHRcdGFsZXJ0KFwiTm8gcmVjb3JkcyBmb3IgdGhpcyBwZXJpb2QuXCIpO1xuXHRcdGlmICh3aW5kb3cubXlCYXIpIHtcblx0XHRcdG15QmFyLmNsZWFyKCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIHtcblxuXHRcdGlmICh3aW5kb3cubXlCYXIpIHtcblx0XHRcdC8vIHVwZGF0ZSBcblx0XHRcdGZvciAodmFyIGwgPSAwOyBsIDwgbXlCYXIuZGF0YXNldHNbMF0uYmFycy5sZW5ndGg7IGwrKykge1xuXHRcdFx0XHRteUJhci5kYXRhc2V0c1swXS5iYXJzW2xdLnZhbHVlID0gY291bnRBcnJbbF07XHRcdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0XHRteUJhci51cGRhdGUoKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHZhciBiYXJDaGFydERhdGEgPSB7XG5cdFx0XHRsYWJlbHMgOiBbXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sXG5cdFx0XHRkYXRhc2V0cyA6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpbGxDb2xvciA6IFwicmdiYSgwMDAsMDAwLDAwMCwwLjUpXCIsXG5cdFx0XHRcdFx0c3Ryb2tlQ29sb3IgOiBcInJnYmEoMDAwLDAwMCwwMDAsMC44KVwiLFxuXHRcdFx0XHRcdGhpZ2hsaWdodEZpbGw6IFwicmdiYSgwMDAsMDAwLDAwMCwwLjc1KVwiLFxuXHRcdFx0XHRcdGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDAwMCwwMDAsMDAwLDEpXCIsXG5cdFx0XHRcdFx0ZGF0YSA6IGNvdW50QXJyXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyAsXG5cdFx0XHRcdC8vIHtcblx0XHQgIC8vICAgICAgICAgICBsYWJlbDogXCJNeSBTZWNvbmQgZGF0YXNldFwiLFxuXHRcdCAgLy8gICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDE1MSwxODcsMjA1LDAuNSlcIixcblx0XHQgIC8vICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDE1MSwxODcsMjA1LDAuOClcIixcblx0XHQgIC8vICAgICAgICAgICBoaWdobGlnaHRGaWxsOiBcInJnYmEoMTUxLDE4NywyMDUsMC43NSlcIixcblx0XHQgIC8vICAgICAgICAgICBoaWdobGlnaHRTdHJva2U6IFwicmdiYSgxNTEsMTg3LDIwNSwxKVwiLFxuXHRcdCAgLy8gICAgICAgICAgIGRhdGE6IGhpZ2hlc3ROdW1BcnJcblx0XHQgIC8vICAgICAgIH1cblx0XHRcdF1cblxuXHRcdFx0fTtcblxuXG5cdFx0XHR2YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuXHRcdFx0d2luZG93Lm15QmFyID0gbmV3IENoYXJ0KGN0eCkuQmFyKGJhckNoYXJ0RGF0YSwge1xuXHRcdFx0XHRyZXNwb25zaXZlIDogdHJ1ZVxuXHRcdFx0fSk7XHRcblx0XHRcdCQoJy55LWF4aXMtaGVhZCcpLmFkZENsYXNzKCdvbicpO1x0XHRcdFxuXHRcdH1cdFxuXG5cdH1cbn07XG5cbiIsInZhciBzZXRVcEdyYXBoID0gcmVxdWlyZSgnLi9zZXRVcEdyYXBoLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdGVHcmFwaFNlYXJjaChyZXN1bHRzKSB7XG5cdFx0XG5cdCQoJyNnZW5lcmF0ZUdyYXBoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHZhciBzcGVjaWVzTmFtZSA9ICQoJy5zcGVjaWVzU2VhcmNoJykuc2VsZWN0aXZpdHkoJ3ZhbHVlJyk7XG5cdFx0Ly8gZ2V0IHRoZSBzdGFydCBkYXRlXG5cdFx0dmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdyYXBoXCIpO1xuXHRcdHZhciBncmFwaF9zdGFydCA9IHMub3B0aW9uc1tzLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1x0XHRcblx0XHQvLyBnZXQgdGhlIGVuZCBkYXRlXG5cdFx0dmFyIGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZC1ncmFwaFwiKTtcblx0XHR2YXIgZ3JhcGhfZW5kID0gZS5vcHRpb25zW2Uuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHRcblxuXG5cblx0XHRpZiAoc3BlY2llc05hbWUgPT09IG51bGwpIHtcblx0XHRcdGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGEgc3BlY2llcycpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cdFxuXHRcdFxuXG5cdFx0aWYgKHNwZWNpZXNOYW1lKSB7XG5cdFx0XHRcblx0XHRcdGlmIChncmFwaF9zdGFydCA9PT0gXCIwMDAwXCIgfHwgZ3JhcGhfZW5kID09PSBcIjAwMDBcIiB8fCBncmFwaF9zdGFydCA+IGdyYXBoX2VuZCkge1xuXHRcdFx0XHRhbGVydChcIkludmFsaWQgZGF0ZSByYW5nZS5cIik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cdFx0XG5cblx0XHRcdHZhciBncmFwaE9iaiA9IHt9O1xuXHRcdFx0Z3JhcGhPYmoueWVhcnNXaXRoaW5SYW5nZSA9IFtdO1xuXG5cdFx0XHQvLyBudW1iZXIgb2YgeWVhcnMgaW4gc2VhcmNoXG5cdFx0XHR2YXIgZ3JTcnQgPSBwYXJzZUludChncmFwaF9zdGFydCksXG5cdFx0XHRcdGdyRW5kID0gcGFyc2VJbnQoZ3JhcGhfZW5kKTsgXG5cblxuXHRcdFx0XHQvLyBhZGQgMSB0byBncmFwaF9lbmQgYW5kIGdyRW5kIC0gdG8gc2hpZnQgdGhlIGVuZCBkYXRlIHVwIGEgeWVhci4uLlxuXHRcdFx0IFx0Ly8gdGhpcyBhbGxvd3MgYSBtb3JlIHJlYWRhYmxlIGVuZC1vZi1yYW5nZSBsYWJlbCBcblx0XHRcdCBcdC8vIGUuZy4gaW5zdGVhZCBvZiByZWFkaW5nIFwiIC4uLiB0byAxc3QgSmFuIDIwMTBcIiB0byByZWFkIFwiIC4uLiB0byAzMXN0IERlYyAyMDA5IDx0aGUgcHJldmlvdXMgeWVhcj5cIlxuXHRcdFx0IFx0Ly8gcmVmZmVyIHRvIHRoZSB0aGVPYmogZm9yIGFjdHVhbCBzdGFydCBhbmQgZW5kIGRhdGVzIC0gZ3JhcGhPYmouZ3JhcGhfc3RhcnQgYW5kIGdyYXBoT2JqLmdyYXBoX2VuZFxuXHRcdFx0XHRnckVuZCA9IGdyRW5kICsgMTtcblx0XHRcdFx0Z3JhcGhfZW5kID0gZ3JFbmQudG9TdHJpbmcoKTtcblxuXG5cdFx0XHR2YXJcdG51bU9mWWVhcnMgPSBnckVuZCAtIGdyU3J0O1xuXG5cdFx0XHQvLyBmb3JtYXQgeWVhciBmb3IgbW9tZW50LmpzXHRcblx0XHRcdGdyYXBoX3N0YXJ0ID0gZ3JhcGhfc3RhcnQgKyBcIi0wMS0wMVwiO1xuXHRcdFx0Z3JhcGhfZW5kID0gZ3JhcGhfZW5kICsgXCItMDEtMDFcIjtcblxuXHRcdFx0Ly8gYXJyYXkgb2YgeWVhcnMgd2l0aGluIHJhbmdlXG5cdFx0XHR2YXIgY291bnRlciA9IGdyU3J0O1xuXHRcdFx0d2hpbGUoY291bnRlciA8IGdyRW5kKSB7XG5cdFx0XHRcdGdyYXBoT2JqLnllYXJzV2l0aGluUmFuZ2UucHVzaChjb3VudGVyKTtcblx0XHRcdFx0Y291bnRlcisrO1xuXHRcdFx0fVxuXG5cdFx0XHRcblx0XHRcdGdyYXBoT2JqLmdyYXBoX3N0YXJ0ID0gZ3JhcGhfc3RhcnQ7XG5cdFx0XHRncmFwaE9iai5ncmFwaF9lbmQgPSBncmFwaF9lbmQ7XG5cdFx0XHRncmFwaE9iai5udW1PZlllYXJzID0gbnVtT2ZZZWFycztcblxuXG5cdFx0XHR2YXIgZ3JhcGhBcnIgPSBbXTtcblx0XHRcdHZhciBsZW4gPSByZXN1bHRzLmRhdGEubGVuZ3RoIC0gMTtcdFx0XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblxuXHRcdFx0XHRpZiAocmVzdWx0cy5kYXRhW2ldLnNwZWNpZXMgPT09IHNwZWNpZXNOYW1lKSB7XG5cdFx0XHRcdFx0Z3JhcGhBcnIucHVzaChyZXN1bHRzLmRhdGFbaV0pO1xuXHRcdFx0XHR9XHRcblx0XHRcdH1cblxuXHRcdFx0c2V0VXBHcmFwaChncmFwaEFyciwgZ3JhcGhPYmopO1xuXHRcdH0gXG5cdFx0XHRcdFx0XHRcblx0fSk7XG5cbn07IiwiLy8gdXRpbHNcbnZhciBlbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2Vscy5qcycpO1xudmFyIHRoZVNlYXJjaCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvdGhlU2VhcmNoLmpzJyk7XG52YXIgbG9jYXRpb25Jbml0aWFsc1RvTmFtZSA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvbG9jYXRpb25Jbml0aWFsc1RvTmFtZS5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGREb21FbHModG90YWxSZXN1bHRzLCByZXN1bHRzQXJyKSB7XG5cdHZhciBuZXdSb3dzID0gJCgnPHNwYW4vPicpO1xuXHR2YXIgY29udmVydGVkTG9jTmFtZSA9IFwiXCI7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFJlc3VsdHM7IGkrKykge1xuXHRcdGNvbnZlcnRlZExvY05hbWUgPSBsb2NhdGlvbkluaXRpYWxzVG9OYW1lKHJlc3VsdHNBcnJbaV0ubG9jYXRpb24pO1xuXHRcdCQoJzx0ci8+Jywge1xuXHRcdFx0aHRtbCA6ICc8dGQgY2xhc3M9XCJzcGVjaWVzXCI+JyAgKyByZXN1bHRzQXJyW2ldLnNwZWNpZXMgKyAnPC90ZD4gJyAgKyAnPHRkIGNsYXNzPVwiZGF0ZVwiPicgICsgcmVzdWx0c0FycltpXS5kYXRlX2Zyb20gKyAnPC90ZD4gJyAgKyAnPHRkIGNsYXNzPVwibG9jYXRpb25cIj4nICsgY29udmVydGVkTG9jTmFtZSArICc8L3RkPiAnICArICc8dGQgY2xhc3M9XCJjb3VudFwiPicgICsgcmVzdWx0c0FycltpXS5jb3VudCArICc8L3RkPiAnICsgJzx0ZCBjbGFzcz1cIm9ic2VydmVyXCI+JyAgKyByZXN1bHRzQXJyW2ldLm9ic2VydmVyICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwibm90ZXNcIj4nICArIHJlc3VsdHNBcnJbaV0ubm90ZXMgKyAnPC90ZD4nXG5cdFx0XHR9XHRcdFx0XHRcdFx0XG5cdFx0KS5hcHBlbmRUbyhuZXdSb3dzKTtcdFx0XHRcblx0fVxuXHQkKG5ld1Jvd3MuaHRtbCgpKS5hcHBlbmRUbyhlbHMucmVzdWx0c0xpc3QpO1xufTsiLCIvLyB1dGlsc1xudmFyIGVscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZWxzLmpzJyk7XG52YXIgdGhlU2VhcmNoID0gcmVxdWlyZSgnLi8uLi91dGlscy90aGVTZWFyY2guanMnKTtcbnZhciBzb3J0QnlEYXRlID0gcmVxdWlyZSgnLi8uLi91dGlscy9zb3J0QnlEYXRlLmpzJyk7XG52YXIgbWF4TnVtUmVzdWx0cyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvbWF4TnVtUmVzdWx0cy5qcycpO1xudmFyIGVzY2FwZURhdGVGdW4gPSByZXF1aXJlKCcuLy4uL3V0aWxzL2VzY2FwZURhdGVGdW4uanMnKTtcblxuLy8gc2VhcmNoXG52YXIgZGlzcGxheVJlc3VsdHMgPSByZXF1aXJlKCcuL2Rpc3BsYXlSZXN1bHRzLmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkYXRlUmFuZ2UocmVzdWx0c0FyciwgdGhlU2VhcmNoKSB7XG5cblx0dmFyIGRhdGVJbnB1dENoZWNrZWQgPSAkKCdpbnB1dFtuYW1lPVwiZGF0ZS1yYW5nZVwiXTpjaGVja2VkJyk7XG5cdHZhciB1c2VyU3RhcnREYXRlID0gJCgnI3N0YXJ0IGlucHV0W3R5cGU9XCJoaWRkZW5cIl0nKS52YWwoKTtcblx0dmFyIHVzZXJFbmR0RGF0ZSA9ICQoJyNlbmQgaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLnZhbCgpO1xuXHR2YXIgZmlsdGVyZWRBcnIgPSBbXTtcdFx0XG5cdFxuXG5cdGlmIChkYXRlSW5wdXRDaGVja2VkLmxlbmd0aCA+IDApIHtcblxuXHRcdGlmIChkYXRlSW5wdXRDaGVja2VkLnZhbCgpID09PSBcImJ5LXJhbmdlXCIpIHtcblxuXHRcdFx0dGhlU2VhcmNoLmJ5bW9udGggPSBcIlwiO1xuXHRcdFx0XG5cdFx0XHRpZiAodXNlclN0YXJ0RGF0ZS5sZW5ndGggPT09IDAgfHwgdXNlckVuZHREYXRlLmxlbmd0aCA9PT0gMCkge1xuXG5cdFx0XHRcdGVzY2FwZURhdGVGdW4oKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR2YXIgc3RhcnREYXRlID0gbW9tZW50KHVzZXJTdGFydERhdGUpO1xuXHRcdFx0XHR2YXIgZW5kRGF0ZSA9IG1vbWVudCh1c2VyRW5kdERhdGUpO1xuXG5cblx0XHRcdFx0aWYgKGVuZERhdGUuaXNCZWZvcmUoc3RhcnREYXRlKSkge1xuXHRcdFx0XHRcdGVzY2FwZURhdGVGdW4oKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gdmFyIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHVzZXJTdGFydERhdGUpO1xuXHRcdFx0XHRcdC8vIHZhciBlbmREYXRlID0gbmV3IERhdGUodXNlckVuZHREYXRlKTtcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhlU2VhcmNoLmRhdGVyYW5nZSA9IHRydWU7XG5cdFx0XHRcdFx0dGhlU2VhcmNoLnN0YXJ0ZGF0ZSA9IHVzZXJTdGFydERhdGU7XG5cdFx0XHRcdFx0dGhlU2VhcmNoLmVuZGRhdGUgPSB1c2VyRW5kdERhdGU7XG5cblx0XHRcdFx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhlU2VhcmNoLm51bU9mUmVzdWx0czsgaW5kZXgrKykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyB2YXIgY3VycmVudERhdGUgPSBuZXcgRGF0ZShyZXN1bHRzQXJyW2luZGV4XS5mb3JtYXR0ZWRfZGF0ZSk7XG5cdFx0XHRcdFx0XHR2YXIgY3VycmVudERhdGUgPSBtb21lbnQocmVzdWx0c0FycltpbmRleF0uZm9ybWF0dGVkX2RhdGUpO1x0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0Ly8gaWYgKGN1cnJlbnREYXRlID4gc3RhcnREYXRlICYmIGN1cnJlbnREYXRlIDwgZW5kRGF0ZSApIHtcblx0XHRcdFx0XHRcdC8vIFx0ZmlsdGVyZWRBcnIucHVzaChyZXN1bHRzQXJyW2luZGV4XSk7XG5cdFx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRcdGlmICggY3VycmVudERhdGUuaXNCZXR3ZWVuKHN0YXJ0RGF0ZSwgZW5kRGF0ZSkgKSB7XG5cdFx0XHRcdFx0XHRcdGZpbHRlcmVkQXJyLnB1c2gocmVzdWx0c0FycltpbmRleF0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhlU2VhcmNoLm51bU9mUmVzdWx0cyA9IGZpbHRlcmVkQXJyLmxlbmd0aDtcblx0XHRcdFx0XHRzb3J0QnlEYXRlKGZpbHRlcmVkQXJyLCB0aGVTZWFyY2gpO1xuXHRcdFx0XHRcdG1heE51bVJlc3VsdHMoZmlsdGVyZWRBcnIsIHRoZVNlYXJjaCk7XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRkaXNwbGF5UmVzdWx0cyhmaWx0ZXJlZEFyciwgdGhlU2VhcmNoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XHRcdFx0XG5cblx0XHR9IGVsc2UgaWYoZGF0ZUlucHV0Q2hlY2tlZC52YWwoKSA9PT0gXCJieS1tb250aFwiKSB7XG5cblx0XHRcdHRoZVNlYXJjaC5kYXRlcmFuZ2UgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0Ly8gZ3JhYiB0aGUgaW5vdXQgdmFsdWVcblx0XHRcdHZhciB1c2VyTW9udGhTZWxlY3RlZCA9ICQoJyNieU1vbnRoJykudmFsKCk7XHRcblx0XHRcdHRoZVNlYXJjaC5ieW1vbnRoID0gdXNlck1vbnRoU2VsZWN0ZWQ7XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0Ly8gZ2VuZXJhdGUgZmlsdGVyZWRBcnJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhlU2VhcmNoLm51bU9mUmVzdWx0czsgaSsrKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAocmVzdWx0c0FycltpXS5tb250aCA9PT0gdXNlck1vbnRoU2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRmaWx0ZXJlZEFyci5wdXNoKHJlc3VsdHNBcnJbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoZVNlYXJjaC5udW1PZlJlc3VsdHMgPSBmaWx0ZXJlZEFyci5sZW5ndGg7XG5cdFx0XHRzb3J0QnlEYXRlKGZpbHRlcmVkQXJyLCB0aGVTZWFyY2gpO1xuXHRcdFx0bWF4TnVtUmVzdWx0cyhmaWx0ZXJlZEFyciwgdGhlU2VhcmNoKTtcblx0XHRcdGRpc3BsYXlSZXN1bHRzKGZpbHRlcmVkQXJyLCB0aGVTZWFyY2gpO1xuXG5cblx0XHR9IGVsc2UgaWYgKGRhdGVJbnB1dENoZWNrZWQudmFsKCkgPT09IFwiYWxsLWRhdGVzXCIpIHtcblxuXHRcdFx0dGhlU2VhcmNoLmJ5bW9udGggPSBcIlwiO1xuXG5cdFx0XHR0aGVTZWFyY2guZGF0ZXJhbmdlID0gZmFsc2U7XHRcdFx0XG5cdFx0XHRzb3J0QnlEYXRlKHJlc3VsdHNBcnIpO1xuXHRcdFx0bWF4TnVtUmVzdWx0cyhyZXN1bHRzQXJyLCB0aGVTZWFyY2gpO1x0XHRcblx0XHRcdGRpc3BsYXlSZXN1bHRzKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCk7XG5cdFx0XG5cdFx0fVxuXG5cdH0gZWxzZXtcblx0XHRcblx0XHRzb3J0QnlEYXRlKHJlc3VsdHNBcnIpO1xuXHRcdG1heE51bVJlc3VsdHMocmVzdWx0c0FyciwgdGhlU2VhcmNoKTtcblx0XHRkaXNwbGF5UmVzdWx0cyhyZXN1bHRzQXJyLCB0aGVTZWFyY2gpO1xuXHR9XHRcbn07IiwiLy8gdXRpbHNcbnZhciBlbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2Vscy5qcycpO1xudmFyIGxvY2F0aW9uSW5pdGlhbHNUb05hbWUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2xvY2F0aW9uSW5pdGlhbHNUb05hbWUuanMnKTtcbnZhciB0aGVTZWFyY2ggPSByZXF1aXJlKCcuLy4uL3V0aWxzL3RoZVNlYXJjaC5qcycpO1xudmFyIHJldmVyc2VEYXRlU3RyaW5nID0gcmVxdWlyZSgnLi8uLi91dGlscy9yZXZlcnNlRGF0ZVN0cmluZy5qcycpO1xuXG5cbi8vIHNlYXJjaFxudmFyIGJ1aWxkRG9tRWxzID0gcmVxdWlyZSgnLi9idWlsZERvbUVscy5qcycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwbGF5UmVzdWx0cyhyZXN1bHRzQXJyLCB0aGVTZWFyY2gpIHtcblx0XG5cdHZhciB0b3RhbFJlc3VsdHMgPSBcIlwiO1xuXHQvLyBpZiBtYXhOdW1SZXN1bHRzIC0gdG90YWxSZXN1bHRzIHdpbGwgYmUgZGlmZmVyZW50IGZyb20gdGhlU2VhcmNoLm51bU9mUmVzdWx0c1xuXHRpZiAodGhlU2VhcmNoLmxpbWl0TnVtKSB7XG5cdFx0dG90YWxSZXN1bHRzID0gMzAwO1xuXHR9IGVsc2Uge1xuXHRcdHRvdGFsUmVzdWx0cyA9IHRoZVNlYXJjaC5udW1PZlJlc3VsdHM7XG5cdH1cblxuXHRcdFxuXHR2YXIgc3VtbWFyaXplRGF0ZVJhbmdlID0gXCJcIjtcblx0aWYgKHRoZVNlYXJjaC5kYXRlcmFuZ2UpIHsgXG5cdFx0Ly8gZm9ybWF0IHRoZSBzdGFydCBhbmQgZW5kIGRhdGVzIGZvciByZWFkaW5nIGJhY2sgd2l0aCByZXZlcnNlRGF0ZVN0cmluZygpXG5cdFx0dmFyIGpzU3RhcnREYXRlID0gdGhlU2VhcmNoLnN0YXJ0ZGF0ZTtcblx0XHR2YXIgdXNlclN0YXJ0RGF0ZSA9IHJldmVyc2VEYXRlU3RyaW5nKGpzU3RhcnREYXRlKTtcblx0XHR2YXIganNFbmREYXRlID0gdGhlU2VhcmNoLmVuZGRhdGU7XG5cdFx0dmFyIHVzZXJFbmR0RGF0ZSA9IHJldmVyc2VEYXRlU3RyaW5nKGpzRW5kRGF0ZSk7XG5cdFx0c3VtbWFyaXplRGF0ZVJhbmdlID0gXCIgZnJvbSBcIiArIHVzZXJTdGFydERhdGUgKyBcIiB0byBcIiArIHVzZXJFbmR0RGF0ZTtcblx0fVxuXG5cdHZhciBoYXNNYXhOdW1iZXIgPSBcIlwiO1xuXHRpZiAodGhlU2VhcmNoLmxpbWl0TnVtKSB7XG5cdFx0aGFzTWF4TnVtYmVyID0gdGhlU2VhcmNoLmxpbWl0TnVtO1xuXHR9IFxuXG5cdHZhciBjaG9zZW5Nb250aCA9IFwiXCI7XG5cdGlmICh0aGVTZWFyY2guYnltb250aCkge1xuXHRcdGlmICh0aGVTZWFyY2guYnltb250aCA9PT0gXCIxXCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gSmFudWFyeS4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjJcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBGZWJ1YXJ5LiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiM1wiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIE1hcmNoLiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiNFwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIEFwcmlsLiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiNVwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIE1heS4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjZcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBKdW5lLiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiN1wiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIEp1bHkuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCI4XCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gQXVndXN0LiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiOVwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIFNlcHRlbWJlci4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjEwXCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gT2N0b2Jlci4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjExXCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gTm92ZW1iZXIuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCIxMlwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIERlY2VtYmVyLiBcIjtcblx0XHR9XG5cdH1cblxuXHR0aGVTZWFyY2gubG9jID0gbG9jYXRpb25Jbml0aWFsc1RvTmFtZSh0aGVTZWFyY2gubG9jKTtcblxuXHR2YXIgcmVhZEJhY2tSZXN1bHRzID0gXCI8Yj5cIiArIHRoZVNlYXJjaC5udW1PZlJlc3VsdHMgKyBcIiByZWNvcmRzIGZvciBcIiArIHRoZVNlYXJjaC5zcGVjaWVzICsgXCIgYXQgXCIgKyB0aGVTZWFyY2gubG9jICsgXCIsIFwiICtzdW1tYXJpemVEYXRlUmFuZ2UgKyBcIiBcIiArIGNob3Nlbk1vbnRoICsgXCIgXCIgKyBoYXNNYXhOdW1iZXIgKyBcIjwvYj5cIjtcblxuXHQkKHJlYWRCYWNrUmVzdWx0cykuYXBwZW5kVG8oZWxzLnNlYXJjaFN1bW1hcnkpO1x0XHRcblxuXHRidWlsZERvbUVscyh0b3RhbFJlc3VsdHMsIHJlc3VsdHNBcnIpO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgZWxzLm92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTsgfSwgNTAwKTtcbn07IiwiLy8gdXRpbHNcbnZhciBlbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2Vscy5qcycpO1xudmFyIGVtcHR5TGlzdCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZW1wdHlMaXN0LmpzJyk7XG52YXIgdGhlU2VhcmNoID0gcmVxdWlyZSgnLi8uLi91dGlscy90aGVTZWFyY2guanMnKTtcblxuXG4vLyBzZWFyY2hcbnZhciBkYXRlUmFuZ2UgPSByZXF1aXJlKCcuLy4uL3NlYXJjaC9kYXRlUmFuZ2UuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZW5lcmF0ZVF1ZXJ5KHJlc3VsdHMpIHtcblxuXHRlbXB0eUxpc3QoKTtcblxuXHQvLyBjbGVhciBhcnJpdmFsIGFuZCBkZXBhcnR1cmVzIHJhZGlvIGlucHV0c1xuXHQkKFwiLmFycml2ZS1kZXBhcnRcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuXHR2YXIgbGVuID0gcmVzdWx0cy5kYXRhLmxlbmd0aCAtIDE7XHRcdFx0XG5cdHZhciBpbmRleCA9IDA7XG5cdHZhciByZXN1bHRzQXJyID0gW107XG5cdHZhciBsb2NhdGlvblNlYXJjaCA9ICQoJyNsb2NhdGlvblNlYXJjaCcpLnZhbCgpO1xuXHR2YXIgc3BlY2llc1NlYXJjaCA9ICQoJy5zcGVjaWVzU2VhcmNoJykuc2VsZWN0aXZpdHkoJ3ZhbHVlJyk7XG5cdC8vIHZhciB0aGVTZWFyY2ggPSB7fTtcblxuXG5cdGlmICghc3BlY2llc1NlYXJjaCAmJiAhbG9jYXRpb25TZWFyY2gpIHtcblxuXHRcdGZvciAodmFyIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbGVuOyBjb3VudGVyKyspIHtcblx0XHRcdHJlc3VsdHNBcnIucHVzaChyZXN1bHRzLmRhdGFbY291bnRlcl0pO1xuXHRcdFx0aW5kZXgrKzsgXG5cdFx0fVxuXHRcdFx0XHRcdFxuXHRcdHRoZVNlYXJjaC5zcGVjaWVzID0gXCJhbGwgc3BlY2llc1wiO1xuXHRcdHRoZVNlYXJjaC5sb2MgPSBcImFsbCBsb2NhdGlvbnNcIjtcblx0XHRcblx0fSBcdGVsc2UgaWYgKHNwZWNpZXNTZWFyY2ggJiYgbG9jYXRpb25TZWFyY2gpIHtcblxuXHRcdFx0Zm9yICh2YXIgaW5kID0gMDsgaW5kIDwgbGVuOyBpbmQrKykge1x0XHRcdFx0XG5cdFx0XHRcdGlmIChyZXN1bHRzLmRhdGFbaW5kXS5zcGVjaWVzID09PSBzZWFyY2ggJiYgcmVzdWx0cy5kYXRhW2luZF0ubG9jYXRpb24gPT09IGxvY2F0aW9uU2VhcmNoKSB7XG5cdFx0XHRcdFx0cmVzdWx0c0Fyci5wdXNoKHJlc3VsdHMuZGF0YVtpbmRdKTtcblx0XHRcdFx0XHRpbmRleCsrOyBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdHRoZVNlYXJjaC5zcGVjaWVzID0gc3BlY2llc1NlYXJjaDtcblx0XHRcdHRoZVNlYXJjaC5sb2MgPSBsb2NhdGlvblNlYXJjaDtcblx0XHRcdFxuXHR9XHRlbHNlIGlmIChzcGVjaWVzU2VhcmNoKSB7XG5cdFx0XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHRcdFx0XHRcblx0XHRcdFx0aWYgKHJlc3VsdHMuZGF0YVtpXS5zcGVjaWVzID09PSBzZWFyY2gpIHtcblx0XHRcdFx0XHRyZXN1bHRzQXJyLnB1c2gocmVzdWx0cy5kYXRhW2ldKTtcblx0XHRcdFx0XHRpbmRleCsrOyBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdHRoZVNlYXJjaC5zcGVjaWVzID0gc3BlY2llc1NlYXJjaDtcblx0XHRcdHRoZVNlYXJjaC5sb2MgPSBcImFsbCBsb2NhdGlvbnNcIjtcblx0XHRcdFxuXG5cdH1cdGVsc2UgaWYgKGxvY2F0aW9uU2VhcmNoKSB7XG5cblx0XHRcdGZvciAodmFyIGNvdW50ID0gMDsgY291bnQgPCBsZW47IGNvdW50KyspIHtcdFx0XHRcdFxuXHRcdFx0XHRpZiAocmVzdWx0cy5kYXRhW2NvdW50XS5sb2NhdGlvbiA9PT0gbG9jYXRpb25TZWFyY2gpIHtcblx0XHRcdFx0XHRyZXN1bHRzQXJyLnB1c2gocmVzdWx0cy5kYXRhW2NvdW50XSk7XG5cdFx0XHRcdFx0aW5kZXgrKzsgXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHR0aGVTZWFyY2guc3BlY2llcyA9IFwiYWxsIHNwZWNpZXNcIjtcblx0XHRcdHRoZVNlYXJjaC5sb2MgPSBsb2NhdGlvblNlYXJjaDtcdFx0XHRcdFxuXHR9XG5cblx0dGhlU2VhcmNoLm51bU9mUmVzdWx0cyA9IGluZGV4O1xuXHRkYXRlUmFuZ2UocmVzdWx0c0FyciwgdGhlU2VhcmNoKTtcblxufTtcblxuXG4iLCIvLyB1dGlsc1xudmFyIGxvY2F0aW9uSW5pdGlhbHNUb05hbWUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2xvY2F0aW9uSW5pdGlhbHNUb05hbWUuanMnKTtcbnZhciBlbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2Vscy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRm9ybUVscyAocmVzdWx0cykge1xuXG5cdHZhciBsb2NhdGlvbkFycmF5ID0gW107XG5cdHZhciBzcGVjaWVzQXJyYXkgPSBbXTtcblx0dmFyIGwgPSByZXN1bHRzLmRhdGEubGVuZ3RoIC0gMTtcdFx0XG5cblx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGw7IGluZGV4KyspIHtcdFx0XG5cdFx0dmFyIGN1cnJlbnRMb2NhdGlvbiA9IHJlc3VsdHMuZGF0YVtpbmRleF0ubG9jYXRpb247XG5cdFx0dmFyIGN1cnJlbnRTcGVjaWVzID0gcmVzdWx0cy5kYXRhW2luZGV4XS5zcGVjaWVzO1xuXG5cdFx0aWYgKCQuaW5BcnJheShjdXJyZW50TG9jYXRpb24sIGxvY2F0aW9uQXJyYXkpID09PSAtMSl7XG5cdFx0XHRsb2NhdGlvbkFycmF5LnB1c2goY3VycmVudExvY2F0aW9uKTtcblx0XHR9XHRcblxuXHRcdGlmICgkLmluQXJyYXkoY3VycmVudFNwZWNpZXMsIHNwZWNpZXNBcnJheSkgPT09IC0xKXtcblx0XHRcdHNwZWNpZXNBcnJheS5wdXNoKGN1cnJlbnRTcGVjaWVzKTtcblx0XHR9XG5cblx0XHR2YXIgZGF5ID0gcmVzdWx0cy5kYXRhW2luZGV4XS5kYXksXG5cdFx0XHRtb250aCA9IHJlc3VsdHMuZGF0YVtpbmRleF0ubW9udGgsXG5cdFx0XHR5ZWFyID0gcmVzdWx0cy5kYXRhW2luZGV4XS55ZWFyO1xuXG5cdFx0XHRpZiAoZGF5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRkYXkgPSBcIjBcIiArIGRheTtcblx0XHRcdH1cblx0XHRcdGlmIChtb250aC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0bW9udGggPSBcIjBcIiArIG1vbnRoO1xuXHRcdFx0fVxuXHRcdFx0XHRcblx0XHRyZXN1bHRzLmRhdGFbaW5kZXhdLmZvcm1hdHRlZF9kYXRlID0geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGRheTsgIC8vIGZvcm1hdCB5eXl5IG0gZFx0XHRcdFx0XHRcblx0fVx0XG5cblxuXHRsb2NhdGlvbkFycmF5LnNvcnQoKTtcdFxuXHR2YXIgY29udmVydGVkTG9jTmFtZSA9IFwiXCI7XHRcblx0Ly8gYnVpbGQgb3B0aW9uIHRhZ3MgLSBhcHBlbmRUbyBsaXN0XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnZlcnRlZExvY05hbWUgPSBsb2NhdGlvbkluaXRpYWxzVG9OYW1lKGxvY2F0aW9uQXJyYXlbaV0pO1xuXHRcdCQoJzxvcHRpb24gdmFsdWU9XCInICsgbG9jYXRpb25BcnJheVtpXSArICdcIj4nICsgY29udmVydGVkTG9jTmFtZSArICc8L29wdGlvbj4nKS5hcHBlbmRUbyhlbHMubG9jTGlzdCk7XG5cdH1cblxuXHRzcGVjaWVzQXJyYXkuc29ydCgpO1xuXHQvLyBwYXNzIHRvIHNlbGVjdGl2aXR5IHBsdWdpbiBcblx0JChcIi5zcGVjaWVzU2VhcmNoXCIpLnNlbGVjdGl2aXR5KHtcblx0ICAgIGFsbG93Q2xlYXI6IHRydWUsXG5cdCAgICBpdGVtczogc3BlY2llc0FycmF5LFxuXHQgICAgcGxhY2Vob2xkZXI6ICdObyBzcGVjaWVzIHNlbGVjdGVkJ1xuXHR9KTtcdFxuXG5cdGVscy5vdmVybGF5LnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdFxufTtcblxuIiwiLy8gdXRpbHNcbnZhciBsb2NhdGlvbkluaXRpYWxzVG9OYW1lID0gcmVxdWlyZSgnLi8uLi91dGlscy9sb2NhdGlvbkluaXRpYWxzVG9OYW1lLmpzJyk7XG52YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciBlbXB0eUxpc3QgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2VtcHR5TGlzdC5qcycpO1xudmFyIHRoZVNlYXJjaCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvdGhlU2VhcmNoLmpzJyk7XG5cbi8vIHNlYXJjaFxudmFyIGdlbmVyYXRlUXVlcnkgPSByZXF1aXJlKCcuLy4uL3NlYXJjaC9nZW5lcmF0ZVF1ZXJ5LmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRVcEV2ZW50cyhyZXN1bHRzKSB7XG5cblx0dmFyIGFkZExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKCl7XG5cdCAgdmFyIGQgPSAkLkRlZmVycmVkKCk7XG5cdCAgICBlbHMub3ZlcmxheS5hZGRDbGFzcygnbG9hZGluZycpO1xuXHQgICAgZC5yZXNvbHZlKCk7XG5cdCAgXHRyZXR1cm4gZC5wcm9taXNlKCk7XG5cdH07XG5cblxuXHR2YXIgZmlyZUdlblEgPSBmdW5jdGlvbigpe1xuXHQgIHZhciBkID0gJC5EZWZlcnJlZCgpO1xuXHQgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdCAgICBnZW5lcmF0ZVF1ZXJ5KHJlc3VsdHMsIHRoZVNlYXJjaCk7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICB9LCAxMDApO1xuXHQgIHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcblxuXHQvLyBFVkVOVFNcblx0Ly8gY2xlYXIgcmVzdWx0cyBtYW5hdWxseVxuXHQkKFwiLnNwZWNpZXNTZWFyY2hcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1x0XG5cdFx0c2VhcmNoID0gJCgnLnNwZWNpZXNTZWFyY2gnKS5zZWxlY3Rpdml0eSgndmFsdWUnKTtcblx0XHRcblx0XHRpZiAoIXNlYXJjaCkge1xuXHRcdFx0Ly8gY2hhbmdlIHRvIHJlc2V0QWxsKClcblx0XHRcdGVtcHR5TGlzdCgpO1xuXG5cdFx0XHRlbHMuc3BlY2llc0g0Lmh0bWwoXCJcIik7XG5cdFx0XHRlbHMucmFkaW9JbnB1dHMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHRcdGlmICh3aW5kb3cubXlCYXIpIHtcblx0XHRcdFx0bXlCYXIuY2xlYXIoKTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbHMuc3BlY2llc0g0Lmh0bWwoXCI6IFwiICsgc2VhcmNoKTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQkKCcjc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1x0XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGFkZExvYWRpbmdDbGFzcygpLnBpcGUoZmlyZUdlblEpO1xuXHR9KTtcblxufTtcblxuIiwidmFyIGVscyA9IHtcblx0b3ZlcmxheSA6ICQoJy5vdmVybGF5JyksXG5cdHNlYXJjaCA6IFwiXCIsXG5cdGxvY0xpc3QgOiAkKCcjbG9jYXRpb25TZWFyY2gnKSxcblx0cmVzdWx0c0xpc3QgOiAkKCcjcmVzdWx0cycpLFxuXHRyZXN1bHRzTGlzdF8yIDogJCgnI3Jlc3VsdHNfMicpLFxuXHRzZWFyY2hTdW1tYXJ5IDogJCgnI3NlYXJjaC1zdW1tYXJ5JyksXG5cdHJhZGlvSW5wdXRzIDogJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyksXG5cdHNwZWNpZXNINCA6ICQoJyNzcC1uYW1lJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZWxzOyIsInZhciBlbHMgPSByZXF1aXJlKCcuL2Vscy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtcHR5TGlzdCgpIHtcblxuXHRlbHMucmVzdWx0c0xpc3QuZmluZCgndGJvZHkgdGQnKS5yZW1vdmUoKTtcdFx0XG5cdGVscy5zZWFyY2hTdW1tYXJ5Lmh0bWwoJ1Jlc3VsdHM6ICcpO1xuXHQkKCcuc29ydC1pY29uJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRlbHMucmVzdWx0c0xpc3RfMi5maW5kKCd0Ym9keSB0ZCcpLnJlbW92ZSgpO1xuXG59OyIsInZhciBlbHMgPSByZXF1aXJlKCcuL2Vscy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZURhdGVGdW4oKSB7XG5cdGFsZXJ0KCdJbnZhbGlkIGRhdGUgcmFuZ2UuJyk7XG5cdGVscy5vdmVybGF5LnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG5cdHJldHVybiBmYWxzZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2NhdGlvbkluaXRpYWxzVG9OYW1lKGxvY2F0aW9uSW5pdGlhbHMpIHtcblx0aWYgKGxvY2F0aW9uSW5pdGlhbHMgPT09IFwiQlNcIikge1xuXHRcdGxvY2F0aW9uSW5pdGlhbHMgPSBcIkJsYWNrIFN3YW4gTGFrZVwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJEUFwiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiRGludG9uIFBhc3R1cmVzXCI7XG5cdFx0cmV0dXJuIGxvY2F0aW9uSW5pdGlhbHM7XG5cblx0fSBlbHNlIGlmKGxvY2F0aW9uSW5pdGlhbHMgPT09IFwiTEZcIikge1xuXHRcdGxvY2F0aW9uSW5pdGlhbHMgPSBcIkxlYSBGYXJtIExha2VcIjtcblx0XHRyZXR1cm4gbG9jYXRpb25Jbml0aWFscztcblxuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJMTFwiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiTGF2ZWxsJ3MgTGFrZVwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIk1NXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJNaWRkbGUgTWFyc2hcIjtcblx0XHRyZXR1cm4gbG9jYXRpb25Jbml0aWFscztcblxuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJNT1wiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiTW9ydGltZXIncyBNZWFkb3dcIjtcblx0XHRyZXR1cm4gbG9jYXRpb25Jbml0aWFscztcblxuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJTQVwiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiU2FuZGZvcmQgTGFrZVwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIldTXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJXaGl0ZSBTd2FuIExha2VcIjtcblx0XHRyZXR1cm4gbG9jYXRpb25Jbml0aWFscztcblx0fSBlbHNlIGlmKGxvY2F0aW9uSW5pdGlhbHMgPT09IFwiYWxsIGxvY2F0aW9uc1wiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiYWxsIGxvY2F0aW9uc1wiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXHR9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXhOdW1SZXN1bHRzKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCkge1xuXHQvLyB0aGlzIGlzIHdoZXJlIGxhenlsYWRpbmcgb3IgcGFnaW5hdGlvbiBzaG91bGQgaGFwcGVuXG5cdGlmICh0aGVTZWFyY2gubnVtT2ZSZXN1bHRzID4gMjAwMCkge1xuXHRcdHRoZVNlYXJjaC5saW1pdE51bSA9IFwiRGlzcGxheWluZyB0aGUgbW9zdCByZWNlbnQgMjAwMCByZWNvcmRzLlwiO1x0XHRcblx0XHRyZXN1bHRzQXJyID0gcmVzdWx0c0Fyci5zbGljZSgwLCAyMDAwKTtcblx0fSBcdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJldmVyc2VEYXRlU3RyaW5nKGRhdGVTdHJpbmcpIHtcblx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcuc3BsaXQoJy0nKTtcdFx0XG5cdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nWzJdICsgXCItXCIgKyBkYXRlU3RyaW5nWzFdICsgXCItXCIgKyBkYXRlU3RyaW5nWzBdO1xuXHRyZXR1cm4gZGF0ZVN0cmluZztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzb3J0QnlEYXRlKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCkge1xuXHRyZXN1bHRzQXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG5cdCBcdHZhciBkYXRlQSA9IG5ldyBEYXRlKGEuZm9ybWF0dGVkX2RhdGUpLCBcblx0IFx0XHRkYXRlQiA9IG5ldyBEYXRlKGIuZm9ybWF0dGVkX2RhdGUpO1xuXHQgXHRyZXR1cm4gZGF0ZUIgLSBkYXRlQTsgLy9zb3J0IGJ5IGRhdGUgZGVjZW5kaW5nXG5cdH0pO1xufTtcbiIsInZhciB0aGVTZWFyY2ggPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB0aGVTZWFyY2g7Il19
