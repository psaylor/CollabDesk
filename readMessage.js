/** READ MESSAGE DOCUMENTATION
 * Functions for read message pane.
 */


// Given a message id, display all the content of that message in the read message pane,
// including all the content of any replies to that message.
var displayMessage = function(message_id) {
	var msg = db.getMessage(message_id);

	// Display original message
	$('.originalMsgHeader').html(msg.title);
 	$('.originalMsgBody').html(msg.text);

 	var replies = msg.replies;
 	for (var i=0; i< replies.length; i++) {
 		var reply = replies[i];

 		// Display heading for reply
 		var replyHeaderDiv = $(document.createElement('div'))
  			.addClass('replyHeader')
  			.html('Re: ' + msg.title);
  		$('.replies').append(replyHeaderDiv);

  		// Display text for reply
  		var replyBodyDiv = $(document.createElement('div'))
  			.addClass('replyBody')
  			.html(reply.text);
  		$('.replies').append(replyBodyDiv);
 	}

 	// Format hashtags as a (somewhat readable) string
 	var tags = "";
 	for (var j=0; j<msg.tags.length; j++) {
 		tags += msg.tags[j];
 		tags += " ";
 	}
 	$('.hashtags').html(tags);

};