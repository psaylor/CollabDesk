function browsePaneReady() {
	console.debug('ready to work on browse pane');

	browsePane = new BrowsePane();
	browsePane.updateBrowsePane("message-table",db);

	$(".message").click(function(){
    var focusedId=$(this).attr("id"); //id of message that is clicked
    replyId = focusedId;
    displayMessage(focusedId);
    });

    $("#search-button").click(function(event){
        //console.log("clicked search button");
        var inp=$("#search-tbox").val();
        //console.log(inp);
        var messageIDs=search.getMessageIDs(inp,db);
        browsePane.updateSearchedBrowsePane("message-table",db, messageIDs);
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
            var messageIDs=search.getMessageIDs(inp,db);
            //console.log("messageIDs");
            //console.log(search.getMessageIDs(inp,db));
            browsePane.updateSearchedBrowsePane("message-table",db, messageIDs);
            $(".ui-menu-item").hide()
        }

        if(inp==null || inp.length<2){
            console.log("ELSE "+inp);
            browsePane.updateBrowsePane("message-table",db);
        }
    });

    $("#search-tbox").autocomplete({
        source: function(request, response){
            //console.log(request.term);
            if(request.term.length>2){
                response(search.getMessageTitles(request.term.toLowerCase(),db));
                var inp=$("#search-tbox").val();
                var messageIDs=search.getMessageIDs(inp,db);
                browsePane.updateSearchedBrowsePane("message-table",db, messageIDs);
            }
            else{
            	browsePane.updateBrowsePane("message-table", db);
            }
        }
    });

    //Advanced Search Popover
    $('#search-tbox').blur(function(event){
    	console.log(event);
    	console.log("FOCUS IS BELOW");
    	console.log($(':focus'));
    	if(!$('.popover').is('focus')){
    		//$(this).popover('hide');
    		//popoverShowing=false;
    	}
    });

    $('#search-tbox').popover({
    	title: 'Search Options',
    	trigger: 'manual',
    	html: true,
    	content: search.showSearchDetails()
    });


}