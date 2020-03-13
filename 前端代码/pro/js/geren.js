$(document).ready(function() {
 	var phone = sessionStorage.getItem("phone");
 	// -------------------------------------------------------
 	if (phone != null) {
 		$("#mesage").html("欢饮您," + phone);
 		$("#btn").click(function() {
 			sessionStorage.clear();

 			layer.open({
 				type: 2,
 				content: '退出中',
 				time: 4
 			});
 			$(location).attr("href", "index1.html");
 			$("#mesage").html("请先登录");
 		});

 	} else {
 		$("#mesage").html("请先登录");
 		$("#btn").html("<span class='ui-btn-inner'><span class='ui-btn-text'>登录</span></span>");
 		$("#btn").click(function() {
 			$(location).attr("href", "index.html");
 		});
 	}
 	//--------------------------------------------------------
 	$(".sy").click(function() {
 		$(location).attr("href", "index1.html");
 	});

 	$(".buy").click(function() {
 		$(location).attr("href", "buycar.html");
 	});
 	/* 实现底部导航栏跳转*/

 	$(".user-order").click(function() {
 		$(location).attr("href", "myDD.html");
 	});

 	$("#myADD").click(function() {
 		$(location).attr("href", "myAddress.html");
	 });
	 
	 $('.user').click(function(){
		 $(location).attr("href","collection.html");
	 })

	$('.right').click(function () {
		$(location).attr("href", "geren.html");
	})
 });
