module.exports = function reverseDateString(dateString) {
	dateString = dateString.split('-');		
	dateString = dateString[2] + "-" + dateString[1] + "-" + dateString[0];
	return dateString;
};