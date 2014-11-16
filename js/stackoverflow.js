"use strict";
var container = '.module.sidebar-related';
$(document).ready(function() {
	
	var el = $(container);
	if (!el) {
		return;
	}

	$.ajax({
		url: "http://teanab.com/api/1/posts",
		type: "GET",
		data: {
		},
		success: function (resp) {
			var content = "<div class='module sidebar-related'><h4>Related Tutorials</h4>";

			for (var i = resp.items.length - 1; i >= 0; i--) {
				content += "<div class='spacer js-gps-track'>";
				content +=	"			<a href='" + resp.items[i].source.url + "' title='" + resp.items[i].title + "'>";
    			content +=	"				<div class='answer-votes default'>"+resp.items[i].score+"</div>";
				content +=	"			</a>";
				content +=	"			<a href='" + resp.items[i].source.url + "'' class='question-hyperlink'>" + resp.items[i].title + "</a>";
				content +=	"		</div>";
			};

			content += "</div>";

			el.before(content);
		},
		error: function (req, status, err) {
			console.log( 'something went wrong', status, err );
			// $(location).attr('href', "../html/error.html");
		}
	});
	//class="minibutton select-menu-button with-count js-menu-target"

	// el.prepend("<li><a href='http://programming.com/'>majid</a></li>");
	// console.log('loaded');

});



