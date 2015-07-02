var screenUrl="";
var menuCount=0;
var currMod="";
var currSlide="0";
var listArray= new Array()
var currSpecSlide= "";
var listCount = 0;
var navClicked=0;
var xmlLoaded =0;
var loadActChk = 0;
var timeoutId = 0;
var navClicked1=0;



$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}

function ittloadpage(){
	$.ajax({
		type: "GET",
		url: "xml/shell.xml",
		dataType: "xml",
		success: function(xml){
			xmlData = $(xml);
		    $(xmlData).find('screens').each(function(){
                currMod= $(this).attr("mod");
			});
            loadListItems();
            sscResizeWindow();
			navig();
			xmlLoaded =1;
        },
		complete:function(){
			bindEvents();
			if(xmlLoaded ==1){
				$('.sscWrapper').fadeIn(1000);
				$('.sscLoader').fadeOut(200);
            }
            $(document).bind('contextmenu', function (e) {
                    e.preventDefault();
            });
		},
		error:function(){alert("XML Error")},
	});
	
	$(window).bind(
	  'touchmove',
	   function(e) {
		e.preventDefault();
	  }
	);
}

$( window ).resize(function() {
    sscResizeWindow();
});

function sscResizeWindow(){
    var height1 = $(window).height()-$('.sscBranding').height()-$('.navigator').height();
    var pad1 = ( $(window).width()- $('.sscActivity').width() ) /2 ;
    var pad2 = ($(window).height()-$('.sscBranding').height()-$('.navigator').height()-$('.sscActivity').height())/2;
    $('.sscmaincontainer').css ("padding-left",pad1+"px").css ("padding-right",pad1+"px").css("background","#FFF"); 
     
	$('#animationPatch').css("height",$('.sscActivity').height()).css("width",$('.sscActivity').width()).css("left",$('.sscActivity').position().left).css("top",$('.sscActivity').position().top);
	$('#sscCover').css("height",$('.sscActivity').height()).css("width",$('.sscActivity').width()).css("left", $('.sscActivity').position().left).css("top",$('.sscActivity').position().top);
	$('.loader_overlay').css('padding-top',($('.sscActivity').height()/2)-25);
	
	var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) ;
    if (isSafari && isiPad){
		$('.sscBody').css('height','98%');
		$('.sscNav').css("height",(parseInt(height1)*(98/100))+"px");
		$('.sscmaincontainer').css("height",(parseInt(height1)*(98/100))+"px");
		
	}else{
		$('.sscNav').css("height",height1+"px");
		$('.sscmaincontainer').css("height",height1+"px");
	}
}

