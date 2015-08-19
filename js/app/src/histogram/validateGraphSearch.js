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