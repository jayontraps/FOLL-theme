module.exports = function sortByDate(resultsArr, theSearch) {
	resultsArr.sort(function(a, b){
	 	var dateA = new Date(a.formatted_date), 
	 		dateB = new Date(b.formatted_date);
	 	return dateB - dateA; //sort by date decending
	});
};
