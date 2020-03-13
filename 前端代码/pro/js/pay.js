$(document).ready(function() {
	$("#apple").hide();
	$("#apple2").hide();
	var phone = sessionStorage.getItem("phone");
	sessionStorage.setItem("io", "pay");
	var price = sessionStorage.getItem("thisPrice");
	$(".mc-t").html("¥" + price);
	$("#bigP").html("¥" + price);
	$(".myorder-text h1").html(sessionStorage.getItem("thisName"));
	$("#bana").attr("src", sessionStorage.getItem("thisPic"));

	$.ajax({
		type: "get",
		//url:"http://localhost:8080/buyCar/selAddress",
		url: "http://106.14.135.233:8080/buyCar/selAddress",
		data: {
			phone: phone
		},
		success: function(rs) {
			var jsobj = $.parseJSON(rs);
			if (jsobj.index) {

				$("#phone").html(jsobj.id);
				$("#name").html(jsobj.name);
				$("#address").html(jsobj.address);
				$("#apple").show();
			} else {
				$("#apple2").show();
				$("#apple2").click(function() {
					$(location).attr("href", "insAdd.html");
				});
			}
		}
	});
	// ---------------------------------12/22------------------------------------
	var spid = sessionStorage.getItem("spID");
	$(".btn").click(function() {

		$.ajax({
			type: "get",
			//url:"http://localhost:8080/buyCar/toMyDD",
			url: "http://106.14.135.233:8080/buyCar/toMyDD",
			data: {
				phone: phone,
				pid: spid
			},
			success: function(vi) {
				var jbj = $.parseJSON(vi);
				if (jbj.status == "600") {
					// ------------12/26----------------
					layer.open({
						content: '购买成功',
						btn: '好的',
						yes: function(index, layero) {
							window.location.href = 'index1.html';
						},

					});

					// ------------12/26----------------

				} else {
					alert("请稍后再试！");
				}
			}
		});

	});
	// ---------------------------------12/22------------------------------------
});
