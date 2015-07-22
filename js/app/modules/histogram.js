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

