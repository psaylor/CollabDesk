var spinner = '<i class="icon-spinner icon-spin icon-3x"></i>';


function onClickUnreadTab() {
    console.error('unread tab clicked');
    $('#unread-table').html(spinner);
    updateUnreadCollection(updateUnreadTab);
}

function onClickAllTab() {
    updateUnreadCollection();
}


function browsePaneReady() {
    console.debug('ready to work on browse pane');

    updateBrowsePane("message-table");

    $("#search-button").click(function(event){
        //console.log("clicked search button");
        var inp=$("#search-tbox").val();
        //console.log(inp);
        //var messageIDs=getMessageIDs(inp);
        if(inp.length>0){
            updateSearchedBrowsePane(inp);
            addClickListener();
        }
        //$(".ui-menu-item").hide()
    });

    $("#search-tbox").keydown(function(event){
        console.log("keydown listener search------------------------------------------");
        var inp=$("#search-tbox").val();

        if(event.which==13){
            if(inp.length>0){ //checking for 'enter'
            //console.log("Listening to ENTER. input is "+inp+"matching messages are ");
            //console.log("messageIDs");
            updateSearchedBrowsePane(inp);
            addClickListener();
            //$(".ui-menu-item").hide()
            }
            else{
                updateBrowsePane();
            }
        }
        //escape key clears search
        else if(event.which==27){
            $("#search-tbox").val("");
            updateBrowsePane();
        }
        else if(inp==null || inp.length<2){
            console.log('NULL OR <2 INPUT: BROWSE PANE RETURNING');
            updateBrowsePane();
        }
    });

    //not currently functioning
    $("#search-tbox").autocomplete({
        source: function(request, response){
            //console.log(request.term);
            if(request.term.length>2){
                response(function(){

                });
                var inp=$("#search-tbox").val();
                //var messageIDs=getMessageIDs(inp);
                updateSearchedBrowsePane(inp);
                addClickListener();
            }
            else{
                updateBrowsePane();
            }
        }
    });

    $('#unread-tab').click(onClickUnreadTab);
    $('#all-tab').click(onClickAllTab);

}

function addClickListener(){
    //console.log("in addClickListener()");
    $(".message").click(function(){
        console.log("CLICKED ON "+$(this).attr('id'));
        var focusedId=$(this).attr("id"); //id of message that is clicked
        replyId = focusedId;
        displayMessage(focusedId);
        $("#replyFormDiv").hide();
        $("#replyButton").removeAttr("disabled");
        resetReply();  
        $("#splashAlert").hide();
        $(this).removeClass('unread');
        $('#' + focusedId).removeClass('unread');
        updateUnreadCount();
        $('.message').removeClass('readingnow');
        $(this).addClass('readingnow');
    });
    addUnreadListeners();
    addBrowsepaneTooltips();
}

function addUnreadListeners() {
    //console.log('adding listeners to unread messages');
    updateUnreadCount();
    $('#unread-table .message').click(function() {
        //marking message as read
        var focusedId=$(this).attr("id"); //id of message that is clicked
        getMessage(focusedId, function(msg){
            markRead(msg);
        });
        $(this).addClass('muted');
       
    });
}