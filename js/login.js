"use strict";

// Check if defaults are loaded
if (!baseUrl) {
	die('something went wrong');
};

$(document).ready(function() {
	if (isLogedIn()) {
		refresh();
	}
	$("#alertBox").hide();
	$("#spinner").fadeOut("slow");

	$("#login").click(function () {
		$("#alertBox").hide();
		var username = $("#username").val().trim().toLowerCase();
		var password = $("#password").val().trim().toLowerCase();

		login(username, password);
	});
});

function login(username, password) {
	if(typeof(Storage) === "undefined") {
		goTo("error", {status:"Unsupported browser!", err:null});
	}

	if (!username || !password) {
		$("#alertBox").html("Missing login information!");
		$("#alertBox").fadeIn("slow");
		return;
	}

	$.ajax({
		url: baseUrl + "oauth2/token",
		type: "POST",
		data: {
			client_id: "phoneapp",
			grant_type: "password",
			username: username,
			password: password
		},
		success: function(resp) {
			if (resp.code === 400) {
				$("#alertBox").html("Invalid username or password");
				$("#alertBox").fadeIn("slow");
				return;
			};

			localStorage.setItem("access_token", resp.access_token);
			localStorage.setItem("refresh_token", resp.refresh_token);
			goTo("main");
		},
		error: function (req, status, err) {
			$("#alertBox").html(status);
			$("#alertBox").fadeIn("slow");
			console.log('something went wrong', status, err );
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
		url: baseUrl + "oauth2/token",
		type: "POST",
		data: {
			client_id: "phoneapp",
			grant_type: "refresh_token",
			Authentication: "Bearer " + accessToken,
			refresh_token: refreshToken
		},
		success: function (resp) {
			localStorage.setItem("access_token", resp.access_token);
			goTo("main");
			// $(location).attr('href', "../html/main.html");
		},
		error: function (req, status, err) {
			console.log( 'something went wrong', status, err );
			goTo("error", {status:status, err:err});
			// $(location).attr('href', "../html/error.html");
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
