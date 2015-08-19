module.exports = function maxNumResults(resultsArr, theSearch) {
	// this is where lazylading or pagination should happen
	if (theSearch.numOfResults > 2000) {
		theSearch.limitNum = "Displaying the most recent 2000 records.";		
		resultsArr = resultsArr.slice(0, 2000);
	} 	
};