/** BROWSE PANE DOCUMENTATION
 * Handles functionality for Browse Pane, which displays all the messages
 */

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
		//console.log("title: "+title);
		//console.log("text:" +text);

		var output ="<tr><td><div class='message'><div class='title'>"
					+title+"</div><div class='text'>"+text+"</div></div></td></tr>";
		//console.log(output);
		return output;
	};

	/**
	* Post all messages stored in database onto browser pane
	*
	*/
	this.getAllMessageHTML=function(database)	{
		var msgList = database.getAllMessages(); //list of message objects
		var output="";
		for (var i=msgList.length-1; i>=0; i--){
			output+=this.getMessageHTML(msgList[i]);
		}
		return output

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
	this.getAllDatedMessagesHTML=function(database){
		var hash = {};
		var msg;
		var date; //string
		var dateList=[];
		var month; //string
		var day; //string
		var output="";
		for (index in database.getAllMessages()){
			msg=database.getMessage(index);
			//console.log(msg);
			date= msg.date;
			console.log(date);

			//setting 2 digit month
			if(date.getMonth()+1<10){
				month="0"+(date.getMonth()+1).toString();
			}
			else{
				month=(date.getMonth()+1).toString();
			}
			console.log(month);

			//setting 2 digit day
			if(date.getDate().length<2){
				day="0"+date.getDate();
			}
			else{
				day=date.getDate();
			}
			console.log(day);

			date=month+day; //4 numbers (as string)
			
			if(dateList.indexOf(date)<0){
				dateList.push(date);				
			}

			//adding to hashtable
			if(hash.hasOwnProperty(date)){
				hash[date].push(index);
			}
			else{
				hash[date]=[index];
			}
		}

		dateList.reverse();
		//console.log("dates: "+dateList);
		console.log(hash);
		for(index in dateList){
			date = dateList[index];
			output+=this.getDateTableHTML(db, date, hash[date])
		}
		//console.log("output is "+output);
		return output;

	}

	/**
	* Creates a table to group all messages by a specific date
	* date: string of length 4 representing month(first 2 digits), day(next 2 digits)
	* 
	*/
	this.getDateTableHTML=function(database, date, messageIdList){
		var outputDate=date.substring(0,2)+"/"+date.substring(2);
		var output="<table class='table' id='"+date+"'><thead><tr><th>"+outputDate
					+"</th></tr></thead><tbody>";
		var msg;
		for(index in messageIdList){
			msg = database.getMessage(messageIdList[index]);
			output+=this.getMessageHTML(msg);
		}
		output+="</tbody></table>";
		return output;

	}

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

};