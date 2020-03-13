function Reg() {
	var phone = $("#thePhone").val();
	var pwd = $("#thePwd").val();
	if (phone.length == 11 || pwd.length > 6) {
		$.ajax({
			type: "get",
			/*url:"http://localhost:8080/ajax1/three",*/
			url: "http://106.14.135.233:8080/ajax1/three",
			/*		url:"http://106.14.135.233:8080/ajax1/three",
			 */
			data: {
				use1: phone,
				pwd2: pwd
			},
			success: function(massge) {
				if (massge == "success") {
					layer.open({
						content: '注册成功，准备跳转',
						btn: '好的',
						yes: function(index, layero) {
							window.location.href = 'index.html';
						},

					});


				} else {
					//alert("用户已存在");
					layer.open({
						content: '该用户已存在！',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});

				}
			}
		});
	} else {
		$(".pho").html("手机号为11位");
		$(".pas").html("密码不少于6位");
		$('.pho').delay(2000).hide(0);
		$('.pas').delay(2000).hide(0);
	}

}

$(".dog").click(function() {
	Reg();
});


$(".back").click(function() {

	window.history.go(-1);
});
