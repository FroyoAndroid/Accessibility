/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mbTooltip.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 22/03/13 23.32
 *  *****************************************************************************
 */

/*
 * mbTooltip jquery plug in
 * developed by Matteo Bicocchi on JQuery
 * © 2002-2009 Open Lab srl, Matteo Bicocchi
 * www.open-lab.com - info@open-lab.com
 * version 1.8
 * tested on: Explorer, FireFox and Chrome for PC
 *            FireFox and Safari for Mac Os X
 *            FireFox for Linux
 * MIT (MIT-LICENSE.txt) licenses.
 */

/*Browser detection patch*/
var myOptions;
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);


(function($){
    jQuery.fn.mbTooltip = function (options){
        return this.each (function () {
            this.options = {
                live:true,
                opacity : 1,
                wait:1,
                timePerWord:1,
                cssClass:"default",
                hasArrow:false,
                hasShadow:true,
                imgPath:"media/images/",
                shadowColor:"black",
                shadowLeft:1,
                anchor:"parent",
                shadowTop:1,
                mb_fade:1
            };
            $.extend (this.options, options);
            if (this.options.live)
                $('#main_wrapper').on("mouseover","[tooltiptext]",function(){$(this).mbTooltip(options);});

            var ttEl=$(this).is("[tooltiptext]") ? $(this): $(this).find("[tooltiptext]");
            var wait=this.options.wait;
            var fade=this.options.mb_fade;
            myOptions=this.options;
            var isOpen=false;
            $(ttEl).each(function(){
                $(this).attr("tooltip", $(this).attr("tooltiptext"));
                $(this).removeAttr("tooltiptext");
                $(this).attr("tooltipEnable","true");
                var theEl=$(this);
                var ttCont= theEl.attr("tooltip");
                var audiopath = theEl.attr("audiopath");
                var hover=$.browser.msie?"mouseenter":"mouseover";

                //var is_touch_device=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
                $(this).unbind().bind(hover,function(e){
                    if (myOptions.anchor==="mouse")
                        $(document).mb_getXY();

                    //$(this).click(function(event){
                        //$('#tooltip').remove();
                        //alert('click here')
                      /*
                        if ($(this).attr("tooltipEnable")=="true"){
                            $(this).buildTooltip(ttCont,myOptions,audiopath,e);
                            event.stopPropagation();
                        }
                    */
                    //});

                });
            });
        });
    };

    var mbX = 0;
    var mbY = 0;

    $.fn.extend({

        mb_getXY:function(){
            $(document).bind("mousemove", function(e) {
                mbX = e.pageX;
                mbY = e.pageY;
            });
            return {x:mbX,y:mbY};
        },
        buildTooltip: function(cont,options,audiopath){
            this.options={};
            $.extend (this.options, options);
            var parent=$(this);
            $('#main_wrapper').append("<div style='position:absolute;' id='tooltip'></div>");
            var imgUrl=this.options.imgPath+"vocab_pointer.png";

            $("#tooltip").addClass(this.options.cssClass);
			
			$("#tooltip").append("<div class='closebutton'></div>");
			
			$("#tooltip").append("<div class='toparrow'></div>");

            $('#tooltip').prepend("<div class='tooltip_desc'></div>");

            $(".tooltip_desc").html(cont);

            $('.audio_btn').click(function(event){
                //tooltip_audio.currentTime = 0.1;
                tooltip_audio.play();
                event.stopPropagation();
            });
			
			$('.closebutton').click(function(event){
                $('#tooltip').hode();
            });



            if (this.options.hasArrow){
                $("#tooltip").prepend("<img id='ttimg' src='"+imgUrl+"'>");
                $("#ttimg").css({
                    position:"absolute"
                });

                $("#ttimg").addClass("top");
            }
            $("#tooltip").css({
                position:"absolute",
                top:  this.options.anchor=="mouse"?$(document).mb_getXY().y +7:parent.offset().top+(parent.outerHeight()),
                left:this.options.anchor=="mouse"?$(document).mb_getXY().x:parent.offset().left,
                opacity:0
            });
            $("#tooltip").findBestPos(parent,this.options.imgPath,this.options.anchor);
            //if (this.options.anchor=="mouse") $(document).unbind("mousemove");
            $("#tooltip").mb_BringToFront();
            $("#tooltip").fadeTo(this.options.mb_fade,this.options.opacity,function(){});
            //var timetoshow=3000+cont.length*this.options.timePerWord;
            //var fade=this.options.mb_fade;
            //$(this).oneTime(timetoshow,function(){$(this).deleteTooltip(fade);});
        },
        deleteTooltip: function(fade){
            var sel="#tooltip";
            $(sel).fadeOut(fade,function(){$(sel).remove();});
        },
        findBestPos:function(parent,imgPath,anchor){
            var theEl=$(this);
            var ww= $(window).width()+$(window).scrollLeft();
            var wh= $(window).height()+$(window).scrollTop();
            var w=theEl.outerWidth();
            theEl.css({width:w});
            var t=((theEl.offset().top+theEl.outerHeight(true))>wh)? theEl.offset().top-(anchor!="mouse"? parent.outerHeight():0)-theEl.outerHeight()-20 : theEl.offset().top;
            t=t<0?0:t;
            var l=((theEl.offset().left+w)>ww-5) ? theEl.offset().left-(w-(anchor!="mouse"?parent.outerWidth():0)) : theEl.offset().left;
            l=l<0?0:l;


            /*
             if (theEl.offset().top+theEl.outerHeight(true)>wh){

             $("#ttimg").attr("src",imgPath+"bottom.png");
             $("#ttimg").removeClass("top").addClass("bottom");
             }
             */

            if (theEl.offset().left+theEl.outerWidth(true)>ww){
                $("#ttimg").css({left:"323px"});
            }

            theEl.css({width:w, top:t, left:l});
        },
        disableTooltip:function(){
            $(this).find("[tooltip]").attr("tooltipEnable","false");
        },
        enableTooltip:function(){
            $(this).find("[tooltip]").attr("tooltipEnable","true");
        }
    });

    jQuery.fn.mb_BringToFront= function(){
        var zi=10;
        $('*').each(function() {
            if($(this).css("position")=="absolute"){
                var cur = parseInt($(this).css('zIndex'));
                zi = cur > zi ? parseInt($(this).css('zIndex')) : zi;
            }
        });
        $(this).css('zIndex',zi+=100);
    };

    jQuery.fn.removeTooltip= function(){
        var sel="#tooltip";
        $(sel).remove();

    };

    $(function(){
        //due to a problem of getter/setter for select
        $("select[tooltiptext]").each(function(){
            var selectSpan=$("<span></span>");
            selectSpan.attr("tooltiptext",$(this).attr("tooltiptext"));
            $(this).wrapAll(selectSpan);
            $(this).removeAttr("tooltiptext");
        });

        $('#main_wrapper').click(function(e){
            if(e.target.getAttribute('class')!='ttstyle')
            {
                if($('#main_wrapper').find('#tooltip').length>0){
                    $('#tooltip').remove();
                }
            }
            else
            {
                if($('#main_wrapper').find('#tooltip').length>0){
                    $('#tooltip').remove();
                }
                var ele=$('.'+e.target.getAttribute('class'))
                if (e.target.getAttribute("tooltipEnable")=="true"){

                    var ttCont= e.target.getAttribute("tooltip");
                    var audiopath = e.target.getAttribute("audiopath");
                    $(e.target).buildTooltip(ttCont,myOptions,audiopath);
                    tooltip_audio.play();
                    e.stopPropagation();
                }
            }

        });
    });

})(jQuery);