function loadListItems(){
    $('.sscNav').append('<ul id="nav"></ul>');
    $(xmlData).find('screens').find('screen').each(function(j){
        var jj= j;
		if($(this).attr("nestedOff")==""){
		    if ($(this).attr("hasSub")=="1"){
				if ($(this).text().length>40){
					$('#nav').append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+$(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a class="hasSub" style ="line-height:1.3em;padding-top: 6px;padding-right:25px;height: 44px;">'+$(this).text()+'</a><ul class="sub" id="sub'+$(this).attr("id")+'"></ul></li>');
				} else {
					$('#nav').append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+$(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a class="hasSub">'+$(this).text()+'</a><ul class="sub" id="sub'+$(this).attr("id")+'"></ul></li>');
				}
			}else if($(this).attr("isSub")=="1") {
				if ($(this).text().length>40){
					$('#sub'+$(this).attr("subOff")).append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+$(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a style ="line-height:1.3em;padding-top: 6px;padding-right: 8px;height: 44px;">'+$(this).text()+'</a></li>');
				}else {
					$('#sub'+$(this).attr("subOff")).append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+$(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a>'+$(this).text()+'</a></li>');
				}
			}else{
				 if ($(this).text().length>40){
				
                	$('#nav').append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+ $(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a style ="line-height:1.3em;padding-top: 6px;padding-right: 8px;height: 44px;">'+$(this).text()+'</a></li>');
				}else{
					$('#nav').append('<li id = "'+$(this).attr('id')+'" class="navDrop" datatype ="'+ $(this).attr('type') +'" dataTitle="'+ $(this).text()+'" datalink="'+ $(this).attr('screenName')+'"><a>'+$(this).text()+'</a></li>');
				}
            }
            menuCount++;
			listArray.push({"id":jj,"value":$(this).attr('id'),"type":$(this).attr('type'),"screenName":$(this).attr('screenName'),"screenTitle":$(this).text(),"nested":"no"});
        }else{
			listArray.push({"id":jj,"value":$(this).attr('id'),"type":$(this).attr('type'),"screenName":$(this).attr('screenName'),"screenTitle":$(this).text(),"nested":"yes"});
        }
		listCount++;    
    });
	navig();
    currSlide= 1;
    currSpecSlide = 0;
    $('#currentSlide').html(currSlide + " of " + menuCount);
    setTimeout(function(){
        $('#'+currSlide + '>a').trigger('click');	
        sscResizeWindow();
    },10);
    $('#prev_bn').attr('disabled','disabled').addClass('prevbtn_disable').removeClass('prevbtn_enable').css('opacity','0.5');
}

function loadAct(su){
    $('.sscActivity').css('opacity', 0);
    $('#animationPatch').fadeIn(10);
    $('#animationPatch').html('<div class="loader_overlay"><img src="images/ajax_loader.gif"></img></div>');
	$('.loader_overlay').css('padding-top',($('.sscActivity').height()/2)-25);
	setTimeout(function(){
		var url = su +'.html';
		try {
			setTimeout(function(){
				$('div.sscActivity').load(url);
				loadActChk =1;
				sscResizeWindow();
				if (loadActChk==1){
					setTimeout(function(){
						$('.sscActivity').css('opacity', 1);
						$("#animationPatch").fadeOut("slow");
						loadActChk =0 ;
						sscResizeWindow();
					},500);
				}
			},300);
		}catch(err){
			alert(err);
		}
	},300);
}

function navig(){
    $('#nav > li>a').click(function(e){
        if (!$(this).hasClass('active')){
            $('#nav li ul').slideUp(150);
            $(this).next().slideToggle(150);
            $('#nav li a').removeClass('active');
            $(this).addClass('active');
        }else{
		}
    });
}


function chkBeads(beed,curr){
    $('.sscBeeds').empty();
	var chkNested = 0;
    $(xmlData).find('screen').each(function(){
       if($(this).attr('id')==beed){
            var xmlBeed =  $(this).attr('id') +""+$(this).attr('type') +""+$(this).attr('screenName') +""+ $(this).text();
			if (curr == xmlBeed ){
                $('.sscBeeds').append('<div class="sscActiveBeeds"></div>');
            }else{    
                $('.sscBeeds').append('<div class="sscInActiveBeeds"></div>');
            }
			chkNested++;
        }
    });
	if (chkNested <= 1){
		$('.sscBeeds').empty();
	}
}

function bindEvents(){
	$('#sscCover').unbind('click').bind('click', function(){
        $('#sschome_logo').trigger('click');
	});
	$('.navigator').unbind('click').bind('click', function(){
        if  ($('.sscNav').hasClass('navVisible'))      
        $('#sschome_logo').trigger('click');
	});
	$('.book_title').unbind('click').bind('click', function(){
        $('.navigator').trigger('click');
	});
	$('.show_level').unbind('click').bind('click', function(){
        $('.navigator').trigger('click');
	});
	$('#sschome_logo').unbind('click').bind('click', function(){
		if(navClicked1==1){
			return;
		}
		navClicked1 =1;
        if ($('.sscNav').hasClass('navleft')){
            $('.sscNav').css("overflow-y"," hidden");
			$('.sscNav').removeClass('navleft').addClass('navVisible').animate({'left':'0%'},{
				duration: 500,
				easing: 'swing',
				complete: function() {
					$(".sscNav").niceScroll({
						railpadding: { top: 4, right: 0, left: 0, bottom: 4 },
						cursorcolor: "#8c8d8e",
						cursoropacitymin: 0.3,
						background: "transparent",
						cursorborder: "0",
						autohidemode: false,
						cursorminheight: 30
					});
					$('.nicescroll-rails').find('div').css('width','4px').css('right','8px');
				}
			});
            $('.sscmaincontainer').animate({'opacity':'0.5'},700);
            $('#sscCover').css('display','block').css("z-index","999");
        } else if ($('.sscNav').hasClass('navVisible')){
			$(".sscNav").niceScroll().remove();
			$('.sscNav').removeClass('navVisible').addClass('navleft');
			$('.sscNav').animate({'left':'-350px'},
				{
					duration: 500,
					easing: 'swing',
					complete: function() {
				}
			});
            $('.sscmaincontainer').animate({'opacity':'1'},700);
            $('#sscCover').css('display','none').css("z-index","100");
        }
		setTimeout(function(){
			if($('.activeNavR').hasClass('activeNav_')) {
				$('.activeNavR').animate({'margin-left':'80px'},
				{
					duration: 400,
					easing: 'linear', 
					complete: function() { 
					}
				});
		        setTimeout(function(){
                    $('.activeNavR').removeAttr( 'style' ).removeClass('activeNav_').addClass('activeNav_dis');
							navClicked1 =0;
				},405);
			}else if($('.activeNavR').hasClass('activeNav_dis')) {
				$('.activeNavR').removeAttr( 'style' ).addClass('activeNav_').removeClass('activeNav_dis');
				
				$('.activeNavR').animate({'margin-left':'71px'},
				{
					duration: 400, 
					easing: 'linear', 
					complete: function() { 
							navClicked1 =0;
					}
				});
			}else{
				navClicked1 =0;
			}
			if($('.activeNavL').hasClass('activeNav_')) {
				$('.activeNavL').animate({'margin-left':'-15px'},
					{
					duration: 400, 
					easing: 'swing', 
					complete: function() { 
					}
				});
			    setTimeout(function(){
            	    $('.activeNavL').removeAttr( 'style' ).removeClass('activeNav_').addClass('activeNav_dis');
				},405);
			}else if($('.activeNavL').hasClass('activeNav_dis')) {
				$('.activeNavL').removeAttr( 'style' ).addClass('activeNav_').removeClass('activeNav_dis');
				$('.activeNavL').css('margin-left','-15px');
				$('.activeNavL').animate({'margin-left':'-1px'},
					{
					duration: 400, 
					easing: 'swing', 
					complete: function() { 
					}
				});
			}
		},200);
    });
    
    $('.navDrop').click(function(e){
        if ($(this).attr("id")==currSlide && currSlide!= "1"){
		e.preventDefault(); 
		e.stopPropagation();
		return;
		}
		$('.book_title').html(currMod);      
		currSlide = $(this).attr("id");
		var beedle="";
		for (var k=0;k<listArray.length;k++){
            if (listArray[k].value==currSlide){
				screenUrl = listArray[k].type + "/" + listArray[k].screenName;
				if (listArray[k].nested == 'no'){
					beedle = listArray[k].value + ""+listArray[k].type+""+listArray[k].screenName+""+listArray[k].screenTitle;
			        currSpecSlide = parseInt(listArray[k].id);
				}
			 }
		}
		chkBeads(currSlide,beedle);
        $('#currentSlide').html(currSlide + " of " +menuCount);
		$('#nav>li>a').css('background','#191B1C').css('color','#babbbb');
     	$('#nav>li>ul>li>a').css('background','#222527').css('color','#babbbb');
     		$('#nav li a').removeClass('clk');
		$('#'+currSlide +">a").css('background','#336699').css('color','#fff').addClass('clk');
		loadAct(screenUrl);
		e.preventDefault(); 
		e.stopPropagation();
		navClicked = "1";
		if(currSpecSlide >0){
			$('#prev_bn').removeAttr('disabled').removeClass('prevbtn_disable').addClass('prevbtn_enable').css('opacity','1');
        }else{
			$('#prev_bn').attr('disabled','disabled').addClass('prevbtn_disable').removeClass('prevbtn_enable').css('opacity','0.5');
        }
		if (parseInt(currSpecSlide)+1 == parseInt(listCount)){
		    $('#next_bn').attr('disabled','disabled').addClass('nextbtn_disable').removeClass('nextbtn_enable').css('opacity','0.5');
		}else{
		    $('#next_bn').removeAttr('disabled').removeClass('nextbtn_disable').addClass('nextbtn_enable').css('opacity','1');
		}
	});
	
	$('#next_bn').click(function(e){
		if(loadActChk==1){
		return;
		}
		if($(this).hasClass('nextbtn_disable')){
			return;
		}
		navClicked ="0";
		currSpecSlide++;
        if (parseInt(currSpecSlide) < parseInt(listCount)){
        	screenUrl = listArray[currSpecSlide].type + "/" + listArray[currSpecSlide].screenName;
            loadAct(screenUrl);
            $('#currentSlide').html(listArray[currSpecSlide].value + " of " + menuCount);
			currSlide= listArray[currSpecSlide].value;
			var beedle = listArray[currSpecSlide].value +""+ listArray[currSpecSlide].type +""+ listArray[currSpecSlide].screenName +""+ listArray[currSpecSlide].screenTitle;
			chkBeads(currSlide,beedle);
			$('#nav>li>a').css('background','#191b1c').css('color','#babbbb');
			$('#nav>li>ul>li>a').css('background','#222527').css('color','#babbbb');
            if($('#'+ currSlide).closest('ul').parent().children('a').hasClass('hasSub')){
            	$('#'+ currSlide).closest('ul').parent().children('ul').slideDown();
			    $('#nav li a').removeClass('active');
                $('#'+currSlide).closest('ul').parent().children('a').addClass('active');
                $('#nav>li>a').each(function(){
                  if(!$(this).hasClass('active') && $(this).hasClass('hasSub')){
                        $(this).parent().children('ul').slideUp();
                    }     
                });
            }else if($('#'+ currSlide).children('a').hasClass('hasSub')){
				$('#'+ currSlide).children('ul').slideDown();
			    $('#nav li a').removeClass('active');
                $('#'+currSlide+'>a').addClass('active');
                $('#nav>li>a').each(function(){
                  if(!$(this).hasClass('active') && $(this).hasClass('hasSub')){
                        $(this).parent().children('ul').slideUp();
                    }     
                });
            }else if ($('#nav>li>a').hasClass('hasSub')){
				$('#nav li').children('ul').slideUp();
			    $('#nav li a').removeClass('active');
            }
			$('#nav li a').removeClass('clk');
			$('#'+currSlide +'>a').css('background','#336699').css('color','#fff').addClass('clk');
		setTimeout(function(){
			$('.sscNav').scrollTo('#'+currSlide,{duration:'slow', offsetTop : '60'});
		},550);
		$('#prev_bn').removeAttr('disabled').removeClass('prevbtn_disable').addClass('prevbtn_enable').css('opacity','1');
            if (parseInt(currSpecSlide)+1 == parseInt(listCount)){
                $('#next_bn').attr('disabled','disabled').addClass('nextbtn_disable').removeClass('nextbtn_enable').css('opacity','0.5');;
            }
		}
	});
	
    $('#prev_bn').click(function(e){
		if(loadActChk==1){
			return;
		}
		if($(this).hasClass('prevbtn_disable')){
	    	return;
		}
	    if(navClicked =="1" ){
            if (listArray[currSpecSlide-1].nested=="yes"){
                currSpecSlide--;
                $('#prev_bn').trigger('click');
                return;
            }else{
    	        currSpecSlide--;
        	}
            navClicked ="0";
    	} else {
            if (listArray[currSpecSlide].nested =="no" && listArray[currSpecSlide-1].nested=="yes"){
                var chkCurr = listArray[currSpecSlide-1].value;
                for (var l=0;l<listArray.length;l++){
                    if (listArray[l].value==chkCurr && listArray[l].nested=="no"){
                        currSpecSlide = listArray[l].id;
                    }
                }
            } else if (listArray[currSpecSlide].nested="yes"){
                currSpecSlide--;
            }else{
                currSpecSlide--;
            }
        }
        currSlide = listArray[currSpecSlide].value;
        screenUrl = listArray[currSpecSlide].type + "/" + listArray[currSpecSlide].screenName;
		loadAct(screenUrl);
   		$('#currentSlide').html(currSlide + " of " + menuCount);
		var beedle = listArray[currSpecSlide].value +""+ listArray[currSpecSlide].type +""+ listArray[currSpecSlide].screenName +""+ listArray[currSpecSlide].screenTitle;
		chkBeads(currSlide,beedle);
        $('#nav>li>a').css('background','#191b1c').css('color','#babbbb');
		$('#nav>li>ul>li>a').css('background','#222527').css('color','#babbbb');
	    if($('#'+ currSlide).closest('ul').parent().children('a').hasClass('hasSub')){
			$('#'+ currSlide).closest('ul').parent().children('ul').slideDown();
            $('#nav li a').removeClass('active');
            $('#'+currSlide).closest('ul').parent().children('a').addClass('active');
            $('#nav>li>a').each(function(){
                if(!$(this).hasClass('active') && $(this).hasClass('hasSub')){
                    $(this).parent().children('ul').slideUp();
                }     
            });
		}else if($('#'+ currSlide).children('a').hasClass('hasSub')){
			$('#'+ currSlide).children('ul').slideDown();
	        $('#nav li a').removeClass('active');
            $('#'+currSlide+'>a').addClass('active');
            $('#nav>li>a').each(function(){
                if(!$(this).hasClass('active') && $(this).hasClass('hasSub')){
                    $(this).parent().children('ul').slideUp();
                }     
            });
    	}else if ($('#nav>li>a').hasClass('hasSub')){
			$('#nav li').children('ul').slideUp();
		    $('#nav li a').removeClass('active');
        }
		$('#nav li a').removeClass('clk');
		$('#'+ currSlide +'>a').css('background','#336699').css('color','#fff').addClass('clk');
		setTimeout(function(){
			$('.sscNav').scrollTo('#'+currSlide,{duration:'slow', offsetTop : '60'});
		},550);
		$('#next_bn').removeAttr('disabled').removeClass('nextbtn_disable').addClass('nextbtn_enable').css('opacity','1');
		if(currSpecSlide == 0){
			$('#prev_bn').attr('disabled','disabled').addClass('prevbtn_disable').removeClass('prevbtn_enable').css('opacity','0.5');
		}
    });
}