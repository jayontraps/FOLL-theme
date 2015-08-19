var els = require('./els.js');

module.exports = function emptyList() {

	els.resultsList.find('tbody td').remove();		
	els.searchSummary.html('Results: ');
	$('.sort-icon').removeClass('active');
	els.resultsList_2.find('tbody td').remove();

};