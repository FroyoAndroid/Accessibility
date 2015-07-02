(function ($) {
    var dragDropShellWrapper;
    var dragDropWrapper;
    var dragDropJsonObject;
    var dropElementYPosition = 45;
    var iconElementYPosition = 54.5;
    var dropElementVGap = 10;
    var iconElementVGap = 29;
    var zIndexValue = 100;
    var currentDragElement;
    var totalDragElements = 0;
    var totalDroppedElements = 0;
    var noOfAttempts = 0;
    $.fn.addclickReveal2Activity = function (jsonObject) {
        dragDropShellWrapper = $(this);
        dragDropJsonObject = jsonObject;
        init();
    };

    function init() {
        addDragDropWrapper();
        adddragDropQuestion_text();
        //     addFeedback();

    }

    function addDragDropWrapper() {
        var attr = { 'class': 'drag_drop_wrapper' };
        dragDropShellWrapper.append($('<div>', attr));
        dragDropWrapper = $('.drag_drop_wrapper')
    }

    function adddragDropQuestion_text(str) {
        var attr = { 'class': 'imageHolder', 'html': str };
        dragDropWrapper.append($('<div>', attr));
        $('.imageHolder').empty();
        for (var i = 0; i < dragDropJsonObject.clickables[0].blocks.length; i++) {
            var attr = { 'class': 'clickable', 'id': 'clickable_' + i, 'tes': dragDropJsonObject.clickables[0].blocks[i].text, 'top': dragDropJsonObject.clickables[0].blocks[i].btop[0].text, 'left': dragDropJsonObject.clickables[0].blocks[i].bleft[0].text };
            $('.imageHolder').append($('<div>', attr));
         //   console.log(dragDropJsonObject.clickables[0].blocks[i].text[0].text);
            $('#clickable_' + i).css('top', dragDropJsonObject.clickables[0].blocks[i].btop[0].text + 'px').css('left', dragDropJsonObject.clickables[0].blocks[i].bleft[0].text + 'px');

            // console.log(dragDropJsonObject.clickables[0].blocks[i].btop);

        }
        clickRevel();

    }

    function clickRevel() {
        $('.clickable').unbind('click').bind('click', function () {
            var kk = $(this).attr('id');
            kk = kk.split('_');
            kk = kk[1];
            //   kk = parseInt(kk) - 1;
            var tes = $(this).attr('tes');
            addFeedback(kk, tes);
           // console.log(tes)
;
        });
    }


    function addFeedback(kc, tes) {
        var wrapper;
       // console.log(kc);
        var content_wrapper;
        $('.feedback_wrapper').remove();
        var attr = { 'class': 'feedback_wrapper' };
        dragDropWrapper.append($('<div>', attr));
        wrapper = $('.feedback_wrapper');

        var attr_1 = { 'class': 'feedback_content_wrapper' };
        wrapper.append($('<div>', attr_1));
        content_wrapper = $('.feedback_content_wrapper');

        var attr_2 = { 'class': 'feedback_header', 'html': dragDropJsonObject.feedback[0].attempt[kc].text1[0].text };
        content_wrapper.append($('<div>', attr_2));

        var attr_3 = { 'class': 'feedback_desc', 'html': dragDropJsonObject.feedback[0].attempt[kc].description[0].text };
        content_wrapper.append($('<div>', attr_3));
        var attr_4 = { 'class': 'closeBtn', 'html': '<span></span>' };
        wrapper.append($('<div>', attr_4));
        $('.closeBtn').click(function () {
            showHideFeedback();
            //addTryAgainBtn();
        });


        showHideFeedback();
    }

    function showHideFeedback() {
        zIndexValue++;
        $('.feedback_wrapper').css({ zIndex: zIndexValue });
        $('.feedback_wrapper').toggle({ effect: "slide", 'direction': 'down' });
    }


})(jQuery);
