/**
 * Message represents a message sent from one desk worker to all other desk workers. Messages include information about the author, the date/time of creation, tags and other markers, and the message itself.
 */
 
var Message = function(text, author, date, time, tags ) {
    ////////////////////////////////////////////////
    // Representation
    //////////

	this.text = text;
	this.author = author;
	this.date = date;
	this.time = time;
	this.tags = tags;


	////////////////////////////////////////////////
	// Public methods
	//////////

	this.toString = function(){			
		
		var output = this.date + ' ' + this.time + ': ' + this.author + ': ' + this.text + ' -> '+ this.tags ;
		return output;
	}
}