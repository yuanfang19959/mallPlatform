$(document).ready(function() {
	$.ajax({
		type: "GET",
		/*url:"http://localhost:8080/buyCar/Give", */
		url: "http://106.14.135.233:8080/buyCar/Give",
		success: function(rs) { //成功的回调函数
			var jsonobj = $.parseJSON(rs);
			str = "";
			// $.each(jsonobj, function(idx, obj) {
			// 	$("<div class='car1' id=" + obj.id + " name=" + obj.price + "><img src='" + obj.pic +
			// 		"'><span class='title'>" + obj.name + "</span><span class='price'>¥<a class='rmb'>" + obj.price +
			// 		"</a>元</span><img class='gou' src='img/gou.png' ></img></div><br>").appendTo(".h");
			// });

			$.each(jsonobj, function(idx, obj) {
				$("<div class='car1' id=" + obj.id + " name=" + obj.price + "><img data-original=" + obj.pic +
					" class='lazy' width='80' height='80'/><span class='title'>" + obj.name + "</span><span class='price'>¥<a class='rmb'>" + obj.price +
					"</a>元</span><img class='gou' src='img/gou.png' ></img></div><br>").appendTo(".h");
			$("img.lazy").lazyload({
					effect: "fadeIn", //这个是显示效果 还有 show 和 sildeshow
					placeholder: 'img/load.gif', //这个是加载前的显示图片
					threshold: 35, //滚动到距离图片20px时，图片就开始再开始加载
					//event : "click",//图片点击后，才开始加载
					//container: $("#container"),//在滚动容器内的时候用这个，其中后面是选中的容器的id，前提是容器有scroll
					failure_limit: 100, //页面布局图片的顺序和html图片代码的顺序不一致;它会导致本该加载的没有加载,用它，尽量设置的高些
					skip_invisible: true, //为了提升性能，插件默认忽略隐藏的图片；如果想要加载隐藏图片.设置skip_invisible为false;

				});
			});
			/*.................................................................................*/
			$(".h").on("click", ".car1", function() {
				var pID = $(this).attr("id");
				sessionStorage.setItem('spID', pID);

				var thisPrice = $(this).attr("name");
				sessionStorage.setItem('thisPrice', thisPrice);

				//将点击的商品的id存入session中 供另一个网页查找此id的详细信息；
				var thisPic = $(this).children("img").attr("src");
				sessionStorage.setItem('thisPic', thisPic);

				var thisName = $(this).children(".title").html();
				sessionStorage.setItem('thisName', thisName);

				// --------------------------------
				var phone = sessionStorage.getItem("phone");
				if (phone != null) {
					// --------------------------------
					$(location).attr("href", "proFlex.html");
					// --------------------------------
				} else {
					// alert("请先登录！");
					layer.open({
						title: [
							'提示',
							'background-color: #FF4351; color:#fff;margin:0;'
						],
						content: '请先登录！',
						time: 2
					});
				}
				// --------------------------------
			});

			/*.................................................................................*/
			$(".h").on("click", ".gou", function(e) {
				e.stopPropagation();
				/* 阻止事件冒泡*/

				var proID = $(this).parents(".car1").attr("id");
				var sessionID = sessionStorage.getItem('phone');

				/*--------------------*/
				if (sessionID != null) {
					sessionStorage.setItem("count", 1);
					var count = sessionStorage.getItem("count");
					$.ajax({
						type: "GET",
						//url:"http://localhost:8080/buyCar/newInsertPro", 
						url: "http://106.14.135.233:8080/buyCar/newInsertPro",
						data: {
							pID: proID,
							uID: sessionID,
							count: count
						},
						/*url:"http://localhost:8080/buyCar/Give",    */
						success: function(rs) { //成功的回调函数
							//alert("加入成功！我在购物车等你哦*-*")
							var jsonobj = $.parseJSON(rs);
							if (jsonobj.status == 600) {
								// alert(jsonobj.msg); 
								layer.open({
									title: [
										'提示',
										'background-color: #FF4351; color:#fff;margin:0;'
									],
									content: jsonobj.msg,
									time: 2
								});
								event.stopPropagation();
							}

						}
					});
				} else {
					//alert("请先登录！");
					layer.open({
						title: [
							'提示',
							'background-color: #FF4351; color:#fff;margin:0;'
						],
						content: "请先登录！",
						time: 2
					});
				}


				/*--------------------*/

			});


		}

	});
	$(".buy").click(function() {
		$(location).attr("href", "buycar.html");
	});

	$(".me").click(function() {
		$(location).attr("href", "geren.html");
	});

	//以下防止页面回退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function() {
		history.pushState(null, null, document.URL);
	});



	$(".con").click(function() {
		layer.open({
			title: [
				'提示',
				'background-color: #FF4351; color:#fff;margin:0;'
			],
			content: '请先登录！',
			time: 3
		});
	});
}); //此为最大括号哦
