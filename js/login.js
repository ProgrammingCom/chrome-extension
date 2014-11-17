"use strict";

$(document).load(function() { 
	$("#spinner").fadeIn(); 
}).ready(function(){
	if (isLogedIn()) {
		refresh();
	}

	$("#spinner").fadeOut("slow"); 

	$("#login").click(function () {
		var username = $("#username").val().trim().toLowerCase();
		var password = $("#password").val().trim().toLowerCase();

		login(username, password);
	});
});


function login(username, password) {
	if(typeof(Storage) === "undefined") {
		alert("Unsupported browser!");
		return;
	}

	if (!username || !password) {
		alert("Missing login information!");
	}

	$.ajax({
		url: "http://teanab.com/api/1/oauth2/token",
		type: "POST",
		data: {
			client_id: "phoneapp",
			grant_type: "password",
			username: username,
			password: password
		},
		success: function (resp) {
			localStorage.setItem("access_token", resp.access_token);
			localStorage.setItem("refresh_token", resp.refresh_token);
			$(location).attr('href', "../html/main.html");
		},
		error: function (req, status, err) {
			console.log( 'something went wrong', status, err );
			$(location).attr('href', "../html/error.html");
		}
	});
};

function refresh() {
	var accessToken,
		refreshToken;

	if(typeof(Storage) === "undefined") {
		alert("Unsupported browser!");
		return;
	}

	accessToken = localStorage.access_token,
	refreshToken = localStorage.refresh_token;

	if (!accessToken || !refreshToken) {
		alert("Missing re-login information!");
		return;
	}

	$.ajax({
		url: "http://teanab.com/api/1/oauth2/token",
		type: "POST",
		data: {
			client_id: "phoneapp",
			grant_type: "refresh_token",
			Authentication: "Bearer " + accessToken,
			refresh_token: refreshToken
		},
		success: function (resp) {
			localStorage.setItem("access_token", resp.access_token);
			$(location).attr('href', "../html/main.html");
		},
		error: function (req, status, err) {
			console.log( 'something went wrong', status, err );
			$(location).attr('href', "../html/error.html");
		}
	});
};

function isLogedIn() {
	var accessToken,
		refreshToken;

	if(typeof(Storage) === "undefined") {
		alert("Unsupported browser!");
		return;
	}

	accessToken = localStorage.access_token,
	refreshToken = localStorage.refresh_token;

	if (!accessToken || accessToken === "undefined" || !refreshToken || refreshToken === "undefined") {
		return false;
	}

	return true;
};
