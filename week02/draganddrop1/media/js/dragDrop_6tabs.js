(function($)
{
    var dragDropShellWrapper;
    var dragDropWrapper;
    var dragDropJsonObject;
    var dropElementYPosition=10;
    var iconElementYPosition=19.5;
    var dropElementVGap=7;
    var iconElementVGap=37;
    var zIndexValue=100;
    var currentDragElement;
    var totalDragElements=0;
    var totalDroppedElements=0;
    var noOfAttempts=0;
    $.fn.addDragDropActivity=function(jsonObject)
    {
        dragDropShellWrapper=$(this);
        dragDropJsonObject= jsonObject;
        init();
    };

    function init()
    {
        totalDragElements=dragDropJsonObject.droppables[0].drop.length;
        addDragDropWrapper();
		adddragDropQuestion_text();
        addDragDropElements();
        addAttempts();
        addSubmitBtn();
        addTryAgainBtn();
        addShowAnswerBtn();
        addFeedback();
        addDisablePatch();

    }

    function addDragDropWrapper()
    {
        var attr = {'class':'drag_drop_wrapper'};
        dragDropShellWrapper.append($('<div>',attr));
        dragDropWrapper=$('.drag_drop_wrapper')	
    }

    function adddragDropQuestion_text(str)
    {
		var attr = {'class':'dragdropQuestionText','html':str};
        dragDropWrapper.append($('<div>',attr));	
	}
	
	
    function addDragDropElements()
    {
        for(var i=0;i<dragDropJsonObject.droppables[0].drop.length;i++)
        {
            var attr = {'class':'drop_text_container','id':'drop_text_container_'+i,'html':'<span>'+dragDropJsonObject.droppables[0].drop[i].text+'</span>'};
            dragDropWrapper.append($('<div>',attr));

            var attr_1 = {'class':'drop_element','id':'drop_element_'+i};
            dragDropWrapper.append($('<div>',attr_1));
            $('#drop_element_'+i).droppable(
                {
                    /*hoverClass:hoverHandler,
                    out:outHandler,*/
                    drop:checkAnswer,
                    tolerance:'pointer'
                }
            );

            var attr_2 = {'class':'drag_element_bg','id':'drag_element_bg_'+i};
            dragDropWrapper.append($('<div>',attr_2));

            var attr_3 = {'class':'drag_element','id':'drag_element_'+i,'html':'<span>'+dragDropJsonObject.draggables[0].drag[i].text+'</span>'};
            dragDropWrapper.append($('<div>',attr_3));
            $('#drag_element_'+i).draggable(
                {
                    start:startDragging,
                    stop:stopDragging
                });

            var attr_4 = {'class':'correct_icon','id':'correct_icon_'+i};
            dragDropWrapper.append($('<div>',attr_4));

            $('#correct_icon_'+i).css({'backgroundImage':'url('+dragDropJsonObject.feedback[0].correct[0].icon +')'})

            var attr_5 = {'class':'incorrect_icon','id':'incorrect_icon_'+i};
            dragDropWrapper.append($('<div>',attr_5));

            $('#incorrect_icon_'+i).css({'backgroundImage':'url('+dragDropJsonObject.feedback[0].incorrect[0].icon +')'})

            var attr_6 = {'class':'partial_icon','id':'partial_icon_'+i};
            dragDropWrapper.append($('<div>',attr_6));

            $('#partial_icon_'+i).css({'backgroundImage':'url('+dragDropJsonObject.feedback[0].partial[0].icon +')'})

            $('#correct_icon_'+i).css({'right':'240px','top':iconElementYPosition});
            $('#incorrect_icon_'+i).css({'right':'240px','top':iconElementYPosition});
            $('#partial_icon_'+i).css({'right':'240px','top':iconElementYPosition});




            $('#drop_text_container_'+i).css({'top':dropElementYPosition});
            $('#drop_element_'+i).css({'left':'408px','top':dropElementYPosition});
            $('#drag_element_bg_'+i).css({'right':'18px','top':dropElementYPosition});
           // $('#drag_element_'+i).css({'right':'14px','top':dropElementYPosition-2});
            $('#drag_element_' + i).css({ 'right': '18px', 'top': dropElementYPosition });
            dropElementYPosition = dropElementYPosition + $('#drop_text_container_' + i).height() + dropElementVGap;
            iconElementYPosition=iconElementYPosition+ $('#correct_icon_'+i).height() + iconElementVGap;

            $('#drag_element_'+i).attr({'xPosition':$('#drag_element_'+i).position().left,'yPosition':$('#drag_element_'+i).position().top,'isDropped':'false','droppedElement':'null'});
         //   $('#drop_element_' + i).attr({ 'xPosition': $('#drop_element_' + i).position().left - 2, 'yPosition': $('#drop_element_' + i).position().top - 2, 'draggedElement': 'null', 'correctAnswer': 'drag_element_' + dragDropJsonObject.droppables[0].drop[i].answer, 'isCorrect': 'false' });
            $('#drop_element_' + i).attr({ 'xPosition': $('#drop_element_' + i).position().left, 'yPosition': $('#drop_element_' + i).position().top , 'draggedElement': 'null', 'correctAnswer': 'drag_element_' + dragDropJsonObject.droppables[0].drop[i].answer, 'isCorrect': 'false' });
        }
    }

    function addAttempts()
    {
        var attr = {'class':'attempts','html':'ATTEMPTS'};
        dragDropWrapper.append($('<div>',attr));

        var attr_1 = {'class':'attempts_circle','id':'attempts_circle_0'};
        dragDropWrapper.append($('<div>',attr_1));
        $('#attempts_circle_0').css({'right':'36px'})

        var attr_2 = {'class':'attempts_circle','id':'attempts_circle_1'};
        dragDropWrapper.append($('<div>',attr_2));
        $('#attempts_circle_1').css({'right':'19px'})
    }

    function addSubmitBtn()
    {
        var attr = {'class':'submitBtn','html':'<span>SUBMIT</span>'};
        dragDropWrapper.append($('<div>',attr));
        $('.submitBtn').click(function()
        {
            $('.submitBtn').css({'display':'none'});
            zIndexValue++;
            $('.disable_patch').css({'display':'block',zIndex:zIndexValue});
            noOfAttempts++;
            if(noOfAttempts==1)
            {
                $('#attempts_circle_0').css({'backgroundColor':'#6d694a'});
				//$('.tryBtn').css({'display':'block'})
            }
            else if(noOfAttempts==2)
            {
                $('#attempts_circle_1').css({'backgroundColor':'#6d694a'})
				//$('.showBtn').css({'display':'block'})
            }
            validateAnswer();
            showHideFeedback();
        })
    }

    function addTryAgainBtn()
    {
        var attr = {'class':'tryBtn','html':'<span>TRY AGAIN</span>'};
        dragDropWrapper.append($('<div>',attr));
        $('.tryBtn').click(function()
        {
			//showHideFeedback();
            $('.tryBtn').css({'display':'none'});
            resetAllDragElements();
            $('.disable_patch').css({'display':'none'});
        })
    }

    function addShowAnswerBtn()
    {
        var attr = {'class':'showBtn','html':'<span>SHOW ANSWER</span>'};
        dragDropWrapper.append($('<div>',attr));
        $('.showBtn').click(function()
        {
            $('.showBtn').css({'display':'none'})
            for(var i=0;i<dragDropJsonObject.droppables[0].drop.length;i++)
            {
                $('#incorrect_icon_'+i).css({'opacity':0});
                $('#correct_icon_'+i).css({'opacity':1});
                var ele=$('#'+$('#drop_element_'+i).attr('correctAnswer'));
                ele.animate({'left':$('#drop_element_'+i).attr('xPosition'),'top':$('#drop_element_'+i).attr('yPosition')});
            }
        })
    }

    function addDisablePatch()
    {
        var attr = {'class':'disable_patch'};
        dragDropWrapper.append($('<div>',attr));
    }

    function validateAnswer()
    {
        var totalCorrect=0;
        for(var i=0;i<dragDropJsonObject.droppables[0].drop.length;i++)
        {
            if($('#drop_element_'+i).attr('correctAnswer')==$('#drop_element_'+i).attr('draggedElement'))
            {
                totalCorrect++;
                $('#correct_icon_'+i).css({'opacity':1});
            }
            else
            {
                $('#incorrect_icon_'+i).css({'opacity':1});
            }
        }
        if(totalCorrect==totalDragElements)
        {
            $('.tryBtn').css({'display':'none'});
            $('.submitBtn').css({'display':'none'});
            $('.showBtn').css({'display':'none'});
            if(noOfAttempts==1)
            {
                displayFeedBackText('correct',dragDropJsonObject.feedback[0].correct[0].attempt_1[0])
            }
            else if(noOfAttempts==2)
            {
                displayFeedBackText('correct',dragDropJsonObject.feedback[0].correct[0].attempt_2[0])
            }
        }
        else if(totalCorrect==0)
        {
            if(noOfAttempts==1)
            {
                displayFeedBackText('incorrect',dragDropJsonObject.feedback[0].incorrect[0].attempt_1[0])
            }
            else if(noOfAttempts==2)
            {
                displayFeedBackText('incorrect',dragDropJsonObject.feedback[0].incorrect[0].attempt_2[0])
            }
        }
        else
        {
            if(noOfAttempts==1)
            {
                displayFeedBackText('incorrect',dragDropJsonObject.feedback[0].partial[0].attempt_1[0])
            }
            else if(noOfAttempts==2)
            {
                displayFeedBackText('incorrect',dragDropJsonObject.feedback[0].partial[0].attempt_2[0])
            }
        }

    }

    function displayFeedBackText(str,jsonOb)
    {
        if(str=='correct')
        {
            $('.feedback_header').css({'color':'#19a825'});
        }
        else
        {
            $('.feedback_header').css({'color':'#ff3f3f'});
        }
        $('.feedback_header').html(jsonOb.header[0].text);
        $('.feedback_desc').html(jsonOb.description[0].text);
    }

    function addFeedback()
    {
        var wrapper;
        var content_wrapper;
        var attr = {'class':'feedback_wrapper'};
        dragDropWrapper.append($('<div>',attr));
        wrapper=$('.feedback_wrapper');

        var attr_1 = {'class':'feedback_content_wrapper'};
        wrapper.append($('<div>',attr_1));
        content_wrapper=$('.feedback_content_wrapper');

        var attr_2 = {'class':'feedback_header','html':''};
        content_wrapper.append($('<div>',attr_2));

        var attr_3 = {'class':'feedback_desc','html':''};
        content_wrapper.append($('<div>',attr_3));


        var attr_4 = {'class':'closeBtn','html':'<span></span>'};
        wrapper.append($('<div>',attr_4));
        $('.closeBtn').click(function()
        {
			 if(noOfAttempts==1)
            {
                //$('#attempts_circle_'+index+'_0').css({'backgroundColor':'#1F83A9'})
				resetAllDragElements();
                 $('.tryBtn').css({'display':'none'})
				 $('.disable_patch').css({'display':'none'});
            }
            else if(noOfAttempts==2)
            {
                /*if(totalCorrect==totalDragElements)
					{
						$('.showBtn_'+index).css({'display':'none'});
					}
				else{*/
				
                $('.showBtn').css({'display':'block'})
				validateAnswer();
				/*}*/
            }
            showHideFeedback();
			
			//addTryAgainBtn();
        })
    }

    function resetAllDragElements()
    {
         var tempDragElement;
        for(var i=0;i<dragDropJsonObject.droppables[0].drop.length;i++)
        {
        //    console.log('USER ANSWER              '+$('#drop_element_'+i).attr('draggedElement')+'      CORRECT ANSWER       '+$('#drop_element_'+i).attr('correctAnswer'));
            if($('#drop_element_'+i).attr('draggedElement')==$('#drop_element_'+i).attr('correctAnswer'))
            {
               $('#'+$('#drop_element_'+i).attr('draggedElement')).draggable('destroy').attr({'isCorrect':'true'});
               $('#drop_element_'+i).attr({'isCorrect':'true'});
            }
            else
            {
                tempDragElement=$('#'+$('#drop_element_'+i).attr('draggedElement'));
                tempDragElement.attr({'isDropped':'false','droppedElement':'null'});
                tempDragElement.animate({'left':tempDragElement.attr('xPosition'),'top':tempDragElement.attr('yPosition')});
                $('#drop_element_'+i).attr({'draggedElement':'null'});
                $('#incorrect_icon_'+i).css({'opacity':0})
            }
            /*$('#drag_element_'+i).attr({'isDropped':'false','droppedElement':'null'});
            $('#drop_element_'+i).attr({'draggedElement':'null'});
            $('#drag_element_'+i).animate({'left':$('#drag_element_'+i).attr('xPosition'),'top':$('#drag_element_'+i).attr('yPosition')});*/

        }
    }

    function showHideFeedback()
    {
        zIndexValue++;
        $('.feedback_wrapper').css({zIndex:zIndexValue});
        $('.feedback_wrapper').toggle({effect: "slide",'direction':'down'});
    }


    function startDragging()
    {
        $(this).css({'cursor':'move'})
        zIndexValue++;
        currentDragElement=$(this);
        $(this).attr({'isDropped':'false'});
        if($(this).attr('droppedElement')!='null')
        {
            $('#'+$(this).attr('droppedElement')).attr({'draggedElement':'null'})
        }
        $(this).attr({'draggedElement':currentDragElement.attr('id')});
        currentDragElement.css({zIndex:zIndexValue})
    }

    function stopDragging()
    {
        $(this).css({'cursor':'pointer'})
        if(currentDragElement.attr('isDropped')=='false')
        {
             $(this).attr({'droppedElement':'null'});
            $(this).animate({'left':$(this).attr('xPosition'),'top':$(this).attr('yPosition')})
        }
        calculateNoOfDroppedElements()
    }

    function checkAnswer()
    {
     //   console.log($(this).attr('draggedElement'));
       // console.log($(this).attr('isCorrect'));
        if($(this).attr('isCorrect')=='false')
        {
            currentDragElement.attr({'isDropped':'true'});
            currentDragElement.animate({'left':$(this).attr('xPosition'),'top':$(this).attr('yPosition')});
            if($(this).attr('draggedElement')!='null' && $(this).attr('isCorrect')=='false')
            {
                var ele=$('#'+$(this).attr('draggedElement'))
                ele.animate({'left':ele.attr('xPosition'),'top':ele.attr('yPosition')});
                ele.attr({'isDropped':'false'});
                ele.attr({'droppedElement':'null'});
            }
            $(this).attr({'draggedElement':currentDragElement.attr('id')});
            currentDragElement.attr({'droppedElement':$(this).attr('id')});
            calculateNoOfDroppedElements();
        }
        else
        {
            currentDragElement.animate({'left':currentDragElement.attr('xPosition'),'top':currentDragElement.attr('yPosition')});
        }

    }

    function calculateNoOfDroppedElements()
    {
        totalDroppedElements=0
        for(var i=0;i<dragDropJsonObject.droppables[0].drop.length;i++)
        {
            if($('#drop_element_'+i).attr('draggedElement')!='null')
            {
                totalDroppedElements++;
            }
        }
   //     console.log('totalDroppedElements              '+totalDroppedElements)
        if(totalDroppedElements==totalDragElements)
        {
            $('.submitBtn').css({'display':'block'});
        }
        else
        {
            $('.submitBtn').css({'display':'none'});
        }
    }
})(jQuery);
