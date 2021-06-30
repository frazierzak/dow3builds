//url parser
var r = /[?|&](\w+)=(\w+)+/g;
var query = r.exec(window.location.href);

while (query != null) {
	
	$('img[alt="'+ query[2] + '"]').show();
	if(query[1] == "e1") {
		var firstElite = query[2];
	}
	if(query[1] == "e2") {
		var secondElite = query[2];
	}
	if(query[1] == "e3") {
		var thirdElite = query[2];
	}
	if(query[1] == "e1d") {
		$('.build_elite_docs img[alt="'+ query[2] + '"]').clone().insertAfter('.build_elites img[alt="'+ firstElite + '"]').show().css({
			"margin-right": "15px",
			"margin-left": "5px",
			"width": "50px",
			"height": "auto",
			"margin-bottom": "15px"
			});
	}
	if(query[1] == "e2d") {
		$('.build_elite_docs img[alt="'+ query[2] + '"]').clone().insertAfter('.build_elites img[alt="'+ secondElite + '"]').show().css({
			"margin-right": "15px",
			"margin-left": "5px",
			"width": "50px",
			"height": "auto",
			"margin-bottom": "15px"
			});
	}
	if(query[1] == "e3d") {
		$('.build_elite_docs img[alt="'+ query[2] + '"]').clone().insertAfter('.build_elites img[alt="'+ thirdElite + '"]').show().css({
			"margin-left": "5px",
			"width": "50px",
			"height": "auto",
			"margin-bottom": "15px"
			});
	}
	query = r.exec(window.location.href);
}

//Show parameters on page
function showValues() {
	var url = window.location.href; // Returns full URL
	url = url.split('build.html?')[1]
	var str = "index.html?" + url;
	$("#view").attr('href', str);
}
showValues();

//tooltip code
$( function() {
	$( document ).tooltip({
		tooltipClass: "tooltips",
		position: { my: "top+45", at: "center" },
		content: function () {
			return this.getAttribute("title")
		},
	});
} );