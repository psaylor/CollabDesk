var spinner = '<i class="icon-spinner icon-spin icon-3x"></i>';

function displayUnreadMessages(unreadList) {
var unreadOutput="";
        unreadOutput+="<div class='group'><ul id='unread-content'>";
        if(unreadList.length>0){
            for (var i=0; i< unreadList.length; i++){

                msg=unreadList.at(i);
                var title = msg.get('title');
                var date = msg.get('date');
                var dateStr = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear();
                var text = msg.get('text').substring(0,125);
                var id = msg.id;
                var alert=msg.get('alert'); //boolean
                var priority = msg.get('priority'); //boolean
                var noteVsIssue = msg.get('type'); //string
                if(msg.get('text').length>125){ //if message was truncated to display
                    text+="...";
                }



                unreadOutput +="<li class = 'message' id='"+id+"'>"+
                            "<div class='message-metadata'><div class='timestamp'>"+dateStr+"</div>"+
                            //"<i class='icon-exclamation-sign icon-color'></i><i class='icon-reorder icon-color'></i><i class='icon-envelope icon-color'></i></div>"+
                            determineIcons(alert, priority, noteVsIssue)+ "</div>"+
                            "<div class='message-content'>"+
                            "<div class='title'>"+title+"</div><div class='text'>"+text+"</div>"+
                            "</div>"+
                            "</li>";
            }
            unreadOutput+="</ul>";
        } else {
            unreadOutput = getNoUnreadAlert();
        }
        
        console.log('output string for unread msgs');
        // console.log(unreadOutput);
        $("#unread-table").html(unreadOutput);
        addClickListener();
}

function onClickUnreadTab() {
    console.error('unread tab clicked');
    $('#unread-table').html(spinner);
    updateUnreadCollection(displayUnreadMessages);
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
            updateSearchedBrowsePane("message-table", inp);
            addClickListener();
        }
        //$(".ui-menu-item").hide()
    });

    $("#search-tbox").keydown(function(event){
        var inp=$("#search-tbox").val();
        
        // if(!popoverShowing){
        // 	$(this).popover('show');
        // 	popoverShowing=true;
        // }

        if(event.which==13 && inp.length>0){ //checking for 'enter'
            //console.log("Listening to ENTER. input is "+inp+"matching messages are ");
            //console.log("messageIDs");
            updateSearchedBrowsePane("message-table", inp);
            addClickListener();
            //$(".ui-menu-item").hide()
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
                response(function(){

                });
                var inp=$("#search-tbox").val();
                //var messageIDs=getMessageIDs(inp);
                updateSearchedBrowsePane("message-table", inp);
                addClickListener();
            }
            else{
            	updateBrowsePane("message-table");
            }
        }
    });

    $('#unread-tab').click(onClickUnreadTab);
    $('#all-tab').click(onClickAllTab);

    // updateUnreadCount();

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
        $("#splashAlert").hide();
    });
    addUnreadListeners();
}

function addUnreadListeners() {
    console.log('adding listeners to unread messages');
    updateUnreadCount();
    $('#unread-table .message').click(function() {
        //marking message as read
        var focusedId=$(this).attr("id"); //id of message that is clicked
        getMessage(focusedId, function(msg){
            markRead(msg);
        });
        // updateBrowsePane();
       
    });
}
