"use strict";
var container = '.pagehead-actions';
$(document).ready(function() {
	
	var el = $(container);
	if (!el) {
		return;
	}

	//class="minibutton select-menu-button with-count js-menu-target"

	el.prepend("<li><a href='http://programming.com/'>majid</a></li>");
	console.log('loaded');

});



