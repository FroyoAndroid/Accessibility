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
    $.fn.addtermAudioActivity = function (jsonObject) {
        dragDropShellWrapper = $(this);
        dragDropJsonObject = jsonObject;
        init();
    };

    function init() {
        addDragDropWrapper();
        adddragDropQuestion_text();
    }

    function addDragDropWrapper() {
        var attr = { 'class': 'drag_drop_wrapper' };
        dragDropShellWrapper.append($('<div>', attr));
        dragDropWrapper = $('.drag_drop_wrapper');
    }

    function adddragDropQuestion_text(str) {
        var attr = { 'class': 'imageHolder', 'html': str};
        dragDropWrapper.append($('<div>', attr));
        $('.imageHolder').empty();
        for (var i = 0; i < dragDropJsonObject.clickables[0].blocks.length; i++) {
            var attr = { 'class': 'clickable clickable' + dragDropJsonObject.clickables[0].type, 'id': 'clickable_' + i, 'tes': dragDropJsonObject.clickables[0].blocks[i].text, 'html': '<span class="texts">' + dragDropJsonObject.clickables[0].blocks[i].term[0].text + '</span>' };
            $('.imageHolder').append($('<button>', attr)); //div is replaced with button to support accessibility
            $('#clickable_' + i).append('<div class="yellowClickable"><span>' + dragDropJsonObject.clickables[0].blocks[i].description[0].text + '</span></div>');
            $('#clickable_' + i + ' .yellowClickable').append('<div class="audioIcon"></div><audio class="audX" controls id="clicks_' + i + '"><source src="' + dragDropJsonObject.clickables[0].blocks[i].audiodesc[0].text + '" type="audio/mpeg">Your browser does not support the audio element.</audio>')
        }
        clickRevel();
    }

    function clickRevel() {
        $('.clickable').unbind('click').bind('click', function () {
            $(this).find('.texts').remove();
            $(this).find('.yellowClickable').css('display', 'block');
            jQuery('.audX').each(function () {
                var audio1 = jQuery(this)[0];
                audio1.pause();
                if (audio1.currentTime != 0) {
                    audio1.currentTime = 0;
                }
            });
            var kc = $(this).find('audio').attr('id');
            var audio = jQuery('#' + kc)[0];
            if (audio.currentTime != 0) {
                audio.currentTime = 0;
            }
            audio.play();
        });
    }


})(jQuery);
