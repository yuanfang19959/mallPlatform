$(document).ready(function() {
	$("#addre").hide();
	$(".show").click(function() {
		$("#addre").toggle();
		$.ajax({
			type: "get",
			url: "http://106.14.135.233:8080/buyCar/selAddress",
			data: {
				phone: phone
			},
			success: function(rs) {
				var jsobj = $.parseJSON(rs);
				$(".phone").html(jsobj.id);
				$(".zzb").html(jsobj.name);
				$(".add").html(jsobj.address);
			}
		});
	})
	var phone = sessionStorage.getItem('phone');
	$.ajax({
		type: "GET",
		//url:"http://localhost:8080/buyCar/needMyDD", 
		url: "http://106.14.135.233:8080/buyCar/needMyDD",

		// url:"http://106.14.135.233:8080/buyCar/PersonCar",   
		data: {
			uID: phone,
		},

		success: function(rs) { //成功的回调函数
			var jsonobj = $.parseJSON(rs);
			str = "";
			var pr = 0;
			$.each(jsonobj, function(idx, obj) {
				// $("<div class='car1' id="+obj.id+" name="+obj.price+"><img src='"+obj.pic+"'><span class='title'>"+obj.name+"</span><span class='price'>¥<a class='rmb'></hr>"+obj.price+"</a>元</span><span class='delete' >数量：1</span></div>").appendTo(".h");
				$("<div class='myorder-sum fl'><img src='" + obj.pic + "' class='dog'></div><div class='myorder-text'><h1>" +
					obj.name + '</h1><br><div class="myorder-cost"><span>数量:1</span><span class="mc-t">' + "¥" + obj.price +
					'元</span></div></div>').appendTo(".h");

				pr = obj.price + pr;
				sessionStorage.setItem('price1', pr);
				// alert(obj.price);

			});
			var c = sessionStorage.getItem("price1");
			// ----------------------------
			if (c != null) {
				$("#bp").html("合计：¥" + c);
			} else {
				$("#bp").html("合计：¥" + 0);
				layer.open({
					title: [
						'提示',
						'background-color: #39F69C; color:#fff;margin:0;'
					],
					content: '请先登录！',
					time: 2,
					end: function() {
						$(location).attr("href", "geren.html");
					}
				});
				// $(location).attr("href","geren.html");
			}
			// ----------------------------
		}
	});

	$(".back").click(function() {
		$(location).attr("href", "geren.html");
		sessionStorage.setItem("price", 0);
	});

	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function() {
		history.pushState(null, null, document.URL);
	});

});
