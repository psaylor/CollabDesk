/** SEARCH DOCUMENTATION: bxie 11 April 2013
 * Functionality of search bar,
 * 
 */

	
/*
* Given a string, return a list of message ids representing messages
* whose title, text (message), tags match the search request
* @param input string to search for
*
*/
 function getMessageIDs(input){
 	var msgIDs=[];
 	//default parameters
 	var searchTags = $('#check-tag').is(':checked');
 	var searchTitles = $('#check-title').is(':checked');
 	var searchText = $('#check-text').is(':checked');
 	var inputArray = input.toLowerCase().split(" ");

 	var options={};
 	if(searchTags){
 		options.tags=inputArray.slice(0);
 	}
 	if(searchTitles){
 		options.title=inputArray.slice(0);
 	}
 	if(searchText){
 		options.text=inputArray.slice(0);
 	}

 	//matches: list of message types
 	advancedSearch(options, function(matches){
 		for(i in matches){
 			msgIDs+=matches[i].id;
 		}
 		
 	});

 	return msgIDs;

 	// var message_list = database.getAllMessages();
 	// var matching_messages = [];
 	// var msg;
 	// var title;
 	// var text;

 	// for(id in message_list){
 	// 	msg = db.getMessage(id);
 	// 	title = msg.title.toLowerCase();
 	// 	text = msg.text.toLowerCase();

 	// 	if(searchTitles && title.indexOf(inp)>-1){
 	// 		matching_messages.push(id);
 	// 	}
 	// 	else if(searchText && text.indexOf(inp)>-1){
 	// 		matching_messages.push(id);
 	// 	}
 	// 	else if(searchTags && msg.tags.length>0){
 	// 		for(index in msg.tags){
 	// 			//console.log("tag:");
 	// 			//console.log(msg.tags[index]);
 	// 			if(msg.tags[index].indexOf(input)>-1){
 	// 				matching_messages.push(id);
 	// 			}
 	// 		}
 	// 	}
 	// }
 	// return matching_messages;
 };

/*
* Given a string, return a list of message titles representing messages
* whose title, text (message), tags match the search request
*/
 function getMessageTitles(input){
 	var msgIDs = this.getMessageIDs(input);
 	var msgTitles = [];

 	for(index in msgIDs){
 		//console.log(index+" corresponds to msgID "+msgIDs[index]);
 		msgTitles.push(msgIDs[index].get('title'));
 	}
 	//console.log(msgTitles);
 	return msgTitles;
 }

 function showSearchDetails(){
 	htmlString="<input type='checkbox' name='Tags' value='Tags' id='check-tag' checked/> Tags "+
 				"<input type='checkbox' name='Title' value='Titled' id='check-title' checked/> Titles "+
 				"<input type='checkbox' name='Message' value='Message' id='check-text' checked/> Message Body";
 	return htmlString;
 }