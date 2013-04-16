/** READ MESSAGE DOCUMENTATION
 * Functions for read message pane.
 */


// Given a message id, display all the content of that message in the read message pane,
// including all the content of any replies to that message.
var displayMessage = function(message_id) {
	var msg = db.getMessage(message_id);

	// Display original message
	$('.originalMsgTitle').html(msg.type + ": " + msg.title);
 	$('.originalMsgBody').html(msg.text);

  // Display/hide appropriate icons
  if(msg.alert == Message.NO_ALERT) {
    $('.captain').addClass('hidden');
  }
  if(msg.priority == Message.LOW_PRI) {
    $('.high_pri').addClass('hidden');
  }

 	var replies = msg.replies;
  var reply;
  var replyDiv;
  var replyHeaderDiv;
  var replyBodyDiv;
 	for (var i=0; i< replies.length; i++) {
 	  reply = replies[i];

    // Create new div for each reply
    replyDiv = $(document.createElement('div'))
        .addClass('reply')
        .addClass('controls-row');

 		// Display heading for reply
 		replyHeaderDiv = $(document.createElement('h5'))
  			.addClass('replyHeader')
  			.html('Re: ' + msg.title);
  	$(replyDiv).append(replyHeaderDiv);

  	// Display text for reply
  	replyBodyDiv = $(document.createElement('div'))
  			.addClass('replyBody')
        .addClass('span12')
  			.html(reply.text);
  	$(replyDiv).append(replyBodyDiv);

    $('.replies').append(replyDiv);
 	}

 	// Display tags
  var tag;
  var tagDiv;
 	for (var j=0; j<msg.tags.length; j++) {
 		tag = msg.tags[j];
    tagDiv = $(document.createElement('div'))
        .addClass('floatLeft')
        .addClass('tag')
        .html("#"+tag);
      $('.hashtags').append(tagDiv);
 	}
  var clearDiv = $(document.createElement('div'))
        .addClass('clear');
  $('.hashtags').append(clearDiv);

};