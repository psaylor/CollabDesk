/** SEARCH DOCUMENTATION: bxie 11 April 2013
 * Functionality of search bar,
 * 
 */

/*
* Given a string, return a list of message ids representing messages
* whose tags or titles or messages match the search request
*
*/
 var search=function(inp){
 	var message_list = this.getAllMessages();
 	var matching_messages = [];

 	for(msg in message_list){
 		if(msg.tags.indexOf(inp)>-1) { //check if value is in tag list
 			matching_messages.push(msg);
 		}
 		else if(msg.title.indexOf(inp)>-1){
 			matching_messages.push(msg);
 		}
 		else if(msg.text.indexOf(inp)>-1){
 			matching_messages.push(msg);
 		}
 	}
 	return matching_messages;
 };