/** MESSAGE DOCUMENTATION
 * Message represents a message sent from one desk worker to all other desk workers. Messages include information about the author, the date/time of creation, tags and other markers, and the message itself.

	Input
	- title
		a string, the title of the message
	- text
		a string, the message text
	- author
		a string, the name of the desk worker
	- tags
		a list of strings, all tags on either the message or the reply, not sorted
	- type
		a string, either Note or Issue, use the constants Message.NOTE or Message.ISSUE
	- priority
		a boolean, use the constants Message.HIGH_PRI or Message.LOW_PRI
	- alert
		a boolean true or false, whether or not to alert the desk captain, use the constants Message.ALERT or Message.NO_ALERT
	- date (optional)
		a Date object, encompassing the date and time of the message's creation; if not provided, will use current date and time 

 */
 

MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var Message = function(title, text, author, tags, type, priority, alert, date) {
    ////////////////////////////////////////////////
    // Representation
    //////////

    this.title = title;
	this.text = text;
	this.author = author;
	this.tags = tags;
	this.alert = alert;
	this.type = type;
	this.priority = priority;
	if (date){
		this.date = date;
	} else {
		this.date = new Date();
	}
	this.replies = new Array(); // create an empty array for replies


	////////////////////////////////////////////////
	// Public methods
	//////////
	// returns a (slightly) human readable string for the message object
	this.toString = function(){			
		var output = this.date + ': ' + this.author + ': ' + this.title + ': ' + this.type + ': ' + this.text + '->'+ this.tags +'-> priority: ' + this.priority + '->alert: ' + this.alert;
		return output;
	}

	// returns a formatted string for the month/day of the date, i.e. "Apr 6"
	this.getDay = function(){
		if (this.formattedDay){
			return this.formattedDay;
		}
		var formattedDay = MONTHS[this.date.getMonth()] + ' ' + this.date.getDate();
		this.formattedDay = formattedDay;
		return formattedDay;
	}

	// returns a formatted string for the 12-hour time of the date, i.e. "11:46 PM"
	this.getTime = function(){
		if (this.formattedTime) {
			return this.formattedTime;
		}
		var hours = this.date.getHours() == 0 ? "12" : this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours();
	    var minutes = (this.date.getMinutes() < 9 ? "0" : "") + this.date.getMinutes();
	    var ampm = this.date.getHours() < 12 ? "AM" : "PM";
	    var formattedTime = hours + ":" + minutes + " " + ampm;
	    this.formattedTime = formattedTime;
	    return formattedTime;
	}

	// takes a Reply object and adds it to the end of the Message's list of replies; adds all of the reply's tags to the messages list of tags
	this.addReply = function(reply){
		this.replies.push(reply);
		for (index in reply.tags){
			this.tags.push(reply.tags[index].toLowerCase()); //tags MUST be lowercase (for search)
		}
	}


}

////////////////////////////////////////////////
// Public Message Constants
	Message.HIGH_PRI = true;
	Message.LOW_PRI = false;
	Message.ALERT = true;
	Message.NO_ALERT = false;
	Message.NOTE = "Note";
	Message.ISSUE = "Issue";


/** REPLY DOCUMENTATION
 * Reply represents a response to another message, so it includes fewer fields

	Input
	- text
		a string, the response text
	- author
		a string, the name of the desk worker
	- tags
		a list of strings added in the reply, will be added to message's tags
	- date (optional)
		a Date object, encompassing the date and time of the response's creation; if not provided, will use current date and time 

 */
var Reply = function(title, text, author, tags, date) {
	////////////////////////////////////////////////
    // Representation
    //////////

	this.text = text;
	this.author = author;
	this.tags = tags;
	this.title = title;
	if (date){
		this.date = date;
	} else {
		this.date = new Date();
	}

	////////////////////////////////////////////////
	// Public methods
	//////////
	// returns a (slightly) human readable string for the message object
	this.toString = function(){			
		var output = this.title + ': ' + this.date + ': ' + this.author + ': ' + this.text + '->'+ this.tags;
		return output;
	}

	// returns a formatted string for the month/day of the date, i.e. "Apr 6"
	this.getDay = function(){
		if (this.formattedDay){
			return this.formattedDay;
		}
		var formattedDay = MONTHS[this.date.getMonth()] + ' ' + this.date.getDate();
		this.formattedDay = formattedDay;
		return formattedDay;

	}

	// returns a formatted string for the 12-hour time of the date, i.e. "11:46 PM"
	this.getTime = function(){
		if (this.formattedTime) {
			return this.formattedTime;
		}
		var hours = this.date.getHours() == 0 ? "12" : this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours();
	    var minutes = (this.date.getMinutes() < 9 ? "0" : "") + this.date.getMinutes();
	    var ampm = this.date.getHours() < 12 ? "AM" : "PM";
	    var formattedTime = hours + ":" + minutes + " " + ampm;
	    this.formattedTime = formattedTime;
	    return formattedTime;
	}
}
