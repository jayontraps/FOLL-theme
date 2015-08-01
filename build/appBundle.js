// extend global array prototype
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Array.max = function( array ){
//     return Math.max.apply( Math, array );
// };
 


jQuery(document).ready(function($) {

    // tinysort
    var table = document.getElementById('results'),
    	tableHead = table.querySelector('thead'),
    	tableHeaders = tableHead.querySelectorAll('th'),
    	tableBody = table.querySelector('tbody');

    tableHead.addEventListener('click',function(e){
        var tableHeader = e.target,
        textContent = tableHeader.textContent,
        tableHeaderIndex,isAscending,order;

        if (textContent!=='Date') {
            while (tableHeader.nodeName!=='TH') {
                tableHeader = tableHeader.parentNode;
            }
            tableHeaderIndex = Array.prototype.indexOf.call(tableHeaders,tableHeader);
            isAscending = tableHeader.getAttribute('data-order')==='asc';
            order = isAscending?'desc':'asc';
            tableHeader.setAttribute('data-order',order);
            tinysort(
                tableBody.querySelectorAll('tr'),
                {
                    selector:'td:nth-child('+(tableHeaderIndex+1)+')',
                    order: order
                }
            );
        }
    });


    $('th').on('click', function(){
        $('.sort-icon').removeClass('active');
        $(this).find('.sort-icon').addClass('active');
    });


    // dateDropdowns init
    $("#start").dateDropdowns({
        submitFieldName: 'start',
        monthFormat: 'short',
        minYear: '1994'
    });

    $("#end").dateDropdowns({
        submitFieldName: 'end',
        monthFormat: 'short',
        minYear: '1994'
    });  



    //Default Action
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content
    
    //On Click Event
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).show(); //Fade in the active content
        return false;
    });









});
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
				setUp(results);
			}
		});	
    },
    error: function() {
        // error code
    }
});	

var nano_options = {
    target: document.getElementById('overlay'),
    id: 'mynano'
};		
var nanobar = new Nanobar(nano_options);
nanobar.go( 50 ); // size bar 30%

var overlay = $('.overlay');
var search = "";
var locList = $('#locationSearch');
var resultsList = $('#results');	
var resultsList_2 = $('#results_2');
var searchSummary = $('#search-summary');
var radioInputs = $('input[type="radio"]');
var speciesH4 = $('#sp-name');

var setUp = function(results) {
				
	buildFormEls(results);			
	validateGraphSearch(results);
	arriveDepart(results);

	var addLoadingClass = function(){
	  var d = $.Deferred();
	    overlay.addClass('loading');
	    d.resolve();
	  	return d.promise();
	};


	var fireGenQ = function(){
	  var d = $.Deferred();
	  setTimeout(function() {
	    generateQuery(results);
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

			speciesH4.html("");
			radioInputs.prop('checked', false);
			if (window.myBar) {
				myBar.clear();
			}

		} else {
			speciesH4.html(": " + search);
		}

	});


	$('#submit').on('click', function(e) {	
		e.preventDefault();
		addLoadingClass().pipe(fireGenQ);
	});
};

var buildFormEls = function(results){

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

	nanobar.go(80);

	locationArray.sort();	
	var convertedLocName = "";	
	// build option tags - appendTo list
	for (var i = 0; i < locationArray.length; i++) {
		convertedLocName = locationInitialsToName(locationArray[i]);
		$('<option value="' + locationArray[i] + '">' + convertedLocName + '</option>').appendTo(locList);
	}

	speciesArray.sort();
	// pass to selectivity plugin 
	$(".speciesSearch").selectivity({
	    allowClear: true,
	    items: speciesArray,
	    placeholder: 'No species selected'
	});	

	nanobar.go(100); // Finish progress bar
	overlay.removeClass('loading');
};

var locationInitialsToName = function(locationInitials) {
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
	overlay.removeClass('loading');
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

	setTimeout(function(){ overlay.removeClass('loading'); }, 500);
};



// HISTOGRAM
var validateGraphSearch = function(results) {
		
	$('#generateGraph').on('click', function(event){

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

var setUpGraph = function(graphArr, graphObj) {

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


	// console.log(graphArrFinalLength);
	console.log("hello tere");




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
		}	

	}
};


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
	    overlay.addClass('loading');
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
	$(newRows.html()).appendTo(resultsList_2);

	setTimeout(function(){ overlay.removeClass('loading'); }, 300);

	// reset 
	finalArrLen.length = 0;

};