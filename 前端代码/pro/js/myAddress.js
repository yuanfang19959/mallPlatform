$(document).ready(function(){
	$(".back").click(function(){
		$(location).attr("href","geren.html");
	});
	var phone=sessionStorage.getItem("phone");
	$("#apple").hide();
	sessionStorage.setItem("io","myaddress");
if(phone!=null){
	$.ajax({
			type:"get",
            url:"http://106.14.135.233:8080/buyCar/selAddress",
			data:{
            phone:phone
			},
			success:function(rs){
					 var jsobj=$.parseJSON(rs);
					 if(jsobj.index){
					 	
					 	$("#phone").html(jsobj.id);
					 	$("#name").html(jsobj.name);
					 	$("#address").html(jsobj.address);
					 	$("#apple").show();
					 	$(".ccc").click(function(){
						layer.open({
                                  title: [
                                       '提示',
                                       'background-color: #39F69C; color:#fff;margin:0;'
                                         ]
                                         ,content: '已经有地址了哦！'
                                         ,time:2
                                   });
						});
					 }else{
                        layer.open({
                                  title: [
                                       '提示',
                                       'background-color: #39F69C; color:#fff;margin:0;'
                                         ]
                                         ,content: '添加地址！'
                                         ,time:2
                                   });     
                        $(".ccc").click(function(){
						$(location).attr("href","insAdd.html");
						});

					 }
				}
			});	

/*	--------------------------------/**/
 		}else{
 			layer.open({
                                  title: [
                                       '提示',
                                       'background-color: #39F69C; color:#fff;margin:0;'
                                         ]
                                         ,content: '请先登录！'
                                         ,time:2
                                   }); 
 		}
/*	--------------------------------/**/

});
