/** READ MESSAGE DOCUMENTATION
 * Functions for read message pane.
 */


// Given a message id, display all the content of that message in the read message pane,
// including all the content of any replies to that message.
var displayMessage = function(message_id) {
	var msg = db.getMessage(message_id);

	// Display original message
	$('.originalMsgTitle').html(msg.type + ": " + msg.title);
  $('.originalMsgDetailsText').html(msg.author + " at " + msg.getTime() + " on " + msg.getDay());
  $('.originalMsgText').html(msg.text);

  // Display/hide appropriate icons
  if(msg.alert == Message.NO_ALERT) {
    $('.captain').addClass('hidden');
  }
  if(msg.priority == Message.LOW_PRI) {
    $('.high_pri').addClass('hidden');
  }

  // Display replies
 	var replies = msg.replies;
 	for (var i=0; i< replies.length; i++) {
 	  var reply = replies[i];

    // Create new div for each reply
    var replyDiv = $(document.createElement('div'))
        .addClass('reply controls-row');
    $('.replies').append(replyDiv);

 		// Create new div for heading (title)
 		var replyHeaderDiv = $(document.createElement('h5'))
  			.addClass('replyHeader')
  			.html('Re: ' + msg.title);
  	$(replyDiv).append(replyHeaderDiv);

  	// Create new div for body
  	var replyBodyDiv = $(document.createElement('div'))
  			.addClass('replyBody controls-row');
  	$(replyDiv).append(replyBodyDiv);

    // Create new div for body details (author, time, date, picture)
    var replyDetailsDiv = $(document.createElement('div'))
        .addClass('replyDetails');
    $(replyBodyDiv).append(replyDetailsDiv);

    // Create new div for author picture
    var authorPicDiv = $(document.createElement('div'))
        .addClass('authorPic');
    var authorPicImg = $("<img class='authorPic floatLeftNoPadding', src='images/generic_avatar.jpg'>");
    $(authorPicDiv).append(authorPicImg);
    $(replyDetailsDiv).append(authorPicDiv);

    // Create new div for body details text (author, time, date)
    var replyDetailsTextDiv = $(document.createElement('div'))
        .addClass('replyDetailsText floatLeft')
        .html(reply.author + " at " + reply.getTime() + " on " + reply.getDay());
    $(replyDetailsDiv).append(replyDetailsTextDiv);

    // Create new div for body text (actual text of reply)
    var replyTextDiv = $(document.createElement('div'))
        .addClass('replyText span12 offset1')
        .html(reply.text);
    $(replyBodyDiv).append(replyTextDiv);
 	}

 	// Display tags
  for (var j=0; j<msg.tags.length; j++) {
 		var tag = msg.tags[j];
    var tagDiv = $(document.createElement('div'))
        .addClass('floatLeft tag')
        .html("#"+tag);
      $('.hashtags').append(tagDiv);
 	}
  var clearDiv = $(document.createElement('div'))
        .addClass('clear');
  $('.hashtags').append(clearDiv);

};