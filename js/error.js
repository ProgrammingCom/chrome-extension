"use strict";

$(document).ready(function() {
	var err = getParameterByName("err"),
		status = getParameterByName("status");
	if (err || status) {
		console.log('something went wrong', status, err);
	} else {
		console.log('something went wrong');
	};
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}