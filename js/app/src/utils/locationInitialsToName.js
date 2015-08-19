module.exports = function locationInitialsToName(locationInitials) {
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
