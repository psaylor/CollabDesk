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

function getDayHash(msglist) {
	console.log('getting day hash for msglist');
	console.log(msglist);
	var hash = {};
	var msg;
	var day;

	for (var index = 0; index < msglist.length; index++) {
		// console.log('index ' + index);
		msg = msglist.at(index);
		day = msg.getDay();
		if (day in hash) {
			// console.log(day + " already in hash ");
			hash[day].push(msg);
		}
		else {
			hash[day] = [msg];
		}
	}

	return hash;
}

function updateUnreadTab(unreadList) {
	console.debug('updating unread tab view');

	var hash = getDayHash(unreadList);

	var unreadTableID = '#unread-table';
	$(unreadTableID).empty();

	for(day in hash){
		getDateTableHTML(day, hash[day], unreadTableID);
	}

	
	addClickListener();

}

function updateAllTab(allList) {
	console.debug('updating all tab view');
	//console.log("IN updateBrowsePane(): getReadMessages():");
	//console.log(readList);
	var hash = getDayHash(allList);

	//dateList.reverse();
	//console.log("dates: "+dateList);

	var readTableID = '#read-table';
	$(readTableID).empty();

	for(day in hash){
		getDateTableHTML(day, hash[day], readTableID);
	}

	// $("#"+divID).append(output);

	addClickListener();
}

function updateBrowsePane (){
	console.log("in updateBrowsePane()");
	// $("#"+divID).empty();
	
	$("#read-table").empty();
	//console.log($("#"+divID).html());
	//var unreadOutput="";
	getUnreadMessages(updateUnreadTab);

	addClickListener();	
	
	//console.log("unread is done. now onto read:");

	getAllMessages(updateAllTab);

	console.log("done adding messages.");
	//adding listeners again
	//addClickListener();
	//console.log("listeners added again. leaving updateBrowsePane()...-------------------------------------------");
};


function updateSearchedBrowsePane(input){
	console.log("--------------------IN updateSearchBrowsePane()-----------------------");

	//this is a hack...
	divID='read-table';
	$("#"+divID).empty();
	//var output="<div class='group'><div class='bucket' id='search'>Search Results</div><ul id='search-content'>"

	//setting up search terms
	inputArray = input.toLowerCase().split(" ");
	console.log(inputArray);
	var options = {};
	options.tags=inputArray;
	options.title=inputArray;
	options.text=inputArray;


	//bucket and ul divs within group
	var group = $(document.createElement('div')).addClass('group');
	
	//outputDate within bucket
	var bucket = $(document.createElement('div'))
		.addClass('bucket')
		.attr('id','search')
		.append('Search Results');

	//messages (<li>) in here
	var ul = $(document.createElement('ul'))
		.attr('id','search-content');

	$(group).append(bucket);
	$(group).append(ul);

	advancedSearch(options, function(matches){
		console.log("matches:");
		console.log(matches);

		var msg;

		for (index in matches){
			msg=matches[index]
			$(ul).append(getMessageHTML(msg));
		}

	$("#"+divID).html(group);
	addClickListener();
	});
	
	//adding listeners again
	//addClickListener();

};

//////////////////
//helper functions
//////////////////

function determineIcons(alert, priority, noteOrIssue){
	var hidden;
	var output="";
	if(priority){
		output+="<i class='icon-exclamation-sign'></i>";
	}
	else{
		output+="<i class='icon-exclamation-sign hidden'></i>"
	}

	if(noteOrIssue==ISSUE){
		output+="<i class='icon-question-sign'></i>";
	}
	else{
		output+="<i class='icon-reorder'></i>";
	}

	if(alert){
		output+="<i class='icon-user'></i>";
	}
	else{
		output+="<i class='icon-user hidden'></i>";		
	}
	return output
};

