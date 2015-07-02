$(document).ready(function () {
    jQuery.preload = function(array) {
   var length = array.length,
    document = window.document,
    body = document.body,
    isIE = 'fileSize' in document,
    object;
   while (length--) {
    if (isIE) {
     new Image().src = array[length];
     continue;
    }
    if(array[length].indexOf(".js") > -1)
    {
      object = document.createElement( 'script' );
      object.setAttribute( 'src', array[length] );
    }else
    {
     object = document.createElement('object');
     object.data = array[length];
     object.width = object.height = 0;
    }
    body.appendChild(object);
   }
  };
		 
		// Example:
		 
		$(function() {
			$.preload([
				'images/logo.png', 'introvideo/media/images/anim_play.png', 'introvideo/media/images/banner.jpg', 'introvideo/media/images/m01_s01_i01.jpg', 'introvideo/media/images/mod_intro_bg.png', 'introvideo/media/images/mod_intro_video_shadow.png', 'modulevideo/media/images/anim_play.png', 'modulevideo/media/images/banner.jpg', 'modulevideo/media/images/m01_s03_i01.jpg', 'modulevideo/media/images/mod_intro_bg.png', 'modulevideo/media/images/mod_intro_video_shadow.png', 'clickablethumbnail2/media/images/ctz1_shadow.png', 'clickablethumbnail2/media/images/ctz1_shadow_.png', 'clickablethumbnail2/media/images/ctz_close_normal.png', 'clickablethumbnail2/media/images/ctz_close_over.png', 'clickablethumbnail2/media/images/ctz_magnify.png', 'clickablethumbnail2/media/images/ctz_play.png', 'clickablethumbnail2/media/images/m01_s19b_i01.jpg', 'compare/media/images/comp_close_normal.png', 'compare/media/images/comp_close_over.png', 'compare/media/images/comp_flip_bottom_left.png', 'compare/media/images/comp_flip_bottom_right.png', 'compare/media/images/comp_flip_top_left.png', 'compare/media/images/comp_flip_top_right.png', 'compare/media/images/comp_panel_n.png', 'compare/media/images/m01_s06_i01.jpg', 'compare/media/images/m01_s06_i02.jpg', 'draganddrop/media/images/dnd_bend.png', 'draganddrop/media/images/dnd_close_n.png', 'draganddrop/media/images/dnd_close_o.png', 'draganddrop/media/images/dnd_correct.png', 'draganddrop/media/images/dnd_incorrect.png', 'draganddrop2/media/images/dnd_bend.png', 'draganddrop2/media/images/dnd_close_n.png', 'draganddrop2/media/images/dnd_close_o.png', 'draganddrop2/media/images/dnd_correct.png', 'draganddrop2/media/images/dnd_incorrect.png', 'imagetab2/media/images/bullet.png', 'imagetab2/media/images/ctr1_title.png', 'imagetab2/media/images/ctr_close_n.png', 'imagetab2/media/images/ctr_close_o.png', 'imagetab2/media/images/m01_s05_i01.jpg', 'imagetab2/media/images/m01_s05_i02.jpg', 'imagetab2/media/images/m01_s05_i03.jpg', 'imagetab2/media/images/imagetab_leftbtn_n.png', 'imagetab2/media/images/imagetab_leftbtn_over.png', 'imagetab2/media/images/imagetab_rightbtn_n.png', 'imagetab2/media/images/imagetab_rightbtn_o.png', 'slideshow/media/images/slideshow_leftbtn_n.png', 'slideshow/media/images/slideshow_leftbtn_over.png', 'slideshow/media/images/slideshow_pagination_n.png', 'slideshow/media/images/slideshow_pagination_over.png', 'slideshow/media/images/slideshow_rightbtn_n.png', 'slideshow/media/images/slideshow_rightbtn_o.png', 'slideshow/media/images/slideshow_shadow.png', 'slideshow/media/images/m01_s10_i01.jpg', 'slideshow/media/images/m01_s10_i02.jpg', 'slideshow/media/images/m01_s10_i03.jpg', 'slideshow/media/images/m01_s10_i04.jpg', 'slideshow/media/images/m01_s17_i01.jpg', 'slideshow/media/images/m01_s17_i02.jpg', 'slideshow/media/images/m01_s17_i03.jpg', 'slideshow/media/images/m01_s17_i04.jpg', 'slideshow/media/images/m01_s17_i05.jpg', 'slideshow/media/images/m01_s17_i06.jpg', 'slideshow/media/images/m01_s17_i07.jpg', 'slideshow/media/images/m01_s17_i08.jpg', 'slideshow/media/images/m01_s17_i09.jpg', 'slideshow/media/images/m01_s17_i10.jpg', 'textwithimage/media/images/m01_s02_i01.jpg', 'textwithimage/media/images/m01_s09_i01.jpg', 'textwithimage/media/images/m01_s12_i01.jpg', 'textwithimage/media/images/m01_s13_i01.jpg', 'textwithimage/media/images/m01_s14_i01.jpg', 'textwithimage/media/images/m01_s15_i01.jpg', 'textwithimage/media/images/m01_s19a_i01.jpg', 'topicvideo/media/images/anim_play.png', 'topicvideo/media/images/anim_replay.png', 'topicvideo/media/images/topic_video.png', 'topicvideo/media/images/banner.jpg', 'tabhorizontal/media/js/populateContent.js', 'draganddrop/media/js/dragDrop_3tabs.js', 'draganddrop/media/js/dragDrop_4tabs.js', 'draganddrop/media/js/dragDrop_5tabs.js', 'draganddrop2/media/js/dragDrop3.js', 'draganddrop2/media/js/dragdropLoader3.js', 'draganddrop2/media/js/dragDropBg.js', 'draganddrop2/media/js/dragdroptemplateLoader.js', 'introvideo/media/js/video-js/video.js',  'slideshow/media/js/populateSlideShowContent.js', 'slideshow/media/js/slideshowloader.js', 'tabhorizontal/media/js/tabPopulateContent.js', 'tabhorizontal/media/js/tabTable.js', 'tabhorizontal/media/js/jquery.ui.touch-punch.min.js', 'js/lib/jquery.xml2json.js', 'mcq/screen_19/media/js/mcssLoader.js', 'mcq/screen_19/media/js/mcss.js', 'mcq/screen_18/media/js/mcssLoader.js', 'mcq/screen_18/media/js/mcss.js', 'draganddrop/media/css/populateContent.css', 'draganddrop2/media/css/dragDropLoader3.css', 'draganddrop2/media/css/dragdroptemplateLoader.css', 'draganddrop2/media/css/dragDropBg.css', 'introvideo/media/css/video-js.css', 'slideshow/media/css/slideShow.css', 'slideshow/media/css/slideshowLoader.css', 'slideshow/media/css/populateSlideShowContent.css', 'tabhorizontal/media/css/tabPopulateContent.css', 'tabhorizontal/media/css/tabTable.css', 'tabverticle/media/css/easy-responsive-tabs.css', 'mcq/screen_19/media/css/mcssLoader.css', 'mcq/screen_19/media/css/mcss.css', 'mcq/screen_18/media/css/mcssLoader.css', 'mcq/screen_18/media/css/mcss.css'
			]);
		});
	});
	
	
	
   

