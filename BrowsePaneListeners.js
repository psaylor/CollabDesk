function browsePaneReady() {
	console.debug('ready to work on browse pane');

	updateBrowsePane("message-table");

    $("#search-button").click(function(event){
        //console.log("clicked search button");
        var inp=$("#search-tbox").val();
        //console.log(inp);
        var messageIDs=getMessageIDs(inp);
        updateSearchedBrowsePane("message-table", messageIDs);
        $(".ui-menu-item").hide()
    });

    $("#search-tbox").keydown(function(event){
        var inp=$("#search-tbox").val();
        
        if(!popoverShowing){
        	$(this).popover('show');
        	popoverShowing=true;
        }

        if(event.which==13){ //checking for 'enter'
            var inp=$("#search-tbox").val();
            //console.log("Listening to ENTER. input is "+inp+"matching messages are ");
            var messageIDs=getMessageIDs(inp);
            //console.log("messageIDs");
            updateSearchedBrowsePane("message-table", messageIDs);
            $(".ui-menu-item").hide()
        }

        if(inp==null || inp.length<2){
            console.log("ELSE "+inp);
            updateBrowsePane("message-table");
        }
    });

    $("#search-tbox").autocomplete({
        source: function(request, response){
            //console.log(request.term);
            if(request.term.length>2){
                response(getMessageTitles(request.term.toLowerCase(),db));
                var inp=$("#search-tbox").val();
                var messageIDs=getMessageIDs(inp);
                updateSearchedBrowsePane("message-table", messageIDs);
            }
            else{
            	updateBrowsePane("message-table");
            }
        }
    });

    // //Advanced Search Popover
    // $('#search-tbox').blur(function(event){
    // 	console.log(event);
    // 	console.log("FOCUS IS BELOW");
    // 	console.log($(':focus'));
    // 	if(!$('.popover').is('focus')){
    // 		//$(this).popover('hide');
    // 		//popoverShowing=false;
    // 	}
    // });

    // $('#search-tbox').popover({
    // 	title: 'Search Options',
    // 	trigger: 'manual',
    // 	html: true,
    // 	content: showSearchDetails()
    // });
    console.log("MESSAGES: ");
    console.log($(".message"));

     $(".message").click(function(){
        console.log("!CLICKED ON "+$('.message').attr('id'));
        var focusedId=$(this).attr("id"); //id of message that is clicked
        replyId = focusedId;
        displayMessage(focusedId);

        /*
        //marking message as read
        getMessage(focusedId, function(msg){
            markRead(msg);
        });        
        */

        //updateBrowsePane();
    });


}

function addClickListener(){
    console.log("in addClickListener()");
    $(".message").click(function(){
        console.log("CLICKED ON "+$(this).attr('id'));
        var focusedId=$(this).attr("id"); //id of message that is clicked
        replyId = focusedId;
        displayMessage(focusedId);
        $("#replyFormDiv").hide();
        $("#replyButton").removeAttr("disabled");
        resetReply();
        
        //marking message as read
        getMessage(focusedId, function(msg){
            markRead(msg);
        });        
        
        //updateBrowsePane();
    });
}