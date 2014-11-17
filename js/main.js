$(document).ready(function() {
	$("#createTutorial").click(function () {
		createTutorial();
	});
});


function createTutorial() {
	var placeholder = $('#placeholder');

	chrome.tabs.getSelected(null,function(tab) {
    	var url = tab.url;

    	$.ajax({
			url: "http://programming.com/api/1/posts/external",
			type: "POST",
			data: {
				url: url
			},
			success: function (resp) {
				createTab("http://programming.com/tutorial/"+resp.id+"/edit");
			},
			error: function (req, status, err) {
				$(location).attr('href', "../html/error.html?status="+status+"&err="+err);
			}
		});
	});
};


function createTab(url) {
	chrome.tabs.create({ url: url },function(tab){
		console.log('done?!');
	});
};