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