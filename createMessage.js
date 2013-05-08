function reset() {
	console.log('reset called');
	$(".alert").slideUp();

	$("#textinput").val("");
	$("#textarea").val("");
	$("#prependedtext").val("");
	// reset the template to the default value

	$("select#selectTemplate").val("None Selected");

	// Uncheck the radio buttons
	$(".btn-group .btn.active").each(function() {
		$("#" + this.id).removeClass("active");
	});

	$('#ni-note').removeClass('hide');
	$('#ni-issue').addClass('hide');
}

var activeBtns = null;
function submit() {
	console.log('submit called');
	var title = $("#textinput").val();
	var text = $("#textarea").val();
	var tags = $("#prependedtext").val();

	tags = tags.split(",");
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].replace(/\s/g, '');
	}

	var author = getUsername();

	// Determine which buttons are pressed
	var noteIssue = "ni-btn";
	var hiLowPriority = "pri-btn";
	var alertCpt = "alert-btn";

	var type = NOTE;
	var priority = LOW_PRI;
	var alert = NO_ALERT;

	$(".btn-group .btn.active").each(function() {
		switch(this.id) {
			case noteIssue:
				type = ISSUE;
				break;
			case hiLowPriority:
				priority = HIGH_PRI;
				break;
			case alertCpt:
				alert = ALERT;
				break;
		}
	});

	var date = new Date();

	Message.create(title,text, author, tags, type, priority, alert, date);

	reset();
}
