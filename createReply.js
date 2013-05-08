function resetReply() {
	$(".alert").slideUp();

	$("#replyTitleInput").val("");
	$("#replyMessageArea").val("");
	$("#replyTags").val("");
}

function submitReply() {
	var title = $("#replyTitleInput").val();
	var text = $("#replyMessageArea").val();
	var tags = $("#replyTags").val();

	tags = tags.split(",");
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].replace(/\s/g, '');
	}

	var author = getUsername();
	var date = new Date();

	//var msg = new Message(title, text, author, tags, type, priority, alert, date);
	Reply.create(title, author, tags, date, text);

	resetReply();
}
