// config 
var foll = foll || {};
foll.config = {
	// Please add site URL here (no trailing forward slash)

	siteUrl: "http://localhost/foll",
	// siteUrl: "http://foll.jayontraps.com",	
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

