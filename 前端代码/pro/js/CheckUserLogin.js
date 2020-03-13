function lixl() {
	var phone = $("#thePhone").val();
	var pwd = $("#thePwd").val();
	var temp = [];
	if (phone.length == 11 && pwd.length >= 6) {
		$.ajax({
			type: "post",
			url: "http://106.14.135.233:8080/ajax1/three",
			data: {
				key_a: phone,
				use: pwd
			},
			success: function(massage) {
				if (massage == 'success') {
					layer.open({
						type: 2,
						content: '加载中',
						time: 3
					});
					sessionStorage.setItem('phone', phone); // 存入一个值
					localStorage.setItem(phone,JSON.stringify(temp))
					localStorage.setItem('tel',phone)
					$(location).attr("href", "index1.html");
				} else {
					$(".pas").html("密码错误");
					$('.pas').delay(2000).hide(0);
				}
			}
		});
	} else {

		layer.open({
			content: '格式错误请输入正确的手机号和密码！',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		$(".pho").html("手机号为11位");
		$(".pas").html("密码不少于6位");

		$('.pho').delay(2000).hide(0);
		$('.pas').delay(2000).hide(0);
	}


}

$("#btn").click(function() {
	$("#btn").attr("rel", "external");

	lixl();
});

$("#btn2").click(function() {

	$(location).attr("href", "regist.html");
});

$(".skip").click(function() {

	$(location).attr("href", "index1.html");
});

$(".back").click(function() {

	window.history.go(-1);
});
