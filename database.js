/** DATABASE DOCUMENTATION
 * Database maintains all Message() objects in CollabDesk
 * Maintains the read/unread status of messages

 */
var Database = function() {
	////////////////////////////////////////////////
    // Representation
    //////////

	this.messages = new Array(); // an array of all Message() objects
	this.unread = new Array(); //an array of the index of unread Messages in this.messages
	this.titles = new Array(); // an array of titles, can be used for searching
	this.tags = new Array();	// an array of tags, can be used for searching


	////////////////////////////////////////////////
	// Public methods
	//////////
	// returns a (slightly) human readable string for the message object
	this.toString = function(){			
		return this.unread;
	}

	// add a message to the database, updating this.titles and this.tags appropriately
	// this message will be 'unread'
	this.addMessage = function(msg){
		this.unread.push(this.messages.length) // add the msg's index to unread 
		this.messages.push(msg); // append the msg to the end of messages
		this.titles.push(msg.title);
		for (var i = 0; i < msg.tags.length; i++) {
			var tag = msg.tags[i];
			if(tag[0] && this.tags.indexOf(tag) == -1) {
				this.tags.push(tag[0].toLowerCase()); //tags MUST be lowercase (for search)
			}
		};
	}

	// returns a list of message id's for unread messages
	// the message_id is the message's index in this.messages
	this.getUnreadMessages = function(){
		//var result = {};
		var result = [];
		for (var i = 0; i < this.unread.length; i++) {
			var id = this.unread[i];
			//result[id] = this.messages[id];
			result.push(id);
		}
		return result;
	}

	// returns a list of message id's for read messages
	this.getReadMessages = function() {
		//var result = {};
		var result = [];
		for (var i = 0; i < this.messages.length; i++) {
			if (this.messages[i] && this.unread.indexOf(i) == -1) { //checking message existed (not deleted) and read
				// the index of the message is not in the unread list
				// so it is read
				//result[i] = this.messages[i];
				result.push(i);
			}
		}
		return result;
	}

	//returns an array of Message() objects, where their index in the array is their message_id
	this.getAllMessages = function() {
		var result = new Array();
		for (id in this.messages) {
			result[id] = this.messages[id];
		}
		return result;
	}

	// removes the message with message_id from the unread list
	this.markRead = function(message_id) {
		var index = this.unread.indexOf(message_id);
		this.unread.splice(index, 1);
	}

	// returns the message object with message_id
	this.getMessage = function(message_id) {
		return this.messages[message_id];
	}

}

