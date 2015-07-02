var wWidth=$(window).width();
$(document).ready(function() {
	var videoEnd = function(){
		//$("#banner1").show(200);
	  	//$(".watch").show(200);
		//$("#videoHolder1").hide(200);
		$("#videoHolder1").css("display","none");
		$(".watch").css("display","block");
		$("#banner1").css("display","block");
		//$("#videoHolder1").fadeOut();
		/*$("#videoHolder1").css("display","none");
		$("#banner1").fadeIn();
		$(".watch").fadeIn();*/
	};
	
	//Play video1
	$(".watch").click(function(){
		$("#videoHolder1").fadeIn(500);
		$("#banner1").fadeOut(500);
		
	   /*setTimeout(function(){
			_V_("my_video_1").play();
			_V_("my_video_1").addEvent("ended", videoEnd);
			},0);*/
	    _V_('my_video_1').ready(function() {
			_V_("my_video_1").play();
			_V_("my_video_1").addEvent("ended", videoEnd);
		});
	   $(".watch").hide();
		
	});
});