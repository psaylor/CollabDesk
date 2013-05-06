/*
	BACKEND CODE THAT WORKS WITH PARSE TO STORE AND RETRIEVE DATA

	SUPPORTS THE FOLLOWING FUNCTIONALITIES:
		- 	search by tag, title, or message content (or combin)
		- 	get msg data the includes date

*/

Parse.initialize("Cd5KiDlPT0SCL3TWJ8vFQRyPhiLaSyMHZgOpD9vN", "XpZzyrBR3thekxFgyoKXElFCdGQxJiieFWqZZKhc");

var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// Database objects
var Message;
var Reply;
// var MessageQuery;
var cdUser;
var readRelation;

// Constants
HIGH_PRI = true;
LOW_PRI = false;
ALERT = true;
NO_ALERT = false;
NOTE = "Note";
ISSUE = "Issue";


function login(username, password ) {
	Parse.User.logIn(username, password, {
		success: function(user) {
			console.log(user + " successfully logged in");
			cdUser = user;
			setReadRelation(user);
  		},
  		error: function(user, error) {
  			console.debug(user + " failed to log in");
  		}
	});
}

function signup( username, pswd, email) {
	var user = new Parse.User();
	user.set('username', username);
	user.set('password', pswd);
	if (email) {
		user.set('email', email);
	}

	user.signUp(null, {
		success: function(user) {
			console.log('successful user signup');
			console.log(user);
			setReadRelation(user);
		},
		error: function(user, error) {
			console.log('could not complete signup');
			console.log(error);
		}
	});
	cdUser = user;
	return user;
}

login('Timberlake', '123');


function getUsername( ){
	return Parse.User.current();
}

function setReadRelation(user) {
	readRelation = user.relation("read");
}

/*
	INITLIALIZETHE BACKEND OBJECTS MESSAGE AND REPLY
*/	
	Message = Parse.Object.extend("Message", { 
			// Instance methods
			getDay: function() {
				var formattedDay = this.get("formattedDay");
				if (formattedDay) {
					return formattedDay;
				}
				var date = this.get("date");
				formattedDay = MONTHS[date.getMonth()] + ' ' + date.getDate();
				this.set("formattedDay", formattedDay);
				this.save();
				return formattedDay;
			}, 

			getTime: function() {
				var formattedTime = this.get("formattedTime");
				if (formattedTime) {
					return formattedTime;
				}
				var date = this.get("date");
				var hours = date.getHours() == 0 ? "12" : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
			    var minutes = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
			    var ampm = date.getHours() < 12 ? "AM" : "PM";
			    formattedTime = hours + ":" + minutes + " " + ampm;
			    this.set("formattedTime", formattedTime);
			    this.save();
			    return formattedTime;
			},

			addReply: function(reply) {
				console.debug("adding reply: " + reply);
				// this.
				this.add("replies", reply);
				this.save();
			}

		}, {
			// Class methods
			create: function(title, text, author, tags, type, priority, alert, date) {
				console.debug("creating message");
				var msg = new Message();
				msg.set("title", title);
				msg.set("text", text);
				msg.set("author", author);
				msg.set("tags", tags);
				msg.set("type", type);
				msg.set("priority", priority);
				msg.set("alert", alert);
				if (date) {
					msg.set("date", date);
				} else {
					msg.set("date", new Date());
				}
				msg.set("replies", new Array());
				msg.set("formattedDay", null);
				msg.set("formattedTime", null);
				msg.save(null, {
					success: function(object) {
						console.debug("msg saved");
					},
					error: function(object, error) {
						console.debug(error);
						console.debug(object);
					}
				});
				return msg;
			}
		});

	
	Reply = Parse.Object.extend("Reply", {
		//Instance Methods
		getDay: function() {
			var formattedDay = this.get("formattedDay");
				if (formattedDay) {
					return formattedDay;
				}
				var date = this.get("date");
				formattedDay = MONTHS[date.getMonth()] + ' ' + date.getDate();
				this.set("formattedDay", formattedDay);
				this.save();
				return formattedDay;
		},

		getTime: function() {
			var formattedTime = this.get("formattedTime");
			if (formattedTime) {
				return formattedTime;
			}
			var date = this.get("date");
			var hours = date.getHours() == 0 ? "12" : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		    var minutes = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
		    var ampm = date.getHours() < 12 ? "AM" : "PM";
		    formattedTime = hours + ":" + minutes + " " + ampm;
		    this.set("formattedTime", formattedTime);
		    this.save();
		    return formattedTime;
		},
	}, {
		//Class Methods
		create: function(title, text, author, tags, date, parentMsg) {
			var reply = new Reply();
			reply.set("text", text);
			reply.set("author", author);
			reply.set("tags", tags);
			reply.set("title", title);
			if (date) {
				reply.set("date", date);
			} else {
				reply.set("date", new Date());
			}
			reply.set('parent', parentMsg);
			reply.save(null, {
				success: function(object) {
					console.debug("reply saved");
					parentMsg.addReply(reply);
				},
				error: function(object, error) {
					console.debug(error);
					console.debug(object);
				}
			});
			console.debug('trying to set replies on parent');
			return reply;
		},
	});


