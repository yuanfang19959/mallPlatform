$(document).ready(function() {
	var phone = sessionStorage.getItem('phone');
	$.ajax({
		type: "get",
		//url:"http://localhost:8080/buyCar/delAfeterBuy",
		url: "http://106.14.135.233:8080/buyCar/delAfeterBuy",
		data: {
			phone: phone
		},
		success: function(ff) {
			var gof = $.parseJSON(ff);
			if (gof.status == "600") {
				$(location).attr("href", "index1.html");
				sessionStorage.setItem('price', 0);
			}
		}
	});
})
