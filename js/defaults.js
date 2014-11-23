var baseUrl = "https://programming.com/api/1/",
	basePath = "../html/";


function goTo(page, params) {
	var path = "";
	switch(page) {
    case "error":
        path = basePath + "error.html";
        break;
    case "forget":
        path = basePath + "forget.html";
        break;
    case "main":
        path = basePath + "main.html";
        break;
    default:
        path = basePath + "error.html";
	};

	$(location).attr('href', path);
};