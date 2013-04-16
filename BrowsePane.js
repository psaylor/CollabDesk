/** BROWSE PANE DOCUMENTATION
 * Handles functionality for Browse Pane, which displays all the messages
 */
ss////////////////////////sssssssssssssssssssssssssssssssssssss
var BrowsePane = function(){
	/**
	* Converts a message to HTML to be displayed in the BrowserPane
	*
	*/
	this.getMessageHTML=function(msg){
		var title = msg.title;
		var text = msg.text.substring(0,125);
		if(msg.text.length>125){ //if message was truncated to display
			text+="...";
		}
		console.log("title: "+title);
		console.log("text:" +text);

		var output ="<tr><td><div class='message'><div class='title'>"
					+title+"</div><div class='text'>"+text+"</div></div></td></tr>";
		console.log(output);
		return output;
	};

	/**
	* Given a list of messages, return the html corresponding to the id of the filtered 
	*/
	this.getSelectedMessagesHTML=function(messageList){
		var output = "";
		for (i in messageList){
			output+=getMessageHTML(messageList(i));
		}
		return output;
	};

	/**
	* Gets all undread messages and returns the html of them
	*/
	this.getUnreadMessagesHTML=function(messageList){

	};

	/**
	* Moves message from unread list to list with dates
	*
	*/
	this.moveReadMessage=function(message){

	};

	/**
	* Creates tables for each date and sorts messages accordingly
	*
	*/
	this.getDatedMessagesHTML=function(messageList){
		
	}

};