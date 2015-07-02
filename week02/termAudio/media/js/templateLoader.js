var jsonObject;
var xmlPath;
var mainWrapper;
$(document).ready(function()
{
    mainWrapper = $('#main_wrapper');
    xmlPath = 'termAudio/media/xml/' + mainWrapper.attr('xml');
    loadXml();
});

function loadXml()
{
    setTimeout(function() {
        $(function() {
            $.ajax({
                type: "GET",
                url: xmlPath,
                dataType: "xml",
                success: function(response)
                {
                    jsonObject = $.xml2json(response, true);
                    populateData();
                }
            });
        });
    }, 100);
}

function populateData()
{
    addDisplayContent();
    $('#main_wrapper').mbTooltip();
    $(window).resize(function()
    {
        onWindowResize();
    });
}

function onWindowResize()
{
    if ($('.text_with_image').width())
    {
        var value = $('.text_with_image').width() - $('.textWithImage_image').width() - 20;
        $('.text_with_image_text_container').css({'width': value});
        var maxHeight = Math.max($('.text_with_image_text_container').height(), $('.textWithImage_image').height());
        $('.text_with_image').height(maxHeight);
    }
}

function addDisplayContent()
{
    for (var i = 0; i < jsonObject.display.length; i++)
    {
        switch (jsonObject.display[i].type)
        {
            case 'header_text':
                addHeaderText(jsonObject.display[i].text);
                break;
            case 'subtitle_text':
                addSubtitleText(jsonObject.display[i].text);
                break;
            case 'text':
                addContentText(jsonObject.display[i].text);
                break;
            case 'instruction_text':
                addInstructionText(jsonObject.display[i].text);
                break;
            case 'dragDropQuestion_text':
                addDragdropQuestionText(jsonObject.display[i].text);
                break;
            case 'submitInstructions':
                addSubmitInstructionText(jsonObject.display[i].text);
                break;
            case 'htmlLoad':
                addUniqueContent(jsonObject.display[i].path);
                break;
            case 'objective':
                addObjectiveContent(jsonObject.display[i].path);
                break;
            case 'discussion':
                addDiscussionContent(jsonObject.display[i].path);
                break;
            case 'image':
                addContentImage();
                break;
            case 'textWithImage':
                addTextWithImage(jsonObject.display[i]);
                break;
            case 'tabTable':
                mainWrapper.addTabTable(jsonObject.display[i]);
                break;
            case 'compare':
                mainWrapper.addCompareActivity(jsonObject.display[i]);
                break;
            case 'dragDrop':
                mainWrapper.addDragDropActivity(jsonObject.display[i]);
                break;
            case 'clickReveal2':
                mainWrapper.addclickReveal2Activity(jsonObject.display[i]);
                break;
            case 'termAudio':
                mainWrapper.addtermAudioActivity(jsonObject.display[i]);
                break;
            case 'click_reveal':
                mainWrapper.addClickRevealActivity(jsonObject.display[i]);
                break;
            case 'click_reveal_2':
                mainWrapper.addClickRevealActivity_2(jsonObject.display[i]);
                break;
            case 'click_reveal_3':
                mainWrapper.addClickRevealActivity_3(jsonObject.display[i]);
                break;
            case 'vdo_player':
                mainWrapper.addVdoPlayerActivity(jsonObject.display[i]);
                break;
        }
    }
}

function addHeaderText(str)
{
    var attr = {'class': 'header_text', 'html': str};
    mainWrapper.append($('<div>', attr));
}
function addSubtitleText(str)
{
    var attr = {'class': 'subtitle', 'html': str};
    mainWrapper.append($('<div>', attr));
}
function addContentText(str)
{
    var attr = {'class': 'text', 'html': str};
    mainWrapper.append($('<div>', attr));
}
function addInstructionText(str)
{
    var attr = {'class': 'Instruction_text', 'html': str};
    mainWrapper.append($('<div>', attr));
}
function addDragdropQuestionText(str)
{
    var attr = {'class': 'dragdropQuestionText', 'html': str};
    dragDropWrapper.append($('<div>', attr));
}
function addSubmitInstructionText(str)
{
    var attr = {'class': 'submit_instruction_text', 'html': str};
    mainWrapper.append($('<div>', attr));
}
function addTextWithImage(jObj)
{
    var value;
    var maxHeight;
    var attr = {'class': 'text_with_image'};
    mainWrapper.append($('<div>', attr));

    var attr_1 = {'class': 'text_with_image_text_container', 'html': jObj.text};
    $('.text_with_image').append($('<div>', attr_1));


    var image = '<img class="textWithImage_image" src="' + jObj.path + '">';
    $('.text_with_image').append(image);
    $('.textWithImage_image').load(function()
    {
        value = $('.text_with_image').width() - $(this).width() - 20;
        $('.text_with_image_text_container').css({'position': 'absolute', 'left': '20px', 'width': value});
        $(this).css({'position': 'absolute', 'right': '20px'});
        maxHeight = Math.max($(this).height(), $('.text_with_image_text_container').height());
        $('.text_with_image').height(maxHeight);
    });
}


function addUniqueContent(path)
{
    var attr = {'class': 'unique_container'};
    mainWrapper.append($('<div>', attr));
    $('.unique_container').load(path, function()
    {

    });
}

function addObjectiveContent(path)
{
    var attr = {'class': 'objective_container'};
    mainWrapper.append($('<div>', attr));
    $('.objective_container').load(path, function()
    {
        objectiveInit();
    });
}

function addDiscussionContent(path)
{
    var attr = {'class': 'discussion_container'};
    mainWrapper.append($('<div>', attr));
    $('.discussion_container').load(path, function()
    {
        discussionInit();
    });
}




function discussionInit()
{
    var value_1;
    var maxHeight;
    $('.rightpart>.Img').load(function()
    {
        value_1 = $('#objective_bg_container').width() - $(this).width() - 20;
        $('.Leftpart').css({'width': value_1});
        maxHeight = Math.max($(this).height(), $('.Leftpart').height());
        $('#objective_bg_container').height(maxHeight + 50);
    });

    $(window).resize(function()
    {
        value_1 = $('#objective_bg_container').width() - $('.rightpart').width() - 20;
        $('.Leftpart').css({'width': value_1});
        maxHeight = Math.max($('.rightpart>.Img').height(), $('.Leftpart').height());
        $('#objective_bg_container').height(maxHeight + 50);
    });
}


function objectiveInit()
{
    var value;
    var value_1;
    var totalElements = Math.floor($('#objective_top_band').width() / 40)
    for (var i = 0; i < totalElements; i++)
    {
        var attr = {'class': 'objective_element'};
        $('#objective_inner_top_band').append($('<div>', attr));
    }
    value = 40 * totalElements;
    $('#objective_inner_top_band').width(value);

    $('.rightpart>.Img').load(function()
    {
        value_1 = $('#objective_bg_container').width() - $(this).width() - 20;
        $('.Leftpart').css({'width': value_1});
    });


    //alert($('.rightpart').width())


    $(window).resize(function()
    {
        value_1 = $('#objective_bg_container').width() - $('.rightpart').width() - 20;
        $('.Leftpart').css({'width': value_1});
        totalElements = Math.floor($('#objective_top_band').width() / 40);
        $('#objective_inner_top_band').empty();
        for (var i = 0; i < totalElements; i++)
        {
            var attr = {'class': 'objective_element'};
            $('#objective_inner_top_band').append($('<div>', attr));
        }
        value = 40 * totalElements;
        $('#objective_inner_top_band').width(value);

    });
}