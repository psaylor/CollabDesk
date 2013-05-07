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

function submit() {
	console.log('submit called');
	var title = $("#textinput").val();
	var text = $("#textarea").val();
	var tags = $("#prependedtext").val();

	tags = tags.split(",");
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].replace(/\s/g, '');
	}

	var author = String(cdUser);

	// Determine which buttons are pressed
	var noteIssue = "ni-btn";
	var hiLowPriority = "pri-btn";
	var alertCpt = "alert-btn";
	var activeBtns = {noteIssue : NOTE, hiLowPriority : LOW_PRI, alertCpt : NO_ALERT } ;

	$(".btn-group .btn.active").each(function() {
		switch(this.id) {
			case noteIssue:
				activeBtns[noteIssue] = ISSUE;
				break;
			case hiLowPriority:
				activeBtns[hiLowPriority] = HIGH_PRI;
				break;
			case alertCpt:
				activeBtns[alertCpt] = ALERT;
				break;
		}
	});

	var type = activeBtns[noteIssue];
	var priority = activeBtns[priority];
	var alert = activeBtns[alert];
	var date = new Date('17 Mar, 2013 15:15:00');

	//var msg = new Message(title, text, author, tags, type, priority, alert, date);
	Message.create(title,text, author, tags, type, priority, alert, date);

	reset();
}
