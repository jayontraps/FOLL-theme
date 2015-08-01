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