/* 
	QUERY FUNCTIONALITY
*/

	function getUnreadMessages(onSuccess, onError) {
		var query = new Parse.Query(Message);
		// var innerQuery = readRelation.query();
		// query.doesNotMatchQuery("")
		query.doesNotExist("read");
		query.find({
			success: function(unreadMsgList) {
				console.log("got all UNread messages");
				console.log(unreadMsgList);
				if (onSuccess) {
					onSuccess(unreadMsgList);
				}
			},
			error: function(obj, error) {
				console.log('could not get unread msgs');
				console.log(error);
				if (onError) {
					onError(obj, error);
				}
			}
		});
	}

	function getReadMessages(onSuccess, onError) {
		var query = readRelation.query().find({
			success: function(readMsgList) {
				console.log("got all read messages");
				console.log(readMsgList);
				if (onSuccess) {
					onSuccess(readMsgList);
				}
			},
			error: function(obj, error) {
				console.log('could not get read msgs');
				console.log(error);
				if (onError) {
					onError(obj, error);
				}
			}
		});
	}

	function getAllMessages(onSuccess, onError) {
		var query = new Parse.Query(Message);
		query.find({
			success: function(allMsgs) {
				console.log("got all messages");
				console.log(allMsgs);
				if (onSuccess) {
					onSuccess(allMsgs);
				}
			},
			error: function(obj, error) {
				console.log('could not get read msgs');
				console.log(error);
				if (onError) {
					onError(obj, error);
				}
			}
		});
	}

	function getMessage(message_id) {
		var query = new Parse.Query(Message);
		query.get( message_id, {
			success: function(msg) {
				console.log("got message " + message_id);
				console.log(msg);
				if (onSuccess) {
					onSuccess(msg);
				}
			},
			error: function(obj, error) {
				console.log('could not get msg ' + message_id);
				console.log(error);
				if (onError) {
					onError(obj, error);
				}
			}
		});
	}

	/* 
		ADVANCED SEARCHING
	*/
	/*
	expects an options dictionary with the following (optional) fields:
		tags
		title
		content

		an example way to create options
		var options = {
			tags : ['tag1', 'tag2'],
			title: ['phone'],
			text: ['the'],
			author: 'Ben'
		}

	*/
	function advancedSearch(options, onSuccess, onError) {
		var query = new Parse.Query(Message);

		if (options.tags) {
			query.containsAll("tags", options.tags);
		}
		if (options.title) {
			for (var i = options.title.length - 1; i >= 0; i--) {
				query.contains("title", options.title[i]);
			};
		}
		if (options.text) {
			for (var i = options.text.length - 1; i >= 0; i--) {
				query.contains("text", options.text[i]);
			};
		}
		if (options.author) {
			query.contains("author", options.author);
		}

		query.find({
			success: function(matches) {
				console.log("got all matches");
				console.log(matches);
				if (onSuccess) {
					onSuccess(matches);
				}
			},
			error: function(obj, error) {
				console.log('could not get matches');
				console.log(error);
				if (onError) {
					onError(obj, error);
				}
			}
		});
	}


function markRead(msg) {
	readRelation.add(msg);
	cdUser.save(null, {
		success: function(obj) {
			console.log("saved that user read msg");
			console.log(obj);
			cdUser = obj;
		},
		error: function(obj, error) {
			console.log('could not save user reading msg');
			console.log(error);
		}
	});
}



var title = 'Visa card found';
	var text = 'A visa card was found on one of the tables at dining today. It does not have a name on it.';
	var author = 'Kayla';
	var tags = ['lost/found'];
	var type = NOTE;
	var priority = HIGH_PRI;
	var alert = false;
	var date = new Date('17 Mar, 2013 15:15:00');

	title = 'Package for Jane';
	text = "A package came in for Jane, but she doesn't live here, and I can't find any record of her. It's in bin 6 for now.";
	author = "Ben";
	tags = ['package'];
	type = Message.ISSUE;
	priority = Message.LOW_PRI;
	alert = true;
	var date = new Date('17 Mar, 2013 10:28:00');

var msg = Message.create(title, text, author, tags, type, priority, alert, date);
console.log("done with message.");
console.log(msg);
console.log('message day: ' + msg.getDay());

// title = 'Fixed';
// 	text = 'Sally picked up her id. All better =]';
// 	author = 'Sam';
// 	tags = ['fixed'];
// 	date = new Date('19 Mar, 2013 15:31:00');
// 	var reply = Reply.create(title, text, author, tags, date, msg);
// 	// msg.addReply(reply);
// 	console.debug("msg day: " + msg.getDay());

// var MsgQuery = new Parse.Query(Message);
// var msg2 = null;
// MsgQuery.get("6LU7Ua5OEp", {
// 	success: function(object) {
// 		msg2 = object;
// 		console.debug('successful get msg');
// 	},
// 	error : function(object, error) {
// 		console.debug('error getting object');
// 		console.debug(error);
// 	}
// });

