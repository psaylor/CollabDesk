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
var cdUser;
var readRelation;

// Constants
HIGH_PRI = true;
LOW_PRI = false;
ALERT = true;
NO_ALERT = false;
NOTE = "Note";
ISSUE = "Issue";
LOGIN_PAGE = "login.html";
MESSAGE_PAGE= "index.html";

function getCurrentUser( ){
	return Parse.User.current();
}

function setup() {
	cdUser = getCurrentUser();
	console.log('user');
	console.log(cdUser);
	if (cdUser) {
		setReadRelation(cdUser);
	}
}

setup();



function login(username, password, successCallback, errorCallback) {
	Parse.User.logIn(username, password, {
		success: function(user) {
			console.log(user + " successfully logged in");
			cdUser = user;
			setReadRelation(user);
			if (successCallback) {
				successCallback(user);
			}
  		},
  		error: function(user, error) {
  			console.debug(user + " failed to log in");
  			if (errorCallback) {
  			errorCallback(user, error);
  			}
  		}
	});
}

// login('Timberlake', '123');
login("Adele", 'test');

function signup(username, pswd, email) {
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

function logoutUser() {
	console.debug("logging out current user");
	Parse.User.logOut();
	cdUser = Parse.User.current();
	window.location.replace(LOGIN_PAGE);
}


// login('Timberlake', '123');

function getUsername() {
	return cdUser.getUsername();
}

function setReadRelation(user) {
	readRelation = user.relation("read");
}

var USER_IMAGES = {};
function getImagesForUsers() {
	var query = new Parse.Query(Parse.User);
	query.find({
		success: function(users) {
			console.debug("found users");
			for (var i = users.length - 1; i >= 0; i--) {
				var u = users[i];
				USER_IMAGES[u.getUsername()] = u.get('img');
			};
			console.debug(USER_IMAGES);
		},
		error: function(obj, error) {

		}
	});
}

getImagesForUsers();
// console.debug(USER_IMAGES);

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
				if (date) {
					formattedDay = MONTHS[date.getMonth()] + ' ' + date.getDate();
					this.set("formattedDay", formattedDay);
					this.save();
				}
				return formattedDay;
			}, 

			getTime: function() {
				var formattedTime = this.get("formattedTime");
				if (formattedTime) {
					return formattedTime;
				}
				var date = this.get("date");
				if (date) {
					var hours = date.getHours() == 0 ? "12" : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
				    var minutes = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
				    var ampm = date.getHours() < 12 ? "AM" : "PM";
				    formattedTime = hours + ":" + minutes + " " + ampm;
				    this.set("formattedTime", formattedTime);
				    this.save();
				}
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
						msg.set("msgId", msg.id);
						msg.save();
						msgCollection.add(msg);
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
				if (date) {
					formattedDay = MONTHS[date.getMonth()] + ' ' + date.getDate();
					this.set("formattedDay", formattedDay);
					this.save();
				}
				return formattedDay;
		},

		getTime: function() {
			var formattedTime = this.get("formattedTime");
			if (formattedTime) {
				return formattedTime;
			}
			var date = this.get("date");
			if (date) {
				var hours = date.getHours() == 0 ? "12" : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
			    var minutes = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
			    var ampm = date.getHours() < 12 ? "AM" : "PM";
			    formattedTime = hours + ":" + minutes + " " + ampm;
			    this.set("formattedTime", formattedTime);
			    this.save();
			}
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

var MsgCollection = Parse.Collection.extend( {
	model: Message,
});

/* COLLECTIONS */
var unreadCollection;
var msgCollection;

function getUnreadCollection() {
	var query = new Parse.Query(Message);
	// query.descending("createdAt");
	var readQuery = readRelation.query();
	query.doesNotMatchKeyInQuery("msgId", "msgId", readQuery);
	unreadCollection = query.collection();
	unreadCollection.comparator = function(msg) {
		return msg.get("date");
	}
	unreadCollection.bind('remove', function() {
		console.log('removed something from unread collection');
		updateUnreadCount();
	});
	console.log('unread collection');
	console.log(unreadCollection);
	return unreadCollection;
}

function onSingleMessageAdd(msg, another) {
	console.log('onSingleMessageAdd');
	console.log(msg);
	console.log(another);

}

function getMsgCollection() {
	msgCollection = new MsgCollection();
	msgCollection.comparator = function(msg) {
		return msg.get("date");
	}
	msgCollection.bind('add', onSingleMessageAdd);
	return msgCollection;
}

function updateUnreadCollection(onSuccess) {
	unreadCollection.fetch({
		success: function(collection) {
	    	console.log('updated unread msg collection');
	    	console.debug(collection);
	    	updateUnreadCount();
	    	if (onSuccess) {
	    		onSuccess(collection);
	    	}
		},
		error: function(collection, error) {
	    // The collection could not be retrieved.
	    	console.log('failed to retrieve unread collection');
		},

		update : true,	

	});
}
 
function updateMsgCollection(onSuccess ) {
	msgCollection.fetch({
		success: function(coll) {
	    	console.log('updated msg collection');
	    	console.debug(coll);
	    	if (onSuccess) {
	    		onSuccess(coll);
	    	}
		},
		error: function(coll, error) {
	    // The collection could not be retrieved.
	    	console.log('failed to retrieve collection');
		},

		update : true,	
	});
}



	function getUnreadMessages(onSuccess, onError) {
		if (unreadCollection) {
			onSuccess(unreadCollection);
		}
		getUnreadCollection();
		updateUnreadCollection(onSuccess);	
	}

	// deprecated : returns all messages actually
	function getReadMessages(onSuccess, onError) {
		getAllMessages(onSuccess, onError);
	}

	function getAllMessages(onSuccess, onError) {
		if (msgCollection) {
			onSuccess(msgCollection);
		}
		getMsgCollection();
		updateMsgCollection(onSuccess);
	}


	function getMessage(message_id, onSuccess, onError) {
		onSuccess( msgCollection.get(message_id) );
	}

	function getRepliesForMessage(msg_obj, onSuccess, onError) {
		var query = new Parse.Query(Reply);
		query.equalTo("parent", msg_obj);
		// Retrieve the most recent ones
		query.ascending("createdAt");
		query.find({
			success: function(replies) {
				console.log("got replies for " + msg_obj);
				console.log(replies);
				if (onSuccess) {
					onSuccess(replies);
				}
			},
			error: function(obj, error) {
				console.log('could not get replies for ' + obj);
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
		console.debug('advancedSearch');
		

		var tagQuery = new Parse.Query(Message);
		var titleQuery = new Parse.Query(Message);
		var textQuery = new Parse.Query(Message);
		var authorQuery = new Parse.Query(Message);

		console.log(query);
		if (options.tags) {
			console.log('adding tags');
			tagQuery.containsAll("tags", options.tags);
		}
		if (options.title) {
			for (var i = options.title.length - 1; i >= 0; i--) {
				titleQuery.contains("title", options.title[i]);
			};
		}
		if (options.text) {
			for (var i = options.text.length - 1; i >= 0; i--) {
				textQuery.contains("text", options.text[i]);
			};
		}
		if (options.author) {
			authorQuery.contains("author", options.author);
		}

		var query = new Parse.Query.or(tagQuery, titleQuery, textQuery);
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
			console.log('----------');
			console.log(unreadCollection);
			updateUnreadCollection();
			console.log('--------------');
			console.log(unreadCollection);
			updateUnreadCount();
		},
		error: function(obj, error) {
			console.log('could not save user reading msg');
			console.log(error);
		}
	});
}

// var title = 'Visa card found';
// 	var text = 'A visa card was found on one of the tables at dining today. It does not have a name on it.';
// 	var author = 'Kayla';
// 	var tags = ['lost/found'];
// 	var type = NOTE;
// 	var priority = HIGH_PRI;
// 	var alert = false;
// 	var date = new Date('17 Mar, 2013 15:15:00');

// 	title = 'Package for Jane';
// 	text = "A package came in for Jane, but she doesn't live here, and I can't find any record of her. It's in bin 6 for now.";
// 	author = "Ben";
// 	tags = ['package'];
// 	type = Message.ISSUE;
// 	priority = Message.LOW_PRI;
// 	alert = true;
// 	var date = new Date('17 Mar, 2013 10:28:00');

// var msg = Message.create(title, text, author, tags, type, priority, alert, date);
// console.log("done with message.");
// console.log(msg);
// console.log('message day: ' + msg.getDay());


	// msg.addReply(reply);
	// console.debug("msg day: " + msg.getDay());

// var MsgQuery = new Parse.Query(Message);
// var msg2 = null;
// MsgQuery.get("POqBGuEw1S", {
// 	success: function(object) {
// 		msg2 = object;
// 		console.debug('successful get msg');
// 		title = 'Returned';
// 	text = 'Mary picked up her ID =]';
// 	author = 'Sam';
// 	tags = ['returned'];
// 	date = new Date('19 Mar, 2013 15:31:00');
// 	var reply = Reply.create(title, text, author, tags, date, msg2);
// 	},
// 	error : function(object, error) {
// 		console.debug('error getting object');
// 		console.debug(error);
// 	}
// });

