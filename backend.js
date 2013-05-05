function login( ) {
	Parse.User.logIn(username, password, {
		success: function(user) {
			console.log(user + " successfully logged in");
  		},
  		error: function(user, error) {
  			console.debug(user + " failed to log in");
  		}
	});
}

function getUsername( ){
	return Parse.User.current();
}

var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// Database objects
var Message;
var Reply;


// Constants
HIGH_PRI = true;
LOW_PRI = false;
ALERT = true;
NO_ALERT = false;
NOTE = "Note";
ISSUE = "Issue";

function initializeBackend() {

	Parse.initialize("Cd5KiDlPT0SCL3TWJ8vFQRyPhiLaSyMHZgOpD9vN", "XpZzyrBR3thekxFgyoKXElFCdGQxJiieFWqZZKhc");
	
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

			// addReply: function(reply) {
			// 	console.debug("adding reply: " + reply);
			// 	this.add("replies", reply);
			// 	this.save();
			// 	reply.set("parent", this);
			// 	reply.save();
			// }
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
			reply.save(null, {
				success: function(object) {
					console.debug("reply saved");
					this.set("parent", parentMsg);
					this.save(null, {
						success: function(object) {
							console.debug("reply's parent info saved");
						},
						error: function(object, error) {
							console.debug("error saving object");
							console.debug(object);
							console.debug(error);
						}
					});
					parentMsg.addUnique("replies", this);
					parentMsg.save();
				},
				error: function(object, error) {
					console.debug(error);
					console.debug(object);
				}
			});
			return reply;
		},
	});

}

initializeBackend();

var title = 'Visa card found';
	var text = 'A visa card was found on one of the tables at dining today. It does not have a name on it.';
	var author = 'Kayla';
	var tags = ['lost/found'];
	var type = NOTE;
	var priority = HIGH_PRI;
	var alert = false;
	var date = new Date('17 Mar, 2013 15:15:00');
var msg = Message.create(title, text, author, tags, type, priority, alert, date);
console.log("done with message.");
console.log(msg);
console.log('message day: ' + msg.getDay());

title = 'Fixed';
	text = 'Jacinto came by and fixed it. All better =]';
	author = 'Sam';
	tags = ['fixed'];
	date = new Date('19 Mar, 2013 15:31:00');
	var reply = Reply.create(title, text, author, tags, date, msg);
	// msg.addReply(reply);
	console.debug("msg day: " + msg.getDay());

var MsgQuery = new Parse.Query(Message);
var succmsg;
var msg2 = MsgQuery.get("hgeWXPOWgx", {
	success: function(object) {
		succmsg = object;
		console.log('successful get msg');
	},
	error : function(object, error) {
		console.log('error getting object');
		console.log(error);
	}
});