function openReplyForm() {
	console.log("REACHED HERE");

	// Grab the message information and fill in the fields
	var title = $("#textinput").val("Same Problem");
	var text = $("#textarea").val();
	var tags = $("#prependedtext").val();
	
	title = 'Same problem';
	text = 'Mailbox 715 combo also does not work';
	author = 'Julie';
	tags = [];
	date = new Date('19 Mar, 2013 13:07:00');
	var reply = new Reply(title, text, author, tags, date);
	msg.addReply(reply);
}
