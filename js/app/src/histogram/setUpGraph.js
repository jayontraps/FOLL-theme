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

