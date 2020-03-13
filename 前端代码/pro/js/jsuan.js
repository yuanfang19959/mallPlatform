$(document).ready(function() {
	$("#apple").hide();
	$("#apple2").hide();
	var phone = sessionStorage.getItem("phone");
	sessionStorage.setItem("io", "pay");
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

	$.ajax({
		type: "GET",
		//url:"http://localhost:8080/buyCar/PersonCar", 
		url: "http://106.14.135.233:8080/buyCar/PersonCar",
		data: {
			uID: phone,
		},

		success: function(rs) { //成功的回调函数
			var jsonobj = $.parseJSON(rs);
			str = "";
			var pr = 0;
			$.each(jsonobj, function(idx, obj) {
				$("<div class='car1' id=" + obj.id + " name=" + obj.price + "><img src='" + obj.pic +
					"'><span class='title'>" + obj.name + "</span><span class='price'>¥<a class='rmb'></hr>" + obj.price +
					"</a>元</span><span class='delete' >数量：" + obj.bcount + "</span></div>").appendTo(".h");

				pr = obj.price * obj.bcount + pr;
				sessionStorage.setItem('price', pr);


			});
			var c = sessionStorage.getItem("price");
			$("#bigP").html("￥" + c);
		}
	});
	// ---------------------------------12/22------------------------------------
	var spid = sessionStorage.getItem("spID");
	$(".btn").click(function() {

		$.ajax({
			type: "get",
			//url:"http://localhost:8080/buyCar/toMymore",
			url: "http://106.14.135.233:8080/buyCar/toMymore",
			data: {
				phone: phone,
			},
			success: function(vi) {
				var jbj = $.parseJSON(vi);
				if (jbj.status == "600") {
					//alert(jbj.msg);
					$(location).attr("href", "lbt.html");
				} else {
					alert("请稍后再试！");
				}
			}
		});
	});
	// ---------------------------------12/22------------------------------------
});
