$(document).ready(function() {
	var pID = sessionStorage.getItem('spID');
	var sessionID = sessionStorage.getItem('phone');
	$(".pi").html("￥" + sessionStorage.getItem("thisPrice"));
	$("#addCar").click(function() {
		sessionStorage.setItem("count", 1);
		layer.open({
			type: 1,
			content: '<div><span class="conut">购买数量</span><span class="plus"><a class="jian">-</a><a class="mid">1</a><a class="jia">+</a></span></div><div class="bigbut"><a class="but">确定</a></div>',
			anim: 'up',
			style: 'position:fixed; bottom:0; left:0; width: 100%; height: 180px; padding:10px 0; border:none;'
		});
	});

	var spID = sessionStorage.getItem('spID');
	var sessionID = sessionStorage.getItem('phone');
	$.ajax({
		type: "get",
		/*url:"http://localhost:8080/buyCar/getProFlex",*/
		async: true,
		url: "http://106.14.135.233:8080/buyCar/getProFlex",
		data: {
			spID: spID,
		},
		success: function(data) {
			var jsonobj = $.parseJSON(data);
			$.each(jsonobj, function(idx, obj) {

				$(".proName").html(obj.pName);
				$(".pic1").attr("src", obj.p1);
				$("#pic2").attr("data-original", obj.p2);
				$("#pic3").attr("data-original", obj.p3);
				$("#pic4").attr("data-original", obj.p4);
				$("#pic5").attr("data-original", obj.p5);
				$("img.lazy").lazyload({
					effect: "fadeIn", //这个是显示效果 还有 show 和 sildeshow
					placeholder: 'img/load.gif', //这个是加载前的显示图片
					threshold: 20, //滚动到距离图片20px时，图片就开始再开始加载
					//event : "click",//图片点击后，才开始加载
					//container: $("#container"),//在滚动容器内的时候用这个，其中后面是选中的容器的id，前提是容器有scroll
					failure_limit: 10, //页面布局图片的顺序和html图片代码的顺序不一致;它会导致本该加载的没有加载,用它，尽量设置的高些
					skip_invisible: true, //为了提升性能，插件默认忽略隐藏的图片；如果想要加载隐藏图片.设置skip_invisible为false;

				});
			})
		}
	});

	//上面是获取商品详情
	$(".backToindex").click(function() {
		$(location).attr("href", "index1.html");
	});

	$(".toBuyCar").click(function() {
		$(location).attr("href", "buycar.html");
	});
	$("#rightNow").click(function() {
		$(location).attr("href", "pay.html");
	});

	$(document).on('click', '.jia', function() {
		var c = $(".mid").html();
		var a = parseInt(c) + 1;
		$(".mid").html(a);
		sessionStorage.setItem("count", a);
	});

	$(document).on('click', '.jian', function() {
		var c = $(".mid").html();
		var a = parseInt(c) + 1;
		var d = sessionStorage.getItem("count")
		if (d == 1) {
			alert("不能剪了");
			//ert(sessionStorage.getItem("count"))
		} else {
			var d = sessionStorage.getItem("count") - 1;
			$(".mid").html(d);
			sessionStorage.setItem("count", d);
			//alert(sessionStorage.getItem("count"));
		}
	});

	$(document).on('click', '.layui-m-layershade', function() {
		location.reload();
	})

	$(document).on('click', '.but', function() {
		var count = sessionStorage.getItem("count");
		$(this).parents('div').hide();

		$.ajax({
			type: "get",
			// url:"http://localhost:8080/buyCar/newInsertPro",
			url: "http://106.14.135.233:8080/buyCar/newInsertPro",
			data: {
				pID: spID,
				uID: sessionID,
				count: count

			},
			success: function(message) {
				// ------------12/26----------------
				layer.open({
					title: [
						'提示',
						'background-color: #FF4351; color:#fff;margin:0;'
					],
					content: "加入成功！",
					time: 2,
					end: function() {
						location.reload(); //刷新
					}
				});

				// ------------12/26---这边需要改成确认框，确认是否删除-------------
			}
		});
	})

	// ............................................
	// 根据之前的按钮 加入购物车进行判断




});
