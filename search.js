/** SEARCH DOCUMENTATION: bxie 11 April 2013
 * Functionality of search bar,
 * 
 */

var Search = function(){
	
	/*
	* Given a string, return a list of message ids representing messages
	* whose title, text (message), tags match the search request
	*
	*/
	 this.getMessageIDs=function(input, database){
	 	var message_list = database.getAllMessages();
	 	var matching_messages = [];
	 	var msg;
	 	var title;
	 	var text;
	 	var inp = input.toLowerCase();

	 	for(id in message_list){
	 		msg = db.getMessage(id);
	 		title = msg.title.toLowerCase();
	 		text = msg.text.toLowerCase();

	 		//console.log("title: "+title);
	 		//console.log("text: "+text);
	 		//console.log(msg);
	 		if(title.indexOf(inp)>-1){ //searching match for title
	 			matching_messages.push(id);
	 		}
	 		else if(text.indexOf(inp)>-1){ //searching match in message
	 			matching_messages.push(id);
	 		}
	 		else if(msg.tags.length>0){ //searching match in tag list
	 			for(index in msg.tags){
	 				//console.log("tag:");
	 				//console.log(msg.tags[index]);
	 				if(msg.tags[index].toLowerCase().indexOf(input)>-1){
	 					matching_messages.push(id);
	 				}
	 			}
	 		}
	 	}
	 	return matching_messages;
	 };

	/*
	* Given a string, return a list of message titles representing messages
	* whose title, text (message), tags match the search request
	*/
	 this.getMessageTitles=function(input, database){
	 	var msgIDs = this.getMessageIDs(input, database);
	 	var msgTitles = [];

	 	for(index in msgIDs){
	 		console.log(index+" corresponds to msgID "+msgIDs[index]);
	 		msgTitles.push(database.getMessage(msgIDs[index]).title);
	 	}
	 	console.log(msgTitles);
	 	return msgTitles;
	 }
};