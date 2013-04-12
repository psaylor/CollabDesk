function reset() {
	$("#textinput").val("");
	$("#textarea").val("");
	$("#prependedtext").val("");
	// reset the template to the default value
}

function submit() {
	var title = $("#textinput").val();
	console.log("reached here");
	var text = $("#textarea").val();
	var tags = $("#prependedtext").val();

	// need to grab three side button data

	tags = tags.split(",");
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].replace(/\s/g, '');
	}

	console.log("reached here");

	var author = 'Kayla';
	var type = Message.NOTE;
	var priority = Message.HIGH_PRI;
	var alert = false;
	var date = new Date('17 Mar, 2013 15:15:00');

	var msg = new Message(title, text, author, tags, type, priority, alert, date);
	db.addMessage(msg);

	reset();
}

