/** BROWSE PANE DOCUMENTATION
 * Handles functionality for Browse Pane, which displays all the messages
 */


////////////////////
//"PUBLIC" FUNCTIONS
////////////////////

/**
* Refreshes View for Browse Pane (called any time message or reply is added)
*
*/
function updateBrowsePane (divID){
	console.log("in updateBrowsePane() for " + divID+"------------------------------------------------------------------");
	$("#"+divID).empty();
	//console.log($("#"+divID).html());

	getUnreadMessages(function(unreadList){
		var output="<div class='group'><div class='bucket' id='unread'>Unread</div><ul id='unread-content'>";
		if(unreadList.length>0){
			for (i in unreadList){

				msg=unreadList[i];
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



				output +="<li class = 'message' id='"+id+"'>"+
							"<div class='message-metadata'><div class='timestamp'>"+dateStr+"</div>"+
							"<i class='icon-exclamation-sign icon-color'></i><i class='icon-reorder icon-color'></i><i class='icon-envelope icon-color'></i></div>"+
							//determineIcons(alert, priority, noteVsIssue)+ "</div>"+
							"<div class='message-content'>"+
							"<div class='title'>"+title+"</div><div class='text'>"+text+"</div>"+
							"</div>"+
							"</li>";
			}		
		}
		output+="</ul></div>"
		$("#"+divID).append(output);
	});
	
	console.log("unread is done. now onto read:");

	getReadMessages(function(readList){ //list of type messages
		console.log("IN updateBrowsePane(): getReadMessages():");
		console.log(readList);
		var hash = {};
		var msg;
		var date; //string
		var dateList=[];
		var month; //string
		var day; //string
		var output="";

		for (index in readList){ 
			msg=readList[index];
			//console.log(msg);
			date= msg.get('date');
			//console.log(date);

			//setting 2 digit month
			if(date.getMonth()+1<10){
				month="0"+(date.getMonth()+1).toString();
			}
			else{
				month=(date.getMonth()+1).toString();
			}
			//console.log(month);

			//setting 2 digit day
			if(date.getDate().length<2){
				day="0"+date.getDate();
			}
			else{
				day=date.getDate();
			}

			date=month+day; //4 numbers (as string)
			
			if(dateList.indexOf(date)<0){
				dateList.push(date);				
			}

			//adding to hashtable
			if(hash.hasOwnProperty(date)){
				hash[date].push(readList[index].id);
			}
			else{
				hash[date]=[readList[index].id];
			}
		}

		dateList.reverse();
		//console.log("dates: "+dateList);

		for(index in dateList){
			date = dateList[index];
			output+=getDateTableHTML(date, hash[date])
		}
		//console.log("output is "+output);
		$("#"+divID).append(output);
		addClickListener();
	});

	console.log("done adding messages.");
	//adding listeners again
	//addClickListener();

 	$(".message").click(function(){
        console.log("CLICKED ON NAVBAR");
        //var focusedId=$(this).attr("id"); //id of message that is clicked
        //replyId = focusedId;
        //displayMessage(focusedId);

        /*
        //marking message as read
        getMessage(focusedId, function(msg){
            markRead(msg);
        });        
        */

        //updateBrowsePane();
    });

	console.log("listeners added again. leaving updateBrowsePane()...-------------------------------------------");
};


function updateSearchedBrowsePane(divID, messageList){
	$("#"+divID).empty();
	var output="<div class='group'><div class='bucket' id='search'>Search Results</div><ul id='search-content'>"
	if(unreadList.length>0){
			for (i in messageList){

				msg=unreadList[i];
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

				output +="<li class = 'message' id='"+id+"'>"+
							"<div class='message-metadata'><div class='timestamp'>"+dateStr+"</div>"+
							"<i class='icon-exclamation-sign icon-color'></i><i class='icon-reorder icon-color'></i><i class='icon-envelope icon-color'></i></div>"+
							//determineIcons(alert, priority, noteVsIssue)+ "</div>"+
							"<div class='message-content'>"+
							"<div class='title'>"+title+"</div><div class='text'>"+text+"</div>"+
							"</div>"+
							"</li>";
			}		
		}
	output+="</ul></div>";
	//console.log("in update");
	//console.log(output);
	$("#"+divID).append(output);

	//adding listeners again
	addClickListener();

};

//////////////////
//helper functions
//////////////////

function determineIcons(alert, priority, noteOrIssue){
	var hidden;
	var output="";
	if(priority){
		output+="<i class='icon-exclamation-sign icon-color'></i>";
	}
	else{
		output+="<i class='icon-exclamation-sign icon-color hidden'></i>"
	}

	if(noteOrIssue=='note'){
		output+="<i class='icon-reorder icon-color'></i>";
	}
	else if(noteOrIssue='issue'){
		output+="<i class='icon-question-issue icon-color'></i>";
	}

	if(alert){
		output+="<i class='icon-envelope icon-color'></i>";
	}
	else{
		output+="<i class='icon-envelope icon-color hidden'></i>";		
	}
	return output
};

/**
* Converts a single message to HTML to be displayed in the BrowserPane
*
*/
function getMessageHTML(msg, id){
	var title = msg.get('title');
	var date = msg.get('date');
	var dateStr = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear();
	var text = msg.get('text').substring(0,125);
	if(msg.get('text').length>125){ //if message was truncated to display
		text+="...";
	}
	//console.log("title: "+title);
	//console.log("text:" +text);

	var output ="<li class = 'message' id='"+id+"'>"+
				"<div class='message-metadata'><div class='timestamp'>"+dateStr+"</div>"+
				"<i class='icon-exclamation-sign icon-color'></i><i class='icon-note icon-color'></i><i class='icon-envelope icon-color'></i></div>"+
				"<div class='message-content'>"+
				"<div class='title'>"+title+"</div><div class='text'>"+text+"</div>"+
				"</div>"+
				"</li>";
	//console.log(output);
	return output;
};


/**
* Creates a table to group all messages by a specific date
* date: string of length 4 representing month(first 2 digits), day(next 2 digits)
* 
*/
function getDateTableHTML(date, messageIdList){
	console.log("getDateTableHTML()");
	console.log(messageIdList);
	if(messageIdList.length==0){
		return "";
	}
	var outputDate=date.substring(0,2)+"/"+date.substring(2);
	var output="<div class='group'><div class='bucket' id='"+date+"'>"+outputDate+"</div><ul id='unread-content'>"
	var msg;
	for(index in messageIdList){
		getMessage(messageIdList[index], function(msg){
			output+=getMessageHTML(msg, msg.id);
		});
	}
	output+="</ul></div>";
	return output;

}

// /**
// * Given a list of message ids, return the html corresponding to the id of the filtered 
// */
// function getSelectedMessagesHTML(messageList){
// 	//console.log(messageList);
// 	var output = "";
// 	for (i in messageList){
// 		output+=getMessageHTML(getMessage(messageList[i]), messageList[i]);
// 	}
// 	//console.log(output);
// 	return output;
// };
