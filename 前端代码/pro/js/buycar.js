$(document).ready(function() {
 	$(".sy").click(function() {
 		$(location).attr("href", "index1.html");
 	});

 	$(".me").click(function() {
 		$(location).attr("href", "geren.html");
 	});
 	/* 实现底部导航栏跳转*/

 	$(".delete").click(function() {
 		$(this).parent().hide();
 	});
 	// ---------------2018/12/22-------------------
 	var phone = sessionStorage.getItem("phone");
 	if (phone != null) {
 		// ---------------2018/12/22-------------------

 		$("#buyRight").click(function() {
 			$(location).attr("href", "jsuan.html");
 		});


 		// ---------------2018/12/22------------------- 
 	} else {
 		$("#buyRight").click(function() {
 			// alert("*^*请先登录！");
 			layer.open({
 				title: [
 					'提示',
 					'background-color: #FF4351; color:#fff;margin:0;'
 				],
 				content: '请先登录！',
 				time: 2
 			});
 		});
 	}
 	// ---------------2018/12/22-------------------
 	var uID = sessionStorage.getItem('phone');
 	$.ajax({
 		type: "GET",
 		//url:"http://localhost:8080/buyCar/PersonCar", 
 		url: "http://106.14.135.233:8080/buyCar/PersonCar",
 		data: {
 			uID: uID,
 		},

 		success: function(rs) { //成功的回调函数
 			var jsonobj = $.parseJSON(rs);
 			str = "";
 			var pr = 0;
 			$.each(jsonobj, function(idx, obj) {
 				if (obj.bcount != 0) {
 					$("<div class='car1' id=" + obj.id + " name=" + obj.price + " alt=" + obj.bcount + "><img src='" + obj.pic +
 						"'><span class='title'>" + obj.name + '<br><br>' + "数量:" + obj.bcount +
 						"</span><span class='price'>¥<a class='rmb'>" + obj.price +
 						"</a>元</span><span class='alter' >修改&nbsp;</span><span class='delete' >删除</span></div>").appendTo(".h");
 					/*--------------------------*/
 				}
 				pr = obj.price * obj.bcount + pr;

 				sessionStorage.setItem('price', pr);
 				/*--------------------------*/
 			});

 			/*--------------------------*/
 			var c = sessionStorage.getItem("price");
 			if (c == null) {
 				$(".pi").html("￥0");
 			} else {
 				$(".pi").html("￥" + c);
 			}
 			/*                           -------seesion为空的情况下---------------------
 			 */
 			/*-------实现购物车价格-------*/

 			$(".h").on("click", ".delete", function() {
 				// ..................................2019/1/1.....
 				layer.open({
 					content: '您确定要删除此件商品吗？',
 					btn: ['是的', '点错了'],
 					yes: function(index) {
 						location.reload();
 						layer.close(index);
 					}
 				});
 				// ..................................2019/1/1.....
 				// ........以下根据上述购物车计算价格...........
 				var de = parseInt($(this).parents(".car1").attr("name"));
 				var bc = parseInt($(this).parent(".car1").attr("alt"));

 				var ca = sessionStorage.getItem("price") - de * bc;
 				sessionStorage.setItem('price', ca);
 				var cb = sessionStorage.getItem("price"); //存入减去删除商品的价格
 				$(".pi").html("￥" + cb);
 				// ............................................

 				$(this).parents(".car1").remove();


 				var proID = $(this).parents(".car1").attr("id");
 				var sessionID = sessionStorage.getItem('phone');

 				/*--------------------*/
 				$.ajax({
 					type: "GET",
 					//url:"http://localhost:8080/buyCar/DelPro", 
 					url: "http://106.14.135.233:8080/buyCar/DelPro",
 					data: {
 						pID: proID,
 						uID: sessionID
 					},
 					/*url:"http://localhost:8080/buyCar/Give",    */
 					success: function(rs) { //成功的回调函数
 						var jsonobj = $.parseJSON(rs);
 						if (jsonobj.status == 600) {
 							// ------------12/26----------------
 							layer.open({
 								title: [
 									'提示',
 									'background-color: #FF4351; color:#fff;margin:0;'
 								],
 								content: jsonobj.msg,
 								time: 2
 							});
 							// ------------12/26---这边需要改成确认框，确认是否删除-------------
 						}

 					}
 				});

 				/*--------------------*/
 			});
 			// ---------------2019/1/1-------------------------------- 
 			$(".h").on("click", ".alter", function() {
 				alert("要修改吗！");
 			});
 			// ---------------2019/1/1--------------------------------   

 		}

 	});




 });
