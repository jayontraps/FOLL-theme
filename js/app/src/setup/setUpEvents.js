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

