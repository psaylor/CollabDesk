/**
 * Message represents a message sent from one desk worker to all other desk workers. Messages include information about the author, the date/time of creation, tags and other markers, and the message itself.

Input
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
 


var Message = function(text, author, tags, type, priority, alert, date) {
    ////////////////////////////////////////////////
    // Representation
    //////////

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


	////////////////////////////////////////////////
	// Public methods
	//////////

	this.toString = function(){			
		
		var output = this.date + ': ' + this.author + ': ' + this.type + ': ' + this.text + '->'+ this.tags +'-> priority: ' + this.priority + '->alert: ' + this.alert;
		return output;
	}
}

////////////////////////////////////////////////
// Public Constants
	Message.HIGH_PRI = true;
	Message.LOW_PRI = false;
	Message.ALERT = true;
	Message.NO_ALERT = false;
	Message.NOTE = "Note";
	Message.ISSUE = "Issue";

