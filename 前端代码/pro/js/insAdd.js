$(document).ready(function() {
	$("#btn").click(function() {
		var thePhone = sessionStorage.getItem('phone');
		var theName = $("#theName").val();
		var theAddress = $("#theAddress").val();
		var io = sessionStorage.getItem('io');
		if (thePhone.length == 11 || theName.length != 0 || theAddress.length != 0) {
			$.ajax({
				type: "get",
				// url:"http://localhost:8080/buyCar/insertAddress",
				url: "http://106.14.135.233:8080/buyCar/insertAddress",
				data: {
					phone: thePhone,
					name: theName,
					theAddress: theAddress
				},
				success: function(rs) {
					var jsobj = $.parseJSON(rs);
					if (jsobj.status == "600") {
						alert(jsobj.msg);
						if (io == "pay") {
							$(location).attr("href", "pay.html");
						} else {
							$(location).attr("href", "myAddress.html");
						}
					}
				}
			});
		} else {
			alert("请输入完整后在提交！");
		}
	});
});
