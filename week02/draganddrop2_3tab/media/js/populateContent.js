(function($)
{
    var contentWrapper;
    var jsonContentObject;
    $.fn.populateContent=function(jsonObject)
    {
        contentWrapper=$(this);
        jsonContentObject= jsonObject;
        initialize();
    };

    function initialize()
    {
        contentWrapper.empty();
        for(var i=0;i<jsonContentObject.display.length;i++)
        {
            if(jsonContentObject.display[i].type=='text')
            {
                var attrText = {'class':'populateContentText','html':jsonContentObject.display[i].text};
                contentWrapper.append($('<div>',attrText));
            }
            if(jsonContentObject.display[i].type=='image')
            {
                var attrImage = {'class':'populateContentImage','html':'<img src="' + jsonContentObject.display[i].path + '">'};
                contentWrapper.append($('<div>',attrImage));
            }
            if(jsonContentObject.display[i].type=='textWithImage')
            {
                var value;
                var maxHeight;
                var attr = {'class':'populateContentTextWithImageWrapper'};
                contentWrapper.append($('<div>',attr));

                var attr_1 = {'class':'populateContentTextWithImage_text','html':jsonContentObject.display[i].text};
                $('.populateContentTextWithImageWrapper').append($('<div>',attr_1));


                var image='<img class="textWithImage_image" src="' + jsonContentObject.display[i].path + '">';
                $('.populateContentTextWithImageWrapper').append(image);
                $('.textWithImage_image').load(function()
                {
                    value=$('.populateContentTextWithImageWrapper').width()-$(this).width()-80;
                    $('.populateContentTextWithImage_text').css({'position':'absolute','left':'20px','width':value});
                    $(this).css({'position':'absolute','right':'20px'});
                    maxHeight=Math.max($(this).height(),$('.populateContentTextWithImage_text').height());
                    contentWrapper.height(maxHeight);

                });
            }
        }
    }

})(jQuery);
