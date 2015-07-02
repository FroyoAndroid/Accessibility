$(document).ready(function () {
    $.preloadImages = function () {
        for (var i = 0; i < arguments.length; i++) {
            $("<img />").attr("src", arguments[i]);
        }
    }

    $.preloadImages("images/logo.png", "images/itt_logo.png");
    
	$.preloadImages("introvideo/media/images/anim_play.png", "introvideo/media/images/banner.jpg", "introvideo/media/images/m01_s01_i01.jpg", "introvideo/media/images/mod_intro_bg.png", "introvideo/media/images/mod_intro_video_shadow.png");
	
	$.preloadImages("modulevideo/media/images/anim_play.png", "modulevideo/media/images/banner.jpg", "modulevideo/media/images/m01_s02_i01.jpg", "modulevideo/media/images/mod_intro_bg.png", "modulevideo/media/images/mod_intro_video_shadow.png");
	
	$.preloadImages("clickablethumbnail2/media/images/ctz1_shadow.png", "clickablethumbnail2/media/images/ctz1_shadow_.png", "clickablethumbnail2/media/images/ctz_close_over.png", "clickablethumbnail2/media/images/ctz_magnify.png", "clickablethumbnail2/media/images/ctz_play.png", "clickablethumbnail2/media/images/m01_s16b_i01.jpg");
	
	$.preloadImages("compare/media/images/comp_close_normal.png", "compare/media/images/comp_close_over.png", "compare/media/images/comp_flip_bottom_left.png", "compare/media/images/comp_flip_bottom_right.png", "compare/media/images/comp_flip_top_left.png", "compare/media/images/comp_flip_top_right.png", "compare/media/images/comp_panel_n.png", "compare/media/images/m01_s09b_i01.jpg", "compare/media/images/m01_s09b_i02.jpg");
	
	$.preloadImages("draganddrop/media/images/dnd_bend.png", "draganddrop/media/images/dnd_close_n.png", "draganddrop/media/images/dnd_close_o.png", "draganddrop/media/images/dnd_correct.png", "draganddrop/media/images/dnd_incorrect.png");
	
	$.preloadImages("imagetab/media/images/bullet.png", "imagetab/media/images/ctr1_title.png", "imagetab/media/images/ctr_close_n.png", "imagetab/media/images/ctr_close_o.png", "imagetab/media/images/m01_s06_i01.jpg", "imagetab/media/images/m01_s06_i02.jpg", "imagetab/media/images/m01_s06_i03.jpg", "imagetab/media/images/next.png", "imagetab/media/images/next_active.png", "imagetab/media/images/prev.png", "imagetab/media/images/prev_active.png");
	
	$.preloadImages("slideshow/media/images/slideshow_leftbtn_n.png", "slideshow/media/images/slideshow_leftbtn_over.png", "slideshow/media/images/slideshow_pagination_n.png", "slideshow/media/images/slideshow_pagination_over.png", "slideshow/media/images/slideshow_rightbtn_n.png", "slideshow/media/images/slideshow_rightbtn_o.png", "slideshow/media/images/slideshow_shadow.png");
	
	$.preloadImages("textwithimage/media/images/m01_s03_i01.jpg", "textwithimage/media/images/m01_s05a_i01.jpg", "textwithimage/media/images/m01_s08_i01.jpg", "textwithimage/media/images/m01_s09a_i01.jpg", "textwithimage/media/images/m01_s10a_i01.jpg", "textwithimage/media/images/m01_s15a_i01.jpg", "textwithimage/media/images/m01_s16a_i01.jpg");	
   
   });
   

