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

	// siteUrl: "http://localhost:3000/foll",	
	// siteUrl: "http://foll.jayontraps.com",	
	siteUrl: "http://foll.org.uk",	
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAvc3JjL2Fycml2ZURlcGFydC9hcnJpdmFsQW5kRGVwYXJ0dXJlLmpzIiwianMvYXBwL3NyYy9hcnJpdmVEZXBhcnQvYXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyLmpzIiwianMvYXBwL3NyYy9hcnJpdmVEZXBhcnQvZGF0ZV9zb3J0X2FzYy5qcyIsImpzL2FwcC9zcmMvZW50cnkuanMiLCJqcy9hcHAvc3JjL2hpc3RvZ3JhbS9zZXRVcEdyYXBoLmpzIiwianMvYXBwL3NyYy9oaXN0b2dyYW0vdmFsaWRhdGVHcmFwaFNlYXJjaC5qcyIsImpzL2FwcC9zcmMvc2VhcmNoL2J1aWxkRG9tRWxzLmpzIiwianMvYXBwL3NyYy9zZWFyY2gvZGF0ZVJhbmdlLmpzIiwianMvYXBwL3NyYy9zZWFyY2gvZGlzcGxheVJlc3VsdHMuanMiLCJqcy9hcHAvc3JjL3NlYXJjaC9nZW5lcmF0ZVF1ZXJ5LmpzIiwianMvYXBwL3NyYy9zZXR1cC9idWlsZEZvcm1FbHMuanMiLCJqcy9hcHAvc3JjL3NldHVwL3NldFVwRXZlbnRzLmpzIiwianMvYXBwL3NyYy91dGlscy9lbHMuanMiLCJqcy9hcHAvc3JjL3V0aWxzL2VtcHR5TGlzdC5qcyIsImpzL2FwcC9zcmMvdXRpbHMvZXNjYXBlRGF0ZUZ1bi5qcyIsImpzL2FwcC9zcmMvdXRpbHMvbG9jYXRpb25Jbml0aWFsc1RvTmFtZS5qcyIsImpzL2FwcC9zcmMvdXRpbHMvbWF4TnVtUmVzdWx0cy5qcyIsImpzL2FwcC9zcmMvdXRpbHMvcmV2ZXJzZURhdGVTdHJpbmcuanMiLCJqcy9hcHAvc3JjL3V0aWxzL3NvcnRCeURhdGUuanMiLCJqcy9hcHAvc3JjL3V0aWxzL3RoZVNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciBzb3J0QnlEYXRlID0gcmVxdWlyZSgnLi8uLi91dGlscy9zb3J0QnlEYXRlLmpzJyk7XG52YXIgZW1wdHlMaXN0ID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbXB0eUxpc3QuanMnKTtcbnZhciBsb2NhdGlvbkluaXRpYWxzVG9OYW1lID0gcmVxdWlyZSgnLi8uLi91dGlscy9sb2NhdGlvbkluaXRpYWxzVG9OYW1lLmpzJyk7XG52YXIgZGF0ZV9zb3J0X2FzYyA9IHJlcXVpcmUoJy4vZGF0ZV9zb3J0X2FzYy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycml2YWxBbmREZXBhcnR1cmUocmVzdWx0cywgdGhlUmFuZ2UsIHRoZVNlYXNvbikge1xuXG5cdGVtcHR5TGlzdCgpO1xuXG5cdHZhciBsZW5ndGggPSByZXN1bHRzLmRhdGEubGVuZ3RoIC0gMTtcdFxuXHR2YXIgc3BlY2llc05hbWUgPSAkKCcuc3BlY2llc1NlYXJjaCcpLnNlbGVjdGl2aXR5KCd2YWx1ZScpO1xuXHR2YXIgcmVzdWx0c0FyciA9IFtdO1xuXHR2YXIgZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2FyciA9IFtdO1xuXHR2YXIgbGF0ZXN0X2RhdGVfd2l0aGluX2VhY2hfeWVhcl9hcnIgPSBbXTtcblx0dmFyIGVhcmxpZXN0X2RhdGVfd2l0aGluX3NlY29uZF9oYWxmX2FyciA9IFtdO1xuXHR2YXIgbGF0ZXN0X2RhdGVfd2l0aGluX2ZpcnN0X2hhbGZfYXJyID0gW107XG5cdHZhciB0aGVPYmogPSB7fTtcdFxuXHR2YXIgeWVhckFycmF5ID0gW107XG5cdHZhciBmaW5hbEFyciA9IFtdO1xuXHR2YXIgaTtcblx0dmFyIGNvbnZlcnRlZExvY05hbWUgPSBcIlwiO1xuXHR2YXIgYXJyTGVuZ3RoLCBcblx0XHRhc0RhdGVPYmpfMSxcblx0XHRhc0RhdGVPYmpfMixcblx0XHRmaW5hbEFyckxlbixcblx0XHRpbmMsXG5cdFx0bmV3Um93cyxcblx0XHRjb3VudGVyO1xuXG5cdC8vIFNVTU1FUiAvIFdJTlRFUiBzcGxpY2luZ1xuXHR2YXIgYXJyQnlTZWFzb24gPSBbXSxcblx0XHRtb250aEFzTnVtLFxuXHRcdGQ7XHRcblxuXHR2YXIgZm9vOyBcdFx0XG5cblxuXG5cdC8vIHBvcHVsYXRlIHJlc3VsdHNBcnJcblx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHRcdFx0XHRcblx0XHRpZiAocmVzdWx0cy5kYXRhW2ldLnNwZWNpZXMgPT09IHNlYXJjaCkge1xuXHRcdFx0cmVzdWx0c0Fyci5wdXNoKHJlc3VsdHMuZGF0YVtpXSk7XHRcdFx0XHRcdFxuXHRcdH1cblx0fVx0XG5cblx0dmFyIGwgPSByZXN1bHRzQXJyLmxlbmd0aDtcblxuXHQvLyBjcmVhdGUgYXJyYXkgb2YgdGhlIHllYXJzIGZvdW5kIHdpdGhpbiByZXN1bHRzXG5cdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblxuXHRcdHZhciBjdXJyZW50WWVhciA9IHJlc3VsdHNBcnJbaV0ueWVhcjtcblxuXHRcdC8vIGlmIG5vdCBhbHJlYWR5IGluIHRoZSB5ZWFyIGFycmF5IHRoZW4gcHVzaCBpdCAtIGF2b2lkIGR1cGxpY2F0aW9uXG5cdFx0aWYgKCQuaW5BcnJheShjdXJyZW50WWVhciwgeWVhckFycmF5KSA9PT0gLTEpe1xuXHRcdFx0eWVhckFycmF5LnB1c2goY3VycmVudFllYXIpO1xuXHRcdH1cdFxuXHR9XG5cblxuXG5cblx0Ly8gZ3JvdXAgYnkgeWVhciBpbiB0aGVPYmo6XG5cblx0Ly8gdGhlT2JqID0ge1xuXHQvLyBcdFwiMjAxMlwiIDoge1xuXHQvLyBcdFx0MCA6IG4sIC8vIG4gPSBtb21lbnQuanMgZGF0ZSBvYmplY3Rcblx0Ly8gXHRcdDEgOiBuLFxuXHQvLyBcdFx0ZXRjLi5cblx0Ly8gXHR9LFxuXHQvLyAgXCIyMDE0XCIgOiB7XG5cdC8vIFx0XHQwIDogbixcblx0Ly8gXHRcdGV0Yy4uLlxuXHQvLyBcdH1cblx0Ly8gfVxuXG5cdC8vIE1BSU4gTE9PUCBTRVRUSU5HIFVQIFRIRSBBUlJBWVMgQU5EIFJFRkVSRU5DRSBPQkpFQ1Rcblx0Zm9yICh2YXIgYyA9IDA7IGMgPCB5ZWFyQXJyYXkubGVuZ3RoOyBjKyspIHtcblxuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dID0ge307XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0ubW9udGhBcnIgPSBbXTtcblx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5kYXlBcnIgPSBbXTtcblx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0FyciA9IFtdO1xuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLm9yZGVyZWREYXRlcyA9IFtdO1xuXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmVhcmxpZXN0RGF0ZSA9IFwiXCI7XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0ubGF0ZXN0RGF0ZSA9IFwiXCI7XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uZmlyc3RIYWxmID0gW107XG5cdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uc2Vjb25kSGFsZiA9IFtdO1xuXG5cblx0XHRmb3IgKHZhciBpbmQgPSAwOyBpbmQgPCBsOyBpbmQrKykge1xuXHRcdFx0aWYgKHJlc3VsdHNBcnJbaW5kXS55ZWFyID09PSB5ZWFyQXJyYXlbY10pIHtcblx0XHRcdFx0Ly8gZm9ybWF0IGFuZCBwdXNoIGRhdGVzXG5cdFx0XHRcdC8vIHZhciBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHJlc3VsdHNBcnJbaW5kXS5mb3JtYXR0ZWRfZGF0ZSk7XG5cdFx0XHRcdHZhciBjdXJyZW50RGF0ZSA9IG1vbWVudChyZXN1bHRzQXJyW2luZF0uZm9ybWF0dGVkX2RhdGUpO1xuXG5cdFx0XHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmRhdGVzQXJyLnB1c2goY3VycmVudERhdGUpO1x0XG5cblxuXHRcdFx0XHQvLyBnZW5lcmF0ZSBhcnJheSBvZiByZXN1bHRzIHdpdGhpbiBtb250aHMgMSAtIDYgXG5cdFx0XHRcdGlmIChjdXJyZW50RGF0ZS5pc0JlZm9yZSh5ZWFyQXJyYXlbY10gKyAnLTA2LTMwJykpIHtcblx0XHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5maXJzdEhhbGYucHVzaChjdXJyZW50RGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBnZW5lcmF0ZSBhcnJheSBvZiByZXN1bHRzIHdpdGhpbiBtb250aHMgNyAtIDEyIFxuXHRcdFx0XHRpZiAoY3VycmVudERhdGUuaXNBZnRlcih5ZWFyQXJyYXlbY10gKyAnLTA2LTMwJykpIHtcblx0XHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmLnB1c2goY3VycmVudERhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc29ydCB0aGUgYXJyYXlzIGFzY2VuZGluZ1xuXHQgICAgXHRcdHRoZU9ialt5ZWFyQXJyYXlbY11dLmZpcnN0SGFsZi5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRcdFx0XHR0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmLnNvcnQoZGF0ZV9zb3J0X2FzYyk7XG5cdCAgICBcdFx0dGhlT2JqW3llYXJBcnJheVtjXV0uZGF0ZXNBcnIuc29ydChkYXRlX3NvcnRfYXNjKTtcblx0XHRcdH1cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHR9XHRcblxuXG5cblx0XHQvLyBlYXJsaWVzdCBhbmQgbGF0ZXN0IGRhdGVzIGFjcm9zcyB0aGUgeWVhclxuXHRcdHZhciBhcnJMZW4gPSB0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0Fyci5sZW5ndGg7XG5cdFx0Ly8gZ2V0IGVhcmxpZXN0ID0+IFswXVxuXHRcdHZhciBlYXJsaWVzdERhdGUgPSB0aGVPYmpbeWVhckFycmF5W2NdXS5kYXRlc0FyclswXTtcblx0XHQvLyBnZXQgbGF0ZXN0ID0+IFthcnJMZW4gLTFdIC0xIGJlY2F1c2Ugb2YgemVybyBpbmRleFxuXHRcdHZhciBsYXRlc3REYXRlID0gdGhlT2JqW3llYXJBcnJheVtjXV0uZGF0ZXNBcnJbYXJyTGVuIC0gMV07XG5cblx0XHRlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyLnB1c2goZWFybGllc3REYXRlKTtcblx0XHRsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5wdXNoKGxhdGVzdERhdGUpO1xuXG5cblxuXG5cdFx0Ly8gZWFybGllc3QgZGF0ZSBhY3Jvc3MgdGhlIG1vbnRocyA3IC0gMTIgKHdpbnRlciAvIGVhcmxpZXN0KVxuXHRcdGFyckxlbiA9IHRoZU9ialt5ZWFyQXJyYXlbY11dLnNlY29uZEhhbGYubGVuZ3RoO1xuXHRcdC8vIGdldCBlYXJsaWVzdCA9PiBbMF1cblx0XHRlYXJsaWVzdERhdGUgPSB0aGVPYmpbeWVhckFycmF5W2NdXS5zZWNvbmRIYWxmWzBdO1xuXG5cdFx0ZWFybGllc3RfZGF0ZV93aXRoaW5fc2Vjb25kX2hhbGZfYXJyLnB1c2goZWFybGllc3REYXRlKTtcblxuXG5cblxuXHRcdC8vIGxhdGVzdCBkYXRlIGFjcm9zcyBtb250aCAxIC0gNiAod2ludGVyIC8gbGF0ZXN0KVxuXHRcdGFyckxlbiA9IHRoZU9ialt5ZWFyQXJyYXlbY11dLmZpcnN0SGFsZi5sZW5ndGg7XG5cdFx0Ly8gZ2V0IGxhdGVzdCA9PiBbYXJyTGVuIC0xXSAtMSBiZWNhdXNlIG9mIHplcm8gaW5kZXhcblx0XHRsYXRlc3REYXRlID0gdGhlT2JqW3llYXJBcnJheVtjXV0uZmlyc3RIYWxmW2FyckxlbiAtIDFdO1x0XHRcblxuXHRcdGxhdGVzdF9kYXRlX3dpdGhpbl9maXJzdF9oYWxmX2Fyci5wdXNoKGxhdGVzdERhdGUpO1xuXG5cblx0XHRcblx0fVxuXG5cdC8vIHNvcnQgYWxsIGFycmF5cyBhc2NlbmRpbmdcblx0ZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fyci5zb3J0KGRhdGVfc29ydF9hc2MpO1xuXHRlYXJsaWVzdF9kYXRlX3dpdGhpbl9zZWNvbmRfaGFsZl9hcnIuc29ydChkYXRlX3NvcnRfYXNjKTtcblx0bGF0ZXN0X2RhdGVfd2l0aGluX2ZpcnN0X2hhbGZfYXJyLnNvcnQoZGF0ZV9zb3J0X2FzYyk7XG5cblxuXG5cdC8vIENPTlNPTEUgUkVTVUxUU1xuXHQvLyB0aGVPYmpbdGhlIHllYXJdLmRhdGVzQXJyID0gYXJyYXkgb2YgbW9tZW50LmpzIGRhdGUgb2JqZWN0cyBzb3J0ZWQgYXNjZW5kaW5nXG5cdC8vIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cdC8vIC8vIGFycmF5IG9mIGVhcmxpZXN0IGRhdGVzIHdpdGhpbiB0aGUgeWVhciwgZm9yIGVhY2ggeWVhciByZWNvcmRlZFxuXHQvLyBjb25zb2xlLmxvZyhlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyKTtcblx0Ly8gLy8gYXJyYXkgb2YgbGF0ZXN0IGRhdGVzIHdpdGhpbiB0aGUgeWVhciwgZm9yIGVhY2ggeWVhciByZWNvcmRlZFxuXHQvLyBjb25zb2xlLmxvZyhsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycik7XG5cblx0Ly8gY29uc29sZS5sb2coZWFybGllc3RfZGF0ZV93aXRoaW5fc2Vjb25kX2hhbGZfYXJyKTtcblxuXHQvLyBjb25zb2xlLmxvZyhsYXRlc3RfZGF0ZV93aXRoaW5fZmlyc3RfaGFsZl9hcnIpO1xuXG5cdFx0XHRcdFx0XHRcdFxuXG5cblx0aWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJlYXJsaWVzdFwiKSB7XG5cdFx0Zm9vID0gZWFybGllc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0XHRmb28gPSBsYXRlc3RfZGF0ZV93aXRoaW5fZWFjaF95ZWFyX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIikge1xuXHRcdGZvbyA9IGVhcmxpZXN0X2RhdGVfd2l0aGluX3NlY29uZF9oYWxmX2Fycjtcblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0XHRmb28gPSBsYXRlc3RfZGF0ZV93aXRoaW5fZmlyc3RfaGFsZl9hcnI7XG5cdH1cblxuXG5cdC8vIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIiB8fCB0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIpIHtcblx0Ly8gXHRmb28gPSBlYXJsaWVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyO1xuXHQvLyB9IGVsc2UgaWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJsYXRlc3RcIiB8fCB0aGVTZWFzb24gPT09IFwid2ludGVyXCIgJiYgdGhlUmFuZ2UgPT09IFwiZWFybGllc3RcIikge1xuXHQvLyBcdGZvbyA9IGxhdGVzdF9kYXRlX3dpdGhpbl9lYWNoX3llYXJfYXJyO1xuXHQvLyB9XG5cblx0YXJyTGVuZ3RoID0gZm9vLmxlbmd0aDtcblx0XHRcdFxuXHRmb3IgKGluYyA9IDA7IGluYyA8IGFyckxlbmd0aDsgaW5jKyspIHtcblx0XHRcblx0XHRhc0RhdGVPYmpfMSA9IGZvb1tpbmNdO1xuXHRcdFxuXHRcdC8vIGxvb3AgdGhyb3VnaCByZXN1bHRzQXJyIG1hdGNoaW5nIGVhcmxpZXN0IGRhdGVzIGFuZCBwdXNoIHRvIGZpbmFsQXJyXG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cblx0XHRcdGFzRGF0ZU9ial8yID0gbW9tZW50KHJlc3VsdHNBcnJbaV0uZm9ybWF0dGVkX2RhdGUpO1xuXG5cdFx0XHRpZiAobW9tZW50KGFzRGF0ZU9ial8xKS5pc1NhbWUoYXNEYXRlT2JqXzIpKSB7XG5cblx0XHRcdFx0ZmluYWxBcnIucHVzaChyZXN1bHRzQXJyW2ldKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c29ydEJ5RGF0ZShmaW5hbEFycik7XHRcdFx0XG5cblx0aWYgKHRoZVNlYXNvbiA9PT0gXCJzdW1tZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJlYXJsaWVzdFwiIHx8IHRoZVNlYXNvbiA9PT0gXCJ3aW50ZXJcIiAmJiB0aGVSYW5nZSA9PT0gXCJsYXRlc3RcIikge1xuXG5cdFx0Zm9yIChkID0gMDsgZCA8IGZpbmFsQXJyLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRtb250aEFzTnVtID0gcGFyc2VJbnQoZmluYWxBcnJbZF0ubW9udGgpO1xuXHRcdFx0aWYgKG1vbnRoQXNOdW0gPD0gNikge1xuXHRcdFx0XHRhcnJCeVNlYXNvbi5wdXNoKGZpbmFsQXJyW2RdKTtcblx0XHRcdH1cblx0XHR9XG5cblx0fSBlbHNlIGlmICh0aGVTZWFzb24gPT09IFwic3VtbWVyXCIgJiYgdGhlUmFuZ2UgPT09IFwibGF0ZXN0XCIgfHwgdGhlU2Vhc29uID09PSBcIndpbnRlclwiICYmIHRoZVJhbmdlID09PSBcImVhcmxpZXN0XCIpIHtcblxuXHRcdGZvciAoZCA9IDA7IGQgPCBmaW5hbEFyci5sZW5ndGg7IGQrKykge1xuXHRcdFx0bW9udGhBc051bSA9IHBhcnNlSW50KGZpbmFsQXJyW2RdLm1vbnRoKTtcblx0XHRcdGlmIChtb250aEFzTnVtID4gNikge1xuXHRcdFx0XHRhcnJCeVNlYXNvbi5wdXNoKGZpbmFsQXJyW2RdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cdGZpbmFsQXJyTGVuID0gYXJyQnlTZWFzb24ubGVuZ3RoO1xuXG5cdG5ld1Jvd3MgPSAkKCc8c3Bhbi8+Jyk7XG5cblx0Zm9yIChjb3VudGVyID0gMDsgY291bnRlciA8IGZpbmFsQXJyTGVuOyBjb3VudGVyKyspIHtcblx0XHRjb252ZXJ0ZWRMb2NOYW1lID0gbG9jYXRpb25Jbml0aWFsc1RvTmFtZShhcnJCeVNlYXNvbltjb3VudGVyXS5sb2NhdGlvbik7XG5cdFx0JCgnPHRyLz4nLCB7XG5cdFx0XHRodG1sIDogJzx0ZCBjbGFzcz1cImRhdGVcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLmRhdGVfZnJvbSArICc8L3RkPiAnICArICc8dGQgY2xhc3M9XCJsb2NhdGlvblwiPicgXHRcdFx0XHRcdCArIGNvbnZlcnRlZExvY05hbWUgKyAnPC90ZD4gJyAgKyAnPHRkIGNsYXNzPVwiY291bnRcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLmNvdW50ICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwib2JzZXJ2ZXJcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLm9ic2VydmVyICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwibm90ZXNcIj4nICArIGFyckJ5U2Vhc29uW2NvdW50ZXJdLm5vdGVzICsgJzwvdGQ+J1xuXHRcdFx0fVx0XHRcdFx0XHRcdFxuXHRcdCkuYXBwZW5kVG8obmV3Um93cyk7XHRcdFx0XG5cdH1cblx0JChuZXdSb3dzLmh0bWwoKSkuYXBwZW5kVG8oZWxzLnJlc3VsdHNMaXN0XzIpO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgZWxzLm92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTsgfSwgMzAwKTtcblxuXHQvLyByZXNldCBcblx0ZmluYWxBcnJMZW4ubGVuZ3RoID0gMDtcblxufTsiLCJ2YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciBhcnJpdmFsQW5kRGVwYXJ0dXJlID0gcmVxdWlyZSgnLi9hcnJpdmFsQW5kRGVwYXJ0dXJlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyKHJlc3VsdHMpIHtcblxuXHR2YXIgbG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oKXtcblx0ICB2YXIgZCA9ICQuRGVmZXJyZWQoKTtcblx0ICAgIGVscy5vdmVybGF5LmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICBcdHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcblxuXG5cdHZhciBmaXJlUmVzID0gZnVuY3Rpb24odGhlUmFuZ2UsIHRoZVNlYXNvbil7XG5cdCAgdmFyIGQgPSAkLkRlZmVycmVkKCk7XG5cdCAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgIGFycml2YWxBbmREZXBhcnR1cmUocmVzdWx0cywgdGhlUmFuZ2UsIHRoZVNlYXNvbik7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICB9LCAxMDApO1xuXHQgIHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcdFxuXG5cblx0JCgnI3N1Ym1pdF8yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0dmFyIHRoZVJhbmdlID0gJCgnLmFycml2ZS1kZXBhcnQ6Y2hlY2tlZCcpLnZhbCgpO1xuXHRcdHZhciB0aGVTZWFzb24gPSAkKCcuYXJyaXZlLWRlcGFydDpjaGVja2VkJykuZGF0YSgnc2Vhc29uJyk7XG5cdFx0dmFyIHNwZWNpZXNTZWFyY2ggPSAkKCcuc3BlY2llc1NlYXJjaCcpLnNlbGVjdGl2aXR5KCd2YWx1ZScpO1xuXG5cdFx0Ly8gdmFsaWRhdGVcdFx0XG5cdFx0aWYgKHNwZWNpZXNTZWFyY2gpIHtcblxuXHRcdFx0aWYgKCQoJy5hcnJpdmUtZGVwYXJ0JykuaXMoXCI6Y2hlY2tlZFwiKSkge1xuXG5cdFx0XHRcdGxvYWRpbmdDbGFzcygpLnBpcGUoZmlyZVJlcyh0aGVSYW5nZSwgdGhlU2Vhc29uKSk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiU2VsZWN0IGZyb20gZWFybGllc3Qgb3IgbGF0ZXN0IGRhdGVzLlwiKTtcblx0XHRcdH1cdFxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0YWxlcnQoXCJQbGVhc2Ugc2VsZWN0IGEgc3BlY2llc1wiKTtcblx0XHR9XG5cdH0pO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhdGVfc29ydF9hc2MoZGF0ZTEsIGRhdGUyKSB7XG4gIGlmIChkYXRlMSA+IGRhdGUyKSB7XG4gIFx0cmV0dXJuIDE7XG4gIH1cbiAgaWYgKGRhdGUxIDwgZGF0ZTIpIHtcbiAgXHRyZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG4iLCIvLyBjb25maWcgXG52YXIgZm9sbCA9IGZvbGwgfHwge307XG5mb2xsLmNvbmZpZyA9IHtcblx0Ly8gUGxlYXNlIGFkZCBzaXRlIFVSTCBoZXJlIChubyB0cmFpbGluZyBmb3J3YXJkIHNsYXNoKVxuXG5cdC8vIHNpdGVVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2ZvbGxcIixcdFxuXHQvLyBzaXRlVXJsOiBcImh0dHA6Ly9mb2xsLmpheW9udHJhcHMuY29tXCIsXHRcblx0c2l0ZVVybDogXCJodHRwOi8vZm9sbC5vcmcudWtcIixcdFxuXHRhcHBQYWdlSUQ6IDY5XHRcbn07XG5cbi8vIHNldHVwXG52YXIgc2V0VXBFdmVudHMgPSByZXF1aXJlKCcuL3NldHVwL3NldFVwRXZlbnRzLmpzJyk7XG52YXIgYnVpbGRGb3JtRWxzID0gcmVxdWlyZSgnLi9zZXR1cC9idWlsZEZvcm1FbHMuanMnKTtcbnZhciB0aGVTZWFyY2ggPSByZXF1aXJlKCcuL3V0aWxzL3RoZVNlYXJjaC5qcycpO1xudmFyIGFycml2ZURlcGFydEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vYXJyaXZlRGVwYXJ0L2Fycml2ZURlcGFydEV2ZW50SGFuZGxlci5qcycpO1xudmFyIHZhbGlkYXRlR3JhcGhTZWFyY2ggPSByZXF1aXJlKCcuL2hpc3RvZ3JhbS92YWxpZGF0ZUdyYXBoU2VhcmNoLmpzJyk7XG5cblxuXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHRcblxuXHQkLmFqYXgoe1xuXHQgICAgdXJsOiBmb2xsLmNvbmZpZy5zaXRlVXJsICsgJy93cC1qc29uL3BhZ2VzJyxcblx0ICAgIGRhdGE6IHtcblx0ICAgICAgICBmaWx0ZXI6IHtcblx0ICAgICAgICAgXCJwYWdlX2lkXCI6IGZvbGwuY29uZmlnLmFwcFBhZ2VJRCxcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGF0YVR5cGU6ICdqc29uJyxcblx0ICAgIHR5cGU6ICdHRVQnLFxuXHQgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1x0XG5cdCAgICBcdHZhciBkYXRhc2V0VXJsID0gZGF0YVswXS5tZXRhLmRhdGFzZXQudXJsO1xuXG5cdFx0XHRQYXBhLnBhcnNlKGRhdGFzZXRVcmwsIHtcblx0XHRcdFx0ZG93bmxvYWQ6IHRydWUsXG5cdFx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcdFxuXHRcdFx0XHRcdGJ1aWxkRm9ybUVscyhyZXN1bHRzKTtcblx0XHRcdFx0XHRzZXRVcEV2ZW50cyhyZXN1bHRzKTtcblx0XHRcdFx0XHRhcnJpdmVEZXBhcnRFdmVudEhhbmRsZXIocmVzdWx0cyk7XG5cdFx0XHRcdFx0dmFsaWRhdGVHcmFwaFNlYXJjaChyZXN1bHRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdCAgICB9LFxuXHQgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIC8vIGVycm9yIGNvZGVcblx0ICAgIH1cblx0fSk7XHRcblxuXHQvLyB2YXIgZGF0YXNldFVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2ZvbGwvd3AtY29udGVudC90aGVtZXMvZm9sbC9jc3YvZGF0YXNldC5jc3ZcIjtcblx0Ly8gUGFwYS5wYXJzZShkYXRhc2V0VXJsLCB7XG5cdC8vIFx0ZG93bmxvYWQ6IHRydWUsXG5cdC8vIFx0aGVhZGVyOiB0cnVlLFxuXHQvLyBcdGNvbXBsZXRlOiBmdW5jdGlvbihyZXN1bHRzKSB7XHRcblx0Ly8gXHRcdGJ1aWxkRm9ybUVscyhyZXN1bHRzKTtcblx0Ly8gXHRcdHNldFVwRXZlbnRzKHJlc3VsdHMpO1xuXHQvLyBcdFx0YXJyaXZlRGVwYXJ0RXZlbnRIYW5kbGVyKHJlc3VsdHMpO1xuXHQvLyBcdFx0dmFsaWRhdGVHcmFwaFNlYXJjaChyZXN1bHRzKTtcblx0Ly8gXHR9XG5cdC8vIH0pO1x0XG5cblxufTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRVcEdyYXBoKGdyYXBoQXJyLCBncmFwaE9iaikge1xuXG5cdGNvbnNvbGUubG9nKGdyYXBoT2JqKTtcblxuXHR2YXIgZ3JhcGhBcnJGaW5hbCA9IFtdLFxuXHRcdHN1bU9mQ291bnQgPSAwLFxuXHRcdHN1bU9mQ291bnREaXZpZGVkLFxuXHRcdGNvdW50QXJyID0gW10sXG5cdFx0aGlnaGVzdE51bWJlclN0b3JlID0gW10sXG5cdFx0aGlnaGVzdE51bSxcblx0XHRoaWdoZXN0TnVtQXJyID0gW10sXG5cdFx0aSxcblx0XHRjO1xuXG5cblxuXHRmb3IgKGkgPSAwOyBpIDwgZ3JhcGhBcnIubGVuZ3RoOyBpKyspIHtcblxuXHRcdC8vIGdldCB0aGUgZGF0ZSBvZiB0aGUgcmVjb3JkIGFzIGEgbW9tZW50KCkgb2JqZWN0XG5cdFx0dmFyIGN1cnJlbnREYXRlID0gbW9tZW50KGdyYXBoQXJyW2ldLmZvcm1hdHRlZF9kYXRlKTtcdFxuXG5cdFx0Ly8gc3VidHJhY3QgYSBkYXkgZnJvbSBKQU4gMDEgdG8gaW5jbHVkZSB0aGUgSkFOIDAxIGluIHJlc3VsdHNcblx0XHR2YXIgZ3JhcGhfc3RhcnRfc3VidHJhY3RlZCA9IG1vbWVudChncmFwaE9iai5ncmFwaF9zdGFydCkuc3VidHJhY3QoMSwgJ2RheXMnKTtcblxuXHRcdC8vIGdldCBhbGwgcmVjb3JkcyBiZXR3ZWVuIHNlbGVjdGVkIHJhbmdlXG5cdFx0aWYgKGN1cnJlbnREYXRlLmlzQmV0d2VlbihncmFwaF9zdGFydF9zdWJ0cmFjdGVkLCBncmFwaE9iai5ncmFwaF9lbmQpKSB7XHRcdFx0XHRcdFxuXHRcdFx0Z3JhcGhBcnJGaW5hbC5wdXNoKGdyYXBoQXJyW2ldKTtcblx0XHR9XG5cdH1cblxuXG5cdHZhciBncmFwaEFyckZpbmFsTGVuZ3RoID0gZ3JhcGhBcnJGaW5hbC5sZW5ndGgsXG5cdFx0Y291bnRJbnQsXG5cdFx0bW9udGhJbnQ7XG5cblxuXHQvLyBnZW5lcmF0ZSBzdW0gY291bnQgYXJyYXlcblxuXHQvLyBsb29wIHRocm91Z2ggZWFjaCBtb250aCB3aXRoaW4gcmFuZ2Vcblx0Zm9yIChjID0gMTsgYyA8IDEzOyBjKyspIHtcdFxuXG5cdFx0Ly8gZm9yIGVhY2ggbW9udGggZ3JhYiBoaWdoZXN0IG51bWJlcnMgYW5kIHN1bSBjb3VudHNcblx0XHRmb3IgKGkgPSAwOyBpIDwgZ3JhcGhBcnJGaW5hbC5sZW5ndGg7IGkrKykge1x0XG5cblx0XHRcdGlmIChncmFwaEFyckZpbmFsW2ldLmNvdW50ID09PSBcIlwiKSB7XG5cdFx0XHRcdGdyYXBoQXJyRmluYWxbaV0uY291bnQgPSBcIjBcIjtcblx0XHRcdH1cblxuXHRcdFx0Y291bnRJbnQgPSBwYXJzZUludChncmFwaEFyckZpbmFsW2ldLmNvdW50KTtcblx0XHRcdG1vbnRoSW50ID0gcGFyc2VJbnQoZ3JhcGhBcnJGaW5hbFtpXS5tb250aCk7XHRcdFx0XHRcblxuXHRcdFx0aWYgKG1vbnRoSW50ID09PSBjKSB7XG5cdFx0XHRcdC8vIGhpZ2hlc3ROdW1iZXJTdG9yZS5wdXNoKGNvdW50SW50KTtcblx0XHRcdFx0c3VtT2ZDb3VudCArPSBjb3VudEludDtcdFx0XHRcdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH1cdFxuXG5cdFx0Ly8gZm9yIG1vbnRocyB3aXRoIG5vIHZhbHVlcyBwdXNoIGEgemVyb1xuXHRcdC8vIGlmIChoaWdoZXN0TnVtYmVyU3RvcmUubGVuZ3RoID09PSAwKSB7XG5cdFx0Ly8gXHRoaWdoZXN0TnVtQXJyLnB1c2goMCk7XG5cdFx0Ly8gfSBlbHNlIHtcblx0XHQvLyBcdC8vIGdldCBoaWdoZXN0IHZhbHVlXG5cdFx0Ly8gXHRoaWdoZXN0TnVtID0gZ2V0TWF4T2ZBcnJheShoaWdoZXN0TnVtYmVyU3RvcmUpO1xuXHRcdC8vIFx0Ly8gZGl2aWRlIGJ5IG51bWJlciBvZiB5ZWFyc1xuXHRcdC8vIFx0aGlnaGVzdE51bSA9IGhpZ2hlc3ROdW0gLyBncmFwaE9iai5udW1PZlllYXJzO1xuXHRcdC8vIFx0Ly8gcHVzaCBoaWdoZXN0IHZhbHVlIHRvIGhpZ2hlc3ROdW1BcnJcblx0XHQvLyBcdGhpZ2hlc3ROdW1BcnIucHVzaChoaWdoZXN0TnVtKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdW0gZGl2aWRlZCBieSBudW1iZXIgb2YgeWVhcnNcblx0XHRzdW1PZkNvdW50RGl2aWRlZCA9IHN1bU9mQ291bnQgLyBncmFwaE9iai5udW1PZlllYXJzO1xuXHRcdGNvdW50QXJyLnB1c2goc3VtT2ZDb3VudERpdmlkZWQpO1xuXG5cdFx0Ly8gcmVzZXQgXG5cdFx0c3VtT2ZDb3VudCA9IDA7XHRcblx0XHRoaWdoZXN0TnVtID0gMDtcdFxuXHRcdGhpZ2hlc3ROdW1iZXJTdG9yZS5sZW5ndGggPSAwO1x0XG5cblx0fVxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0Ly8gLy8gZ2VuZXJhdGUgaGlnaGVzdCBudW1iZXIgYXJyYXlcblxuXHQvLyB2YXIgbGVuZ3RoID0gZ3JhcGhPYmoueWVhcnNXaXRoaW5SYW5nZS5sZW5ndGg7XG5cdC8vIHZhciByZXN1bHRzWVksXG5cdC8vIFx0cmVzdWx0c01NLFxuXHQvLyBcdHJlc3VsdHNDO1xuXG5cdC8vIHZhciBmb28gPSAwO1xuXG5cdC8vIFx0Z3JhcGhPYmoueWVhcnMgPSB7fTtcblxuXHQvLyBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG5cblx0Ly8gXHR2YXIgY3VyclllYXIgPSBncmFwaE9iai55ZWFyc1dpdGhpblJhbmdlW2luZGV4XTtcblxuXHQvLyBcdGdyYXBoT2JqLnllYXJzW2N1cnJZZWFyXSA9IHt9O1xuXHRcdFxuXHQvLyBcdGZvciAoaSA9IDA7IGkgPCBncmFwaEFyckZpbmFsLmxlbmd0aDsgaSsrKSB7XG5cblx0Ly8gXHRcdHJlc3VsdHNZWSA9IHBhcnNlSW50KGdyYXBoQXJyRmluYWxbaV0ueWVhcik7XG5cdC8vIFx0XHRyZXN1bHRzTU0gPSBwYXJzZUludChncmFwaEFyckZpbmFsW2ldLm1vbnRoKTtcblx0Ly8gXHRcdHJlc3VsdHNDID0gcGFyc2VJbnQoZ3JhcGhBcnJGaW5hbFtpXS5jb3VudCk7XG5cblx0Ly8gXHRcdGlmIChyZXN1bHRzWVkgPT09IGN1cnJZZWFyKSB7XG5cblx0Ly8gXHRcdFx0Ly8gbG9vcCB0aHJvdWdoIGVhY2ggbW9udGggd2l0aGluIHllYXJcblx0Ly8gXHRcdFx0Zm9yIChjID0gMTsgYyA8IDEzOyBjKyspIHtcdFxuXG5cdC8vIFx0XHRcdFx0aWYgKHJlc3VsdHNNTSA9PT0gYykge1xuXHQvLyBcdFx0XHRcdFx0Z3JhcGhPYmoueWVhcnNbY3VyclllYXJdW2NdID0gW107XHRcblx0Ly8gXHRcdFx0XHRcdGdyYXBoT2JqLnllYXJzW2N1cnJZZWFyXVtjXS5wdXNoKHJlc3VsdHNDKTtcblx0Ly8gXHRcdFx0XHR9XG5cblx0Ly8gXHRcdFx0fVxuXHRcdFx0XG5cdC8vIFx0XHR9XG5cdFx0XHRcdFx0XG5cdC8vIFx0fVxuXG5cdC8vIH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0Y29uc29sZS5sb2coY291bnRBcnIpO1xuXG5cdC8vIGNoZWNrIGlmIGFsbCB2YWx1ZXMgYXJlIDAgLSBpLmUgbm8gcmVjb3JkcyBmb3IgYSBnaXZlbiBwZXJpb2Rcblx0dmFyIGNvdW50ZXIgPSAwO1xuXHRmb3IgKGkgPSAwOyBpIDwgY291bnRBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRjb3VudGVyICs9IGNvdW50QXJyW2ldO1x0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0gXG5cdGlmIChjb3VudGVyID09PSAwKSB7XG5cdFx0YWxlcnQoXCJObyByZWNvcmRzIGZvciB0aGlzIHBlcmlvZC5cIik7XG5cdFx0aWYgKHdpbmRvdy5teUJhcikge1xuXHRcdFx0bXlCYXIuY2xlYXIoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9IGVsc2Uge1xuXG5cdFx0aWYgKHdpbmRvdy5teUJhcikge1xuXHRcdFx0Ly8gdXBkYXRlIFxuXHRcdFx0Zm9yICh2YXIgbCA9IDA7IGwgPCBteUJhci5kYXRhc2V0c1swXS5iYXJzLmxlbmd0aDsgbCsrKSB7XG5cdFx0XHRcdG15QmFyLmRhdGFzZXRzWzBdLmJhcnNbbF0udmFsdWUgPSBjb3VudEFycltsXTtcdFx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdG15QmFyLnVwZGF0ZSgpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dmFyIGJhckNoYXJ0RGF0YSA9IHtcblx0XHRcdGxhYmVscyA6IFtcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxcblx0XHRcdGRhdGFzZXRzIDogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmlsbENvbG9yIDogXCJyZ2JhKDAwMCwwMDAsMDAwLDAuNSlcIixcblx0XHRcdFx0XHRzdHJva2VDb2xvciA6IFwicmdiYSgwMDAsMDAwLDAwMCwwLjgpXCIsXG5cdFx0XHRcdFx0aGlnaGxpZ2h0RmlsbDogXCJyZ2JhKDAwMCwwMDAsMDAwLDAuNzUpXCIsXG5cdFx0XHRcdFx0aGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMDAwLDAwMCwwMDAsMSlcIixcblx0XHRcdFx0XHRkYXRhIDogY291bnRBcnJcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vICxcblx0XHRcdFx0Ly8ge1xuXHRcdCAgLy8gICAgICAgICAgIGxhYmVsOiBcIk15IFNlY29uZCBkYXRhc2V0XCIsXG5cdFx0ICAvLyAgICAgICAgICAgZmlsbENvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC41KVwiLFxuXHRcdCAgLy8gICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMC44KVwiLFxuXHRcdCAgLy8gICAgICAgICAgIGhpZ2hsaWdodEZpbGw6IFwicmdiYSgxNTEsMTg3LDIwNSwwLjc1KVwiLFxuXHRcdCAgLy8gICAgICAgICAgIGhpZ2hsaWdodFN0cm9rZTogXCJyZ2JhKDE1MSwxODcsMjA1LDEpXCIsXG5cdFx0ICAvLyAgICAgICAgICAgZGF0YTogaGlnaGVzdE51bUFyclxuXHRcdCAgLy8gICAgICAgfVxuXHRcdFx0XVxuXG5cdFx0XHR9O1xuXG5cblx0XHRcdHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0XHR3aW5kb3cubXlCYXIgPSBuZXcgQ2hhcnQoY3R4KS5CYXIoYmFyQ2hhcnREYXRhLCB7XG5cdFx0XHRcdHJlc3BvbnNpdmUgOiB0cnVlXG5cdFx0XHR9KTtcdFxuXHRcdFx0JCgnLnktYXhpcy1oZWFkJykuYWRkQ2xhc3MoJ29uJyk7XHRcdFx0XG5cdFx0fVx0XG5cblx0fVxufTtcblxuIiwidmFyIHNldFVwR3JhcGggPSByZXF1aXJlKCcuL3NldFVwR3JhcGguanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZUdyYXBoU2VhcmNoKHJlc3VsdHMpIHtcblx0XHRcblx0JCgnI2dlbmVyYXRlR3JhcGgnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyIHNwZWNpZXNOYW1lID0gJCgnLnNwZWNpZXNTZWFyY2gnKS5zZWxlY3Rpdml0eSgndmFsdWUnKTtcblx0XHQvLyBnZXQgdGhlIHN0YXJ0IGRhdGVcblx0XHR2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtZ3JhcGhcIik7XG5cdFx0dmFyIGdyYXBoX3N0YXJ0ID0gcy5vcHRpb25zW3Muc2VsZWN0ZWRJbmRleF0udmFsdWU7XHRcdFxuXHRcdC8vIGdldCB0aGUgZW5kIGRhdGVcblx0XHR2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5kLWdyYXBoXCIpO1xuXHRcdHZhciBncmFwaF9lbmQgPSBlLm9wdGlvbnNbZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcdFxuXG5cblxuXHRcdGlmIChzcGVjaWVzTmFtZSA9PT0gbnVsbCkge1xuXHRcdFx0YWxlcnQoJ1BsZWFzZSBzZWxlY3QgYSBzcGVjaWVzJyk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVx0XG5cdFx0XG5cblx0XHRpZiAoc3BlY2llc05hbWUpIHtcblx0XHRcdFxuXHRcdFx0aWYgKGdyYXBoX3N0YXJ0ID09PSBcIjAwMDBcIiB8fCBncmFwaF9lbmQgPT09IFwiMDAwMFwiIHx8IGdyYXBoX3N0YXJ0ID4gZ3JhcGhfZW5kKSB7XG5cdFx0XHRcdGFsZXJ0KFwiSW52YWxpZCBkYXRlIHJhbmdlLlwiKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVx0XHRcblxuXHRcdFx0dmFyIGdyYXBoT2JqID0ge307XG5cdFx0XHRncmFwaE9iai55ZWFyc1dpdGhpblJhbmdlID0gW107XG5cblx0XHRcdC8vIG51bWJlciBvZiB5ZWFycyBpbiBzZWFyY2hcblx0XHRcdHZhciBnclNydCA9IHBhcnNlSW50KGdyYXBoX3N0YXJ0KSxcblx0XHRcdFx0Z3JFbmQgPSBwYXJzZUludChncmFwaF9lbmQpOyBcblxuXG5cdFx0XHRcdC8vIGFkZCAxIHRvIGdyYXBoX2VuZCBhbmQgZ3JFbmQgLSB0byBzaGlmdCB0aGUgZW5kIGRhdGUgdXAgYSB5ZWFyLi4uXG5cdFx0XHQgXHQvLyB0aGlzIGFsbG93cyBhIG1vcmUgcmVhZGFibGUgZW5kLW9mLXJhbmdlIGxhYmVsIFxuXHRcdFx0IFx0Ly8gZS5nLiBpbnN0ZWFkIG9mIHJlYWRpbmcgXCIgLi4uIHRvIDFzdCBKYW4gMjAxMFwiIHRvIHJlYWQgXCIgLi4uIHRvIDMxc3QgRGVjIDIwMDkgPHRoZSBwcmV2aW91cyB5ZWFyPlwiXG5cdFx0XHQgXHQvLyByZWZmZXIgdG8gdGhlIHRoZU9iaiBmb3IgYWN0dWFsIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgLSBncmFwaE9iai5ncmFwaF9zdGFydCBhbmQgZ3JhcGhPYmouZ3JhcGhfZW5kXG5cdFx0XHRcdGdyRW5kID0gZ3JFbmQgKyAxO1xuXHRcdFx0XHRncmFwaF9lbmQgPSBnckVuZC50b1N0cmluZygpO1xuXG5cblx0XHRcdHZhclx0bnVtT2ZZZWFycyA9IGdyRW5kIC0gZ3JTcnQ7XG5cblx0XHRcdC8vIGZvcm1hdCB5ZWFyIGZvciBtb21lbnQuanNcdFxuXHRcdFx0Z3JhcGhfc3RhcnQgPSBncmFwaF9zdGFydCArIFwiLTAxLTAxXCI7XG5cdFx0XHRncmFwaF9lbmQgPSBncmFwaF9lbmQgKyBcIi0wMS0wMVwiO1xuXG5cdFx0XHQvLyBhcnJheSBvZiB5ZWFycyB3aXRoaW4gcmFuZ2Vcblx0XHRcdHZhciBjb3VudGVyID0gZ3JTcnQ7XG5cdFx0XHR3aGlsZShjb3VudGVyIDwgZ3JFbmQpIHtcblx0XHRcdFx0Z3JhcGhPYmoueWVhcnNXaXRoaW5SYW5nZS5wdXNoKGNvdW50ZXIpO1xuXHRcdFx0XHRjb3VudGVyKys7XG5cdFx0XHR9XG5cblx0XHRcdFxuXHRcdFx0Z3JhcGhPYmouZ3JhcGhfc3RhcnQgPSBncmFwaF9zdGFydDtcblx0XHRcdGdyYXBoT2JqLmdyYXBoX2VuZCA9IGdyYXBoX2VuZDtcblx0XHRcdGdyYXBoT2JqLm51bU9mWWVhcnMgPSBudW1PZlllYXJzO1xuXG5cblx0XHRcdHZhciBncmFwaEFyciA9IFtdO1xuXHRcdFx0dmFyIGxlbiA9IHJlc3VsdHMuZGF0YS5sZW5ndGggLSAxO1x0XHRcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXG5cdFx0XHRcdGlmIChyZXN1bHRzLmRhdGFbaV0uc3BlY2llcyA9PT0gc3BlY2llc05hbWUpIHtcblx0XHRcdFx0XHRncmFwaEFyci5wdXNoKHJlc3VsdHMuZGF0YVtpXSk7XG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXG5cdFx0XHRzZXRVcEdyYXBoKGdyYXBoQXJyLCBncmFwaE9iaik7XG5cdFx0fSBcblx0XHRcdFx0XHRcdFxuXHR9KTtcblxufTsiLCIvLyB1dGlsc1xudmFyIGVscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZWxzLmpzJyk7XG52YXIgdGhlU2VhcmNoID0gcmVxdWlyZSgnLi8uLi91dGlscy90aGVTZWFyY2guanMnKTtcbnZhciBsb2NhdGlvbkluaXRpYWxzVG9OYW1lID0gcmVxdWlyZSgnLi8uLi91dGlscy9sb2NhdGlvbkluaXRpYWxzVG9OYW1lLmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZERvbUVscyh0b3RhbFJlc3VsdHMsIHJlc3VsdHNBcnIpIHtcblx0dmFyIG5ld1Jvd3MgPSAkKCc8c3Bhbi8+Jyk7XG5cdHZhciBjb252ZXJ0ZWRMb2NOYW1lID0gXCJcIjtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsUmVzdWx0czsgaSsrKSB7XG5cdFx0Y29udmVydGVkTG9jTmFtZSA9IGxvY2F0aW9uSW5pdGlhbHNUb05hbWUocmVzdWx0c0FycltpXS5sb2NhdGlvbik7XG5cdFx0JCgnPHRyLz4nLCB7XG5cdFx0XHRodG1sIDogJzx0ZCBjbGFzcz1cInNwZWNpZXNcIj4nICArIHJlc3VsdHNBcnJbaV0uc3BlY2llcyArICc8L3RkPiAnICArICc8dGQgY2xhc3M9XCJkYXRlXCI+JyAgKyByZXN1bHRzQXJyW2ldLmRhdGVfZnJvbSArICc8L3RkPiAnICArICc8dGQgY2xhc3M9XCJsb2NhdGlvblwiPicgKyBjb252ZXJ0ZWRMb2NOYW1lICsgJzwvdGQ+ICcgICsgJzx0ZCBjbGFzcz1cImNvdW50XCI+JyAgKyByZXN1bHRzQXJyW2ldLmNvdW50ICsgJzwvdGQ+ICcgKyAnPHRkIGNsYXNzPVwib2JzZXJ2ZXJcIj4nICArIHJlc3VsdHNBcnJbaV0ub2JzZXJ2ZXIgKyAnPC90ZD4gJyArICc8dGQgY2xhc3M9XCJub3Rlc1wiPicgICsgcmVzdWx0c0FycltpXS5ub3RlcyArICc8L3RkPidcblx0XHRcdH1cdFx0XHRcdFx0XHRcblx0XHQpLmFwcGVuZFRvKG5ld1Jvd3MpO1x0XHRcdFxuXHR9XG5cdCQobmV3Um93cy5odG1sKCkpLmFwcGVuZFRvKGVscy5yZXN1bHRzTGlzdCk7XG59OyIsIi8vIHV0aWxzXG52YXIgZWxzID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbHMuanMnKTtcbnZhciB0aGVTZWFyY2ggPSByZXF1aXJlKCcuLy4uL3V0aWxzL3RoZVNlYXJjaC5qcycpO1xudmFyIHNvcnRCeURhdGUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL3NvcnRCeURhdGUuanMnKTtcbnZhciBtYXhOdW1SZXN1bHRzID0gcmVxdWlyZSgnLi8uLi91dGlscy9tYXhOdW1SZXN1bHRzLmpzJyk7XG52YXIgZXNjYXBlRGF0ZUZ1biA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZXNjYXBlRGF0ZUZ1bi5qcycpO1xuXG4vLyBzZWFyY2hcbnZhciBkaXNwbGF5UmVzdWx0cyA9IHJlcXVpcmUoJy4vZGlzcGxheVJlc3VsdHMuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRhdGVSYW5nZShyZXN1bHRzQXJyLCB0aGVTZWFyY2gpIHtcblxuXHR2YXIgZGF0ZUlucHV0Q2hlY2tlZCA9ICQoJ2lucHV0W25hbWU9XCJkYXRlLXJhbmdlXCJdOmNoZWNrZWQnKTtcblx0dmFyIHVzZXJTdGFydERhdGUgPSAkKCcjc3RhcnQgaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLnZhbCgpO1xuXHR2YXIgdXNlckVuZHREYXRlID0gJCgnI2VuZCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJykudmFsKCk7XG5cdHZhciBmaWx0ZXJlZEFyciA9IFtdO1x0XHRcblx0XG5cblx0aWYgKGRhdGVJbnB1dENoZWNrZWQubGVuZ3RoID4gMCkge1xuXG5cdFx0aWYgKGRhdGVJbnB1dENoZWNrZWQudmFsKCkgPT09IFwiYnktcmFuZ2VcIikge1xuXG5cdFx0XHR0aGVTZWFyY2guYnltb250aCA9IFwiXCI7XG5cdFx0XHRcblx0XHRcdGlmICh1c2VyU3RhcnREYXRlLmxlbmd0aCA9PT0gMCB8fCB1c2VyRW5kdERhdGUubGVuZ3RoID09PSAwKSB7XG5cblx0XHRcdFx0ZXNjYXBlRGF0ZUZ1bigpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHZhciBzdGFydERhdGUgPSBtb21lbnQodXNlclN0YXJ0RGF0ZSk7XG5cdFx0XHRcdHZhciBlbmREYXRlID0gbW9tZW50KHVzZXJFbmR0RGF0ZSk7XG5cblxuXHRcdFx0XHRpZiAoZW5kRGF0ZS5pc0JlZm9yZShzdGFydERhdGUpKSB7XG5cdFx0XHRcdFx0ZXNjYXBlRGF0ZUZ1bigpO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHQvLyB2YXIgc3RhcnREYXRlID0gbmV3IERhdGUodXNlclN0YXJ0RGF0ZSk7XG5cdFx0XHRcdFx0Ly8gdmFyIGVuZERhdGUgPSBuZXcgRGF0ZSh1c2VyRW5kdERhdGUpO1x0XHRcdFx0XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGVTZWFyY2guZGF0ZXJhbmdlID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGVTZWFyY2guc3RhcnRkYXRlID0gdXNlclN0YXJ0RGF0ZTtcblx0XHRcdFx0XHR0aGVTZWFyY2guZW5kZGF0ZSA9IHVzZXJFbmR0RGF0ZTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGVTZWFyY2gubnVtT2ZSZXN1bHRzOyBpbmRleCsrKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIHZhciBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHJlc3VsdHNBcnJbaW5kZXhdLmZvcm1hdHRlZF9kYXRlKTtcblx0XHRcdFx0XHRcdHZhciBjdXJyZW50RGF0ZSA9IG1vbWVudChyZXN1bHRzQXJyW2luZGV4XS5mb3JtYXR0ZWRfZGF0ZSk7XHRcdFx0XHRcdFxuXG5cdFx0XHRcdFx0XHQvLyBpZiAoY3VycmVudERhdGUgPiBzdGFydERhdGUgJiYgY3VycmVudERhdGUgPCBlbmREYXRlICkge1xuXHRcdFx0XHRcdFx0Ly8gXHRmaWx0ZXJlZEFyci5wdXNoKHJlc3VsdHNBcnJbaW5kZXhdKTtcblx0XHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdFx0aWYgKCBjdXJyZW50RGF0ZS5pc0JldHdlZW4oc3RhcnREYXRlLCBlbmREYXRlKSApIHtcblx0XHRcdFx0XHRcdFx0ZmlsdGVyZWRBcnIucHVzaChyZXN1bHRzQXJyW2luZGV4XSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGVTZWFyY2gubnVtT2ZSZXN1bHRzID0gZmlsdGVyZWRBcnIubGVuZ3RoO1xuXHRcdFx0XHRcdHNvcnRCeURhdGUoZmlsdGVyZWRBcnIsIHRoZVNlYXJjaCk7XG5cdFx0XHRcdFx0bWF4TnVtUmVzdWx0cyhmaWx0ZXJlZEFyciwgdGhlU2VhcmNoKTtcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdGRpc3BsYXlSZXN1bHRzKGZpbHRlcmVkQXJyLCB0aGVTZWFyY2gpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cdFx0XHRcblxuXHRcdH0gZWxzZSBpZihkYXRlSW5wdXRDaGVja2VkLnZhbCgpID09PSBcImJ5LW1vbnRoXCIpIHtcblxuXHRcdFx0dGhlU2VhcmNoLmRhdGVyYW5nZSA9IGZhbHNlO1xuXHRcdFx0XG5cdFx0XHQvLyBncmFiIHRoZSBpbm91dCB2YWx1ZVxuXHRcdFx0dmFyIHVzZXJNb250aFNlbGVjdGVkID0gJCgnI2J5TW9udGgnKS52YWwoKTtcdFxuXHRcdFx0dGhlU2VhcmNoLmJ5bW9udGggPSB1c2VyTW9udGhTZWxlY3RlZDtcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQvLyBnZW5lcmF0ZSBmaWx0ZXJlZEFyclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGVTZWFyY2gubnVtT2ZSZXN1bHRzOyBpKyspIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChyZXN1bHRzQXJyW2ldLm1vbnRoID09PSB1c2VyTW9udGhTZWxlY3RlZCkge1xuXHRcdFx0XHRcdGZpbHRlcmVkQXJyLnB1c2gocmVzdWx0c0FycltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhlU2VhcmNoLm51bU9mUmVzdWx0cyA9IGZpbHRlcmVkQXJyLmxlbmd0aDtcblx0XHRcdHNvcnRCeURhdGUoZmlsdGVyZWRBcnIsIHRoZVNlYXJjaCk7XG5cdFx0XHRtYXhOdW1SZXN1bHRzKGZpbHRlcmVkQXJyLCB0aGVTZWFyY2gpO1xuXHRcdFx0ZGlzcGxheVJlc3VsdHMoZmlsdGVyZWRBcnIsIHRoZVNlYXJjaCk7XG5cblxuXHRcdH0gZWxzZSBpZiAoZGF0ZUlucHV0Q2hlY2tlZC52YWwoKSA9PT0gXCJhbGwtZGF0ZXNcIikge1xuXG5cdFx0XHR0aGVTZWFyY2guYnltb250aCA9IFwiXCI7XG5cblx0XHRcdHRoZVNlYXJjaC5kYXRlcmFuZ2UgPSBmYWxzZTtcdFx0XHRcblx0XHRcdHNvcnRCeURhdGUocmVzdWx0c0Fycik7XG5cdFx0XHRtYXhOdW1SZXN1bHRzKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCk7XHRcdFxuXHRcdFx0ZGlzcGxheVJlc3VsdHMocmVzdWx0c0FyciwgdGhlU2VhcmNoKTtcblx0XHRcblx0XHR9XG5cblx0fSBlbHNle1xuXHRcdFxuXHRcdHNvcnRCeURhdGUocmVzdWx0c0Fycik7XG5cdFx0bWF4TnVtUmVzdWx0cyhyZXN1bHRzQXJyLCB0aGVTZWFyY2gpO1xuXHRcdGRpc3BsYXlSZXN1bHRzKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCk7XG5cdH1cdFxufTsiLCIvLyB1dGlsc1xudmFyIGVscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZWxzLmpzJyk7XG52YXIgbG9jYXRpb25Jbml0aWFsc1RvTmFtZSA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvbG9jYXRpb25Jbml0aWFsc1RvTmFtZS5qcycpO1xudmFyIHRoZVNlYXJjaCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvdGhlU2VhcmNoLmpzJyk7XG52YXIgcmV2ZXJzZURhdGVTdHJpbmcgPSByZXF1aXJlKCcuLy4uL3V0aWxzL3JldmVyc2VEYXRlU3RyaW5nLmpzJyk7XG5cblxuLy8gc2VhcmNoXG52YXIgYnVpbGREb21FbHMgPSByZXF1aXJlKCcuL2J1aWxkRG9tRWxzLmpzJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHRzKHJlc3VsdHNBcnIsIHRoZVNlYXJjaCkge1xuXHRcblx0dmFyIHRvdGFsUmVzdWx0cyA9IFwiXCI7XG5cdC8vIGlmIG1heE51bVJlc3VsdHMgLSB0b3RhbFJlc3VsdHMgd2lsbCBiZSBkaWZmZXJlbnQgZnJvbSB0aGVTZWFyY2gubnVtT2ZSZXN1bHRzXG5cdGlmICh0aGVTZWFyY2gubGltaXROdW0pIHtcblx0XHR0b3RhbFJlc3VsdHMgPSAzMDA7XG5cdH0gZWxzZSB7XG5cdFx0dG90YWxSZXN1bHRzID0gdGhlU2VhcmNoLm51bU9mUmVzdWx0cztcblx0fVxuXG5cdFx0XG5cdHZhciBzdW1tYXJpemVEYXRlUmFuZ2UgPSBcIlwiO1xuXHRpZiAodGhlU2VhcmNoLmRhdGVyYW5nZSkgeyBcblx0XHQvLyBmb3JtYXQgdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgZm9yIHJlYWRpbmcgYmFjayB3aXRoIHJldmVyc2VEYXRlU3RyaW5nKClcblx0XHR2YXIganNTdGFydERhdGUgPSB0aGVTZWFyY2guc3RhcnRkYXRlO1xuXHRcdHZhciB1c2VyU3RhcnREYXRlID0gcmV2ZXJzZURhdGVTdHJpbmcoanNTdGFydERhdGUpO1xuXHRcdHZhciBqc0VuZERhdGUgPSB0aGVTZWFyY2guZW5kZGF0ZTtcblx0XHR2YXIgdXNlckVuZHREYXRlID0gcmV2ZXJzZURhdGVTdHJpbmcoanNFbmREYXRlKTtcblx0XHRzdW1tYXJpemVEYXRlUmFuZ2UgPSBcIiBmcm9tIFwiICsgdXNlclN0YXJ0RGF0ZSArIFwiIHRvIFwiICsgdXNlckVuZHREYXRlO1xuXHR9XG5cblx0dmFyIGhhc01heE51bWJlciA9IFwiXCI7XG5cdGlmICh0aGVTZWFyY2gubGltaXROdW0pIHtcblx0XHRoYXNNYXhOdW1iZXIgPSB0aGVTZWFyY2gubGltaXROdW07XG5cdH0gXG5cblx0dmFyIGNob3Nlbk1vbnRoID0gXCJcIjtcblx0aWYgKHRoZVNlYXJjaC5ieW1vbnRoKSB7XG5cdFx0aWYgKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjFcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBKYW51YXJ5LiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiMlwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIEZlYnVhcnkuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCIzXCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gTWFyY2guIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCI0XCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gQXByaWwuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCI1XCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gTWF5LiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiNlwiKSB7XG5cdFx0XHRjaG9zZW5Nb250aCA9IFwiIHJlY29yZGVkIGluIEp1bmUuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCI3XCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gSnVseS4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjhcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBBdWd1c3QuIFwiO1xuXHRcdH0gZWxzZSBpZih0aGVTZWFyY2guYnltb250aCA9PT0gXCI5XCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gU2VwdGVtYmVyLiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiMTBcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBPY3RvYmVyLiBcIjtcblx0XHR9IGVsc2UgaWYodGhlU2VhcmNoLmJ5bW9udGggPT09IFwiMTFcIikge1xuXHRcdFx0Y2hvc2VuTW9udGggPSBcIiByZWNvcmRlZCBpbiBOb3ZlbWJlci4gXCI7XG5cdFx0fSBlbHNlIGlmKHRoZVNlYXJjaC5ieW1vbnRoID09PSBcIjEyXCIpIHtcblx0XHRcdGNob3Nlbk1vbnRoID0gXCIgcmVjb3JkZWQgaW4gRGVjZW1iZXIuIFwiO1xuXHRcdH1cblx0fVxuXG5cdHRoZVNlYXJjaC5sb2MgPSBsb2NhdGlvbkluaXRpYWxzVG9OYW1lKHRoZVNlYXJjaC5sb2MpO1xuXG5cdHZhciByZWFkQmFja1Jlc3VsdHMgPSBcIjxiPlwiICsgdGhlU2VhcmNoLm51bU9mUmVzdWx0cyArIFwiIHJlY29yZHMgZm9yIFwiICsgdGhlU2VhcmNoLnNwZWNpZXMgKyBcIiBhdCBcIiArIHRoZVNlYXJjaC5sb2MgKyBcIiwgXCIgK3N1bW1hcml6ZURhdGVSYW5nZSArIFwiIFwiICsgY2hvc2VuTW9udGggKyBcIiBcIiArIGhhc01heE51bWJlciArIFwiPC9iPlwiO1xuXG5cdCQocmVhZEJhY2tSZXN1bHRzKS5hcHBlbmRUbyhlbHMuc2VhcmNoU3VtbWFyeSk7XHRcdFxuXG5cdGJ1aWxkRG9tRWxzKHRvdGFsUmVzdWx0cywgcmVzdWx0c0Fycik7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbigpeyBlbHMub3ZlcmxheS5yZW1vdmVDbGFzcygnbG9hZGluZycpOyB9LCA1MDApO1xufTsiLCIvLyB1dGlsc1xudmFyIGVscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZWxzLmpzJyk7XG52YXIgZW1wdHlMaXN0ID0gcmVxdWlyZSgnLi8uLi91dGlscy9lbXB0eUxpc3QuanMnKTtcbnZhciB0aGVTZWFyY2ggPSByZXF1aXJlKCcuLy4uL3V0aWxzL3RoZVNlYXJjaC5qcycpO1xuXG5cbi8vIHNlYXJjaFxudmFyIGRhdGVSYW5nZSA9IHJlcXVpcmUoJy4vLi4vc2VhcmNoL2RhdGVSYW5nZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdlbmVyYXRlUXVlcnkocmVzdWx0cykge1xuXG5cdGVtcHR5TGlzdCgpO1xuXG5cdC8vIGNsZWFyIGFycml2YWwgYW5kIGRlcGFydHVyZXMgcmFkaW8gaW5wdXRzXG5cdCQoXCIuYXJyaXZlLWRlcGFydFwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG5cdHZhciBsZW4gPSByZXN1bHRzLmRhdGEubGVuZ3RoIC0gMTtcdFx0XHRcblx0dmFyIGluZGV4ID0gMDtcblx0dmFyIHJlc3VsdHNBcnIgPSBbXTtcblx0dmFyIGxvY2F0aW9uU2VhcmNoID0gJCgnI2xvY2F0aW9uU2VhcmNoJykudmFsKCk7XG5cdHZhciBzcGVjaWVzU2VhcmNoID0gJCgnLnNwZWNpZXNTZWFyY2gnKS5zZWxlY3Rpdml0eSgndmFsdWUnKTtcblx0Ly8gdmFyIHRoZVNlYXJjaCA9IHt9O1xuXG5cblx0aWYgKCFzcGVjaWVzU2VhcmNoICYmICFsb2NhdGlvblNlYXJjaCkge1xuXG5cdFx0Zm9yICh2YXIgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW47IGNvdW50ZXIrKykge1xuXHRcdFx0cmVzdWx0c0Fyci5wdXNoKHJlc3VsdHMuZGF0YVtjb3VudGVyXSk7XG5cdFx0XHRpbmRleCsrOyBcblx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0dGhlU2VhcmNoLnNwZWNpZXMgPSBcImFsbCBzcGVjaWVzXCI7XG5cdFx0dGhlU2VhcmNoLmxvYyA9IFwiYWxsIGxvY2F0aW9uc1wiO1xuXHRcdFxuXHR9IFx0ZWxzZSBpZiAoc3BlY2llc1NlYXJjaCAmJiBsb2NhdGlvblNlYXJjaCkge1xuXG5cdFx0XHRmb3IgKHZhciBpbmQgPSAwOyBpbmQgPCBsZW47IGluZCsrKSB7XHRcdFx0XHRcblx0XHRcdFx0aWYgKHJlc3VsdHMuZGF0YVtpbmRdLnNwZWNpZXMgPT09IHNlYXJjaCAmJiByZXN1bHRzLmRhdGFbaW5kXS5sb2NhdGlvbiA9PT0gbG9jYXRpb25TZWFyY2gpIHtcblx0XHRcdFx0XHRyZXN1bHRzQXJyLnB1c2gocmVzdWx0cy5kYXRhW2luZF0pO1xuXHRcdFx0XHRcdGluZGV4Kys7IFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0dGhlU2VhcmNoLnNwZWNpZXMgPSBzcGVjaWVzU2VhcmNoO1xuXHRcdFx0dGhlU2VhcmNoLmxvYyA9IGxvY2F0aW9uU2VhcmNoO1xuXHRcdFx0XG5cdH1cdGVsc2UgaWYgKHNwZWNpZXNTZWFyY2gpIHtcblx0XHRcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcdFx0XHRcdFxuXHRcdFx0XHRpZiAocmVzdWx0cy5kYXRhW2ldLnNwZWNpZXMgPT09IHNlYXJjaCkge1xuXHRcdFx0XHRcdHJlc3VsdHNBcnIucHVzaChyZXN1bHRzLmRhdGFbaV0pO1xuXHRcdFx0XHRcdGluZGV4Kys7IFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0dGhlU2VhcmNoLnNwZWNpZXMgPSBzcGVjaWVzU2VhcmNoO1xuXHRcdFx0dGhlU2VhcmNoLmxvYyA9IFwiYWxsIGxvY2F0aW9uc1wiO1xuXHRcdFx0XG5cblx0fVx0ZWxzZSBpZiAobG9jYXRpb25TZWFyY2gpIHtcblxuXHRcdFx0Zm9yICh2YXIgY291bnQgPSAwOyBjb3VudCA8IGxlbjsgY291bnQrKykge1x0XHRcdFx0XG5cdFx0XHRcdGlmIChyZXN1bHRzLmRhdGFbY291bnRdLmxvY2F0aW9uID09PSBsb2NhdGlvblNlYXJjaCkge1xuXHRcdFx0XHRcdHJlc3VsdHNBcnIucHVzaChyZXN1bHRzLmRhdGFbY291bnRdKTtcblx0XHRcdFx0XHRpbmRleCsrOyBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdHRoZVNlYXJjaC5zcGVjaWVzID0gXCJhbGwgc3BlY2llc1wiO1xuXHRcdFx0dGhlU2VhcmNoLmxvYyA9IGxvY2F0aW9uU2VhcmNoO1x0XHRcdFx0XG5cdH1cblxuXHR0aGVTZWFyY2gubnVtT2ZSZXN1bHRzID0gaW5kZXg7XG5cdGRhdGVSYW5nZShyZXN1bHRzQXJyLCB0aGVTZWFyY2gpO1xuXG59O1xuXG5cbiIsIi8vIHV0aWxzXG52YXIgbG9jYXRpb25Jbml0aWFsc1RvTmFtZSA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvbG9jYXRpb25Jbml0aWFsc1RvTmFtZS5qcycpO1xudmFyIGVscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZWxzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGb3JtRWxzIChyZXN1bHRzKSB7XG5cblx0dmFyIGxvY2F0aW9uQXJyYXkgPSBbXTtcblx0dmFyIHNwZWNpZXNBcnJheSA9IFtdO1xuXHR2YXIgbCA9IHJlc3VsdHMuZGF0YS5sZW5ndGggLSAxO1x0XHRcblxuXHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbDsgaW5kZXgrKykge1x0XHRcblx0XHR2YXIgY3VycmVudExvY2F0aW9uID0gcmVzdWx0cy5kYXRhW2luZGV4XS5sb2NhdGlvbjtcblx0XHR2YXIgY3VycmVudFNwZWNpZXMgPSByZXN1bHRzLmRhdGFbaW5kZXhdLnNwZWNpZXM7XG5cblx0XHRpZiAoJC5pbkFycmF5KGN1cnJlbnRMb2NhdGlvbiwgbG9jYXRpb25BcnJheSkgPT09IC0xKXtcblx0XHRcdGxvY2F0aW9uQXJyYXkucHVzaChjdXJyZW50TG9jYXRpb24pO1xuXHRcdH1cdFxuXG5cdFx0aWYgKCQuaW5BcnJheShjdXJyZW50U3BlY2llcywgc3BlY2llc0FycmF5KSA9PT0gLTEpe1xuXHRcdFx0c3BlY2llc0FycmF5LnB1c2goY3VycmVudFNwZWNpZXMpO1xuXHRcdH1cblxuXHRcdHZhciBkYXkgPSByZXN1bHRzLmRhdGFbaW5kZXhdLmRheSxcblx0XHRcdG1vbnRoID0gcmVzdWx0cy5kYXRhW2luZGV4XS5tb250aCxcblx0XHRcdHllYXIgPSByZXN1bHRzLmRhdGFbaW5kZXhdLnllYXI7XG5cblx0XHRcdGlmIChkYXkubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdGRheSA9IFwiMFwiICsgZGF5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vbnRoLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRtb250aCA9IFwiMFwiICsgbW9udGg7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdHJlc3VsdHMuZGF0YVtpbmRleF0uZm9ybWF0dGVkX2RhdGUgPSB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgZGF5OyAgLy8gZm9ybWF0IHl5eXkgbSBkXHRcdFx0XHRcdFxuXHR9XHRcblxuXG5cdGxvY2F0aW9uQXJyYXkuc29ydCgpO1x0XG5cdHZhciBjb252ZXJ0ZWRMb2NOYW1lID0gXCJcIjtcdFxuXHQvLyBidWlsZCBvcHRpb24gdGFncyAtIGFwcGVuZFRvIGxpc3Rcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29udmVydGVkTG9jTmFtZSA9IGxvY2F0aW9uSW5pdGlhbHNUb05hbWUobG9jYXRpb25BcnJheVtpXSk7XG5cdFx0JCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBsb2NhdGlvbkFycmF5W2ldICsgJ1wiPicgKyBjb252ZXJ0ZWRMb2NOYW1lICsgJzwvb3B0aW9uPicpLmFwcGVuZFRvKGVscy5sb2NMaXN0KTtcblx0fVxuXG5cdHNwZWNpZXNBcnJheS5zb3J0KCk7XG5cdC8vIHBhc3MgdG8gc2VsZWN0aXZpdHkgcGx1Z2luIFxuXHQkKFwiLnNwZWNpZXNTZWFyY2hcIikuc2VsZWN0aXZpdHkoe1xuXHQgICAgYWxsb3dDbGVhcjogdHJ1ZSxcblx0ICAgIGl0ZW1zOiBzcGVjaWVzQXJyYXksXG5cdCAgICBwbGFjZWhvbGRlcjogJ05vIHNwZWNpZXMgc2VsZWN0ZWQnXG5cdH0pO1x0XG5cblx0ZWxzLm92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblx0XG59O1xuXG4iLCIvLyB1dGlsc1xudmFyIGxvY2F0aW9uSW5pdGlhbHNUb05hbWUgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2xvY2F0aW9uSW5pdGlhbHNUb05hbWUuanMnKTtcbnZhciBlbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzL2Vscy5qcycpO1xudmFyIGVtcHR5TGlzdCA9IHJlcXVpcmUoJy4vLi4vdXRpbHMvZW1wdHlMaXN0LmpzJyk7XG52YXIgdGhlU2VhcmNoID0gcmVxdWlyZSgnLi8uLi91dGlscy90aGVTZWFyY2guanMnKTtcblxuLy8gc2VhcmNoXG52YXIgZ2VuZXJhdGVRdWVyeSA9IHJlcXVpcmUoJy4vLi4vc2VhcmNoL2dlbmVyYXRlUXVlcnkuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldFVwRXZlbnRzKHJlc3VsdHMpIHtcblxuXHR2YXIgYWRkTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oKXtcblx0ICB2YXIgZCA9ICQuRGVmZXJyZWQoKTtcblx0ICAgIGVscy5vdmVybGF5LmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdCAgICBkLnJlc29sdmUoKTtcblx0ICBcdHJldHVybiBkLnByb21pc2UoKTtcblx0fTtcblxuXG5cdHZhciBmaXJlR2VuUSA9IGZ1bmN0aW9uKCl7XG5cdCAgdmFyIGQgPSAkLkRlZmVycmVkKCk7XG5cdCAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgIGdlbmVyYXRlUXVlcnkocmVzdWx0cywgdGhlU2VhcmNoKTtcblx0ICAgIGQucmVzb2x2ZSgpO1xuXHQgIH0sIDEwMCk7XG5cdCAgcmV0dXJuIGQucHJvbWlzZSgpO1xuXHR9O1xuXG5cdC8vIEVWRU5UU1xuXHQvLyBjbGVhciByZXN1bHRzIG1hbmF1bGx5XG5cdCQoXCIuc3BlY2llc1NlYXJjaFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XHRcblx0XHRzZWFyY2ggPSAkKCcuc3BlY2llc1NlYXJjaCcpLnNlbGVjdGl2aXR5KCd2YWx1ZScpO1xuXHRcdFxuXHRcdGlmICghc2VhcmNoKSB7XG5cdFx0XHQvLyBjaGFuZ2UgdG8gcmVzZXRBbGwoKVxuXHRcdFx0ZW1wdHlMaXN0KCk7XG5cblx0XHRcdGVscy5zcGVjaWVzSDQuaHRtbChcIlwiKTtcblx0XHRcdGVscy5yYWRpb0lucHV0cy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0aWYgKHdpbmRvdy5teUJhcikge1xuXHRcdFx0XHRteUJhci5jbGVhcigpO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGVscy5zcGVjaWVzSDQuaHRtbChcIjogXCIgKyBzZWFyY2gpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdCQoJyNzdWJtaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHRcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0YWRkTG9hZGluZ0NsYXNzKCkucGlwZShmaXJlR2VuUSk7XG5cdH0pO1xuXG59O1xuXG4iLCJ2YXIgZWxzID0ge1xuXHRvdmVybGF5IDogJCgnLm92ZXJsYXknKSxcblx0c2VhcmNoIDogXCJcIixcblx0bG9jTGlzdCA6ICQoJyNsb2NhdGlvblNlYXJjaCcpLFxuXHRyZXN1bHRzTGlzdCA6ICQoJyNyZXN1bHRzJyksXG5cdHJlc3VsdHNMaXN0XzIgOiAkKCcjcmVzdWx0c18yJyksXG5cdHNlYXJjaFN1bW1hcnkgOiAkKCcjc2VhcmNoLXN1bW1hcnknKSxcblx0cmFkaW9JbnB1dHMgOiAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKSxcblx0c3BlY2llc0g0IDogJCgnI3NwLW5hbWUnKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbHM7IiwidmFyIGVscyA9IHJlcXVpcmUoJy4vZWxzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW1wdHlMaXN0KCkge1xuXG5cdGVscy5yZXN1bHRzTGlzdC5maW5kKCd0Ym9keSB0ZCcpLnJlbW92ZSgpO1x0XHRcblx0ZWxzLnNlYXJjaFN1bW1hcnkuaHRtbCgnUmVzdWx0czogJyk7XG5cdCQoJy5zb3J0LWljb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdGVscy5yZXN1bHRzTGlzdF8yLmZpbmQoJ3Rib2R5IHRkJykucmVtb3ZlKCk7XG5cbn07IiwidmFyIGVscyA9IHJlcXVpcmUoJy4vZWxzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlRGF0ZUZ1bigpIHtcblx0YWxlcnQoJ0ludmFsaWQgZGF0ZSByYW5nZS4nKTtcblx0ZWxzLm92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblx0cmV0dXJuIGZhbHNlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvY2F0aW9uSW5pdGlhbHNUb05hbWUobG9jYXRpb25Jbml0aWFscykge1xuXHRpZiAobG9jYXRpb25Jbml0aWFscyA9PT0gXCJCU1wiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiQmxhY2sgU3dhbiBMYWtlXCI7XG5cdFx0cmV0dXJuIGxvY2F0aW9uSW5pdGlhbHM7XG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIkRQXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJEaW50b24gUGFzdHVyZXNcIjtcblx0XHRyZXR1cm4gbG9jYXRpb25Jbml0aWFscztcblxuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJMRlwiKSB7XG5cdFx0bG9jYXRpb25Jbml0aWFscyA9IFwiTGVhIEZhcm0gTGFrZVwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIkxMXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJMYXZlbGwncyBMYWtlXCI7XG5cdFx0cmV0dXJuIGxvY2F0aW9uSW5pdGlhbHM7XG5cblx0fSBlbHNlIGlmKGxvY2F0aW9uSW5pdGlhbHMgPT09IFwiTU1cIikge1xuXHRcdGxvY2F0aW9uSW5pdGlhbHMgPSBcIk1pZGRsZSBNYXJzaFwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIk1PXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJNb3J0aW1lcidzIE1lYWRvd1wiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXG5cdH0gZWxzZSBpZihsb2NhdGlvbkluaXRpYWxzID09PSBcIlNBXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJTYW5kZm9yZCBMYWtlXCI7XG5cdFx0cmV0dXJuIGxvY2F0aW9uSW5pdGlhbHM7XG5cblx0fSBlbHNlIGlmKGxvY2F0aW9uSW5pdGlhbHMgPT09IFwiV1NcIikge1xuXHRcdGxvY2F0aW9uSW5pdGlhbHMgPSBcIldoaXRlIFN3YW4gTGFrZVwiO1xuXHRcdHJldHVybiBsb2NhdGlvbkluaXRpYWxzO1xuXHR9IGVsc2UgaWYobG9jYXRpb25Jbml0aWFscyA9PT0gXCJhbGwgbG9jYXRpb25zXCIpIHtcblx0XHRsb2NhdGlvbkluaXRpYWxzID0gXCJhbGwgbG9jYXRpb25zXCI7XG5cdFx0cmV0dXJuIGxvY2F0aW9uSW5pdGlhbHM7XG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1heE51bVJlc3VsdHMocmVzdWx0c0FyciwgdGhlU2VhcmNoKSB7XG5cdC8vIHRoaXMgaXMgd2hlcmUgbGF6eWxhZGluZyBvciBwYWdpbmF0aW9uIHNob3VsZCBoYXBwZW5cblx0aWYgKHRoZVNlYXJjaC5udW1PZlJlc3VsdHMgPiAyMDAwKSB7XG5cdFx0dGhlU2VhcmNoLmxpbWl0TnVtID0gXCJEaXNwbGF5aW5nIHRoZSBtb3N0IHJlY2VudCAyMDAwIHJlY29yZHMuXCI7XHRcdFxuXHRcdHJlc3VsdHNBcnIgPSByZXN1bHRzQXJyLnNsaWNlKDAsIDIwMDApO1xuXHR9IFx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmV2ZXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZykge1xuXHRkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy5zcGxpdCgnLScpO1x0XHRcblx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmdbMl0gKyBcIi1cIiArIGRhdGVTdHJpbmdbMV0gKyBcIi1cIiArIGRhdGVTdHJpbmdbMF07XG5cdHJldHVybiBkYXRlU3RyaW5nO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNvcnRCeURhdGUocmVzdWx0c0FyciwgdGhlU2VhcmNoKSB7XG5cdHJlc3VsdHNBcnIuc29ydChmdW5jdGlvbihhLCBiKXtcblx0IFx0dmFyIGRhdGVBID0gbmV3IERhdGUoYS5mb3JtYXR0ZWRfZGF0ZSksIFxuXHQgXHRcdGRhdGVCID0gbmV3IERhdGUoYi5mb3JtYXR0ZWRfZGF0ZSk7XG5cdCBcdHJldHVybiBkYXRlQiAtIGRhdGVBOyAvL3NvcnQgYnkgZGF0ZSBkZWNlbmRpbmdcblx0fSk7XG59O1xuIiwidmFyIHRoZVNlYXJjaCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRoZVNlYXJjaDsiXX0=
