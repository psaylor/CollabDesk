/*
	preloads some messages into the database
	also a good example of how to create new messages and use the database

	recall the specs:
	var Message = function(title, text, author, tags, type, priority, alert, date)
	var Reply = function(text, author, tags, date)
*/

// var db = new Database();

// message 1
	var title = 'Visa card found';
	var text = 'A visa card was found on one of the tables at dining today. It does not have a name on it.';
	var author = 'Adele';
	var tags = ['lost/found'];
	var type = Message.NOTE;
	var priority = Message.HIGH_PRI;
	var alert = false;
	var date = new Date('17 Mar, 2013 15:15:00');

	var msg = new Message.create(title, text, author, tags, type, priority, alert, date);
	// db.addMessage(msg);

// message 2
	title = 'Package for Jane';
	text = "A package came in for Jane, but she doesn't live here, and I can't find any record of her. It's in bin 6 for now.";
	author = "Beyonce";
	tags = ['package'];
	type = Message.ISSUE;
	priority = Message.LOW_PRI;
	alert = true;
	var date = new Date('7 May, 2013 10:28:00');

	var msg = new Message.create(title, text, author, tags, type, priority, alert, date);
	// db.addMessage(msg);

// message 3
	title = 'Red Key';
	text = 'Someone came down to get her red key because the room key doesnt work. Room 715';
	author = 'Macklemore';
	tags = ['red key', 'room key'];
	type = Message.ISSUE;
	priority = Message.HIGH_PRI;
	alert = true;
	var date = new Date('18 Mar, 2013 19:15:00');

	var msg = new Message.create(title, text, author, tags, type, priority, alert, date);
	// db.addMessage(msg);

// message 4, with reply
	title = 'Mailbox combo';
	text = 'Mailbox 315 combo does not work. Can Jacinto take a look at it?';
	author = 'Timberlake';
	tags = ['mailboxes'];
	type = Message.ISSUE;
	priority = Message.HIGH_PRI;
	alert = false;
	var date = new Date('19 Mar, 2013 12:01:00');

	var msg = new Message.create(title, text, author, tags, type, priority, alert, date);

	title = 'Same problem';
	text = 'Mailbox 715 combo also does not work';
	author = 'Macklemore';
	tags = [];
	date = new Date('19 Mar, 2013 13:07:00');
	var reply = new Reply.create(title, text, author, tags, date, msg);
	// msg.addReply(reply);

	// title = 'Fixed';
	// text = 'Jacinto came by and fixed it. All better =]';
	// author = 'Beyonce';
	// tags = ['fixed'];
	// date = new Date('19 Mar, 2013 15:31:00');
	// var reply = new Reply(title, text, author, tags, date);
	// msg.addReply(reply);
	// db.addMessage(msg);

// message 5
	title = 'West Elevator down';
	text = 'Campus facilities came by to look at the west tower elevator. He said it was a safety danger and that he has shut off the elevator for tonight. He will return tomorrow morning. I have put signs up on each floor.';
	author = "Adele";
	tags = ['elevator', 'west tower'];
	type = Message.NOTE;
	priority = Message.LOW_PRI;
	alert = true;
	var date = new Date('22 Mar, 2013 15:30:00');
	var msg = new Message.create(title, text, author, tags, type, priority, alert, date);
	// db.addMessage(msg);

// // message 6
// 	title = 'East Elevator down';
// 	text = 'Campus facilities came by to look at the eat tower elevator. He said it was a safety danger and that he has shut off the elevator for tonight. He will return tomorrow morning. I have put signs up on each floor.';
// 	author = "Bobby";
// 	tags = ['elevator', 'east tower'];
// 	type = Message.NOTE;
// 	priority = Message.LOW_PRI;
// 	alert = true;
// 	var date = new Date('22 Mar, 2013 15:30:00');
// 	var msg = new Message(title, text, author, tags, type, priority, alert, date);
// 	db.addMessage(msg);
	
// // message 7
// 	title = 'All Elevators down';
// 	text = 'Campus facilities came by to look at the elevators. He said it was a safety danger and that he has shut off the elevator for tonight. He will return tomorrow morning. I have put signs up on each floor.';
// 	author = "Bobby";
// 	tags = ['elevator', 'west tower', 'east tower'];
// 	type = Message.NOTE;
// 	priority = Message.LOW_PRI;
// 	alert = true;
// 	var date = new Date('22 Mar, 2013 15:30:00');
// 	var msg = new Message(title, text, author, tags, type, priority, alert, date);
// 	db.addMessage(msg);

// db.markRead(0);
// db.markRead(1);
// db.markRead(2);
// db.markRead(3);