function openReplyForm() {
	// Uncheck the radio buttons
	$(".btn-group .btn.active").each(function() {
		$("#" + this.id).removeClass("active");
	});

	$("select#selectTemplate").val("None Selected");

	var formTitleBar = "Reply<div class='floatRight btn'><i class='icon-chevron-down' id='chevronDown'></i></div>";
	$("#formTitle").html(formTitleBar);

	var title = $(".originalMsgTitle").html();
	title = title.replace("Issue: ", "");
	title = title.replace("Note: ", "");
	$("#textinput").val("Re: " + title);

	$("#textarea").val("");

	// Grabs the tags in the original message to automatically fill in the reply
	var tagObj = $("div.tag");
	var tags = Array();
	for (var i = 0; i < tagObj.length; i++) {
		tags.push($(tagObj[i]).html());
	}

	// Currently separates tags by strings but need to separate into objects
	var displayTags = "";
	for (var i = 0; i < tags.length; i++) {
		displayTags += tags[i] + ",";
	}
	$("#prependedtext").val(displayTags);

	$("#submitBtn").html("Submit Reply");
}

function submitReply(replyID) {
	var title = $("#textinput").val();
	var text = $("#textarea").val();
	var tags = $("#prependedtext").val();

	// need to grab three side button data

	tags = tags.split(",");
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].replace(/\s/g, '');
	}

	author = 'Julie';
	date = new Date('19 Mar, 2013 13:07:00');
	var reply = new Reply(title, text, author, tags, date);
	console.log(msg);
	db.getMessage(replyID).addReply(reply);

	reset();
	console.log("GOT HERE NIG");
}