function createGroup(bucketId, bucketTitle, ulID){
	//bucket and ul divs within group
	var group = $(document.createElement('div')).addClass('group');
	
	//outputDate within bucket
	var bucket = $(document.createElement('div'))
		.addClass('bucket')
		.attr('id',bucketId)
		.append(bucketTitle);

	//messages (<li>) in here
	var ul = $(document.createElement('ul'))
		.attr('id', ulID);

	$(bucket).append(outputDate);
	$(group).append(bucket);
	$(group).append(ul);

	return group;

}

/**
* Converts a single message to HTML to be displayed in the BrowserPane
*
*/
function getMessageHTML(msg){


	var title = msg.get('title');
	var date = msg.get('date');
	var dateStr = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear();
	var text = msg.get('text').substring(0,125);
	var alert=msg.get('alert'); //boolean
	var priority = msg.get('priority'); //boolean
	var noteVsIssue = msg.get('type'); //string
	var id = msg.id;
	if(msg.get('text').length>125){ //if message was truncated to display
		text+="...";
	}
	//console.log("title: "+title);
	//console.log("text:" +text);

	var li = $(document.createElement('li'))
		.addClass('message')
		.attr('id', id);
	var metadata = $(document.createElement('div'))
		.addClass('message-metadata');
	var timestamp = $(document.createElement('div'))
		.addClass('timestamp');

	$(timestamp).append(dateStr);
	$(metadata).append(timestamp);
	$(metadata).append(determineIcons(alert,priority,noteVsIssue));

	var content = $(document.createElement('div'))
		.addClass('message-content');
	var titleDiv = $(document.createElement('div'))
		.addClass('title');
	$(titleDiv).append(title);
	var textDiv = $(document.createElement('p')).addClass('text');
	$(textDiv).append(text);
	$(content)
		.append(titleDiv)
		.append(textDiv);

	$(li).append(metadata);
	$(li).append(content);


	// var output ="<li class = 'message' id='"+id+"'>"+
	// 			"<div class='message-metadata'><div class='timestamp'>"+dateStr+"</div>"+
	// 			//"<i class='icon-exclamation-sign icon-color'></i><i class='icon-note icon-color'></i><i class='icon-envelope icon-color'></i></div>"+
	// 			determineIcons(alert, priority, noteVsIssue)+ "</div>"+
	// 			"<div class='message-content'>"+
	// 			"<div class='title'>"+title+"</div><div class='text'>"+text+"</div>"+
	// 			"</div>"+
	// 			"</li>";
	//console.log(output);
	//return output;

	return li;
};


/**
* Creates a table to group all messages by a specific date
* date: string of length 4 representing month(first 2 digits), day(next 2 digits)
* 
*/
function getDateTableHTML(date, messageList, containerID) {
	//console.log("getDateTableHTML()");
	//console.log(messageList);
	if (messageList.length==0) {
		return "";
	}
	var outputDate=date;
	//var output="<div class='group'><div class='bucket' id='"+date+"'>"+outputDate+"</div><ul>"
	
	//bucket and ul divs within group
	var group = $(document.createElement('div')).addClass('group');
	
	//outputDate within bucket
	var bucket = $(document.createElement('div'))
		.addClass('bucket')
		.attr('id',date);

	//messages (<li>) in here
	var ul = $(document.createElement('ul'));

	$(bucket).append(outputDate);
	$(group).append(bucket);
	$(group).append(ul);

	//var msg;
	for(index in messageList){
		msg=messageList[index]
		$(ul).append(getMessageHTML(msg));
		}

	$(containerID).append(group);

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


function getNoUnreadAlert() {
	
	var alertContent = $(document.createElement('strong'))
		.html('No Unread Messages');
	var alertDiv = $(document.createElement('div'))
		.addClass('alert')
		.addClass('alert-info')
		.html(alertContent);
	return alertDiv;
}

function updateUnreadCount(count) {
	if (count){
		$('#unread-count').html(count);
	} else {
		$('#unread-count').html(unreadCollection.length);
	}
}
