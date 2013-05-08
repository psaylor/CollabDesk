/** READ MESSAGE DOCUMENTATION
 * Functions for read message pane.
 */


// Given a message id, display all the content of that message in the read message pane,
// including all the content of any replies to that message.
function displayMessage(message_id) {
  console.log('asked to display message ' + message_id);
  getMessage(message_id, msgHandler);
}

var readingMessage = null;
// Message handler for new backend. After all message data has been loaded, displays message.
function msgHandler(msg_object) {
  readingMessage = msg_object;
  var title = msg_object.get("title");
  var text = msg_object.get("text");
  var type = msg_object.get("type");
  var time = msg_object.getTime()
  var day = msg_object.getDay();
  var author = msg_object.get("author");
  var priority = msg_object.get("priority");
  var alert = msg_object.get("alert");
  var replies = msg_object.get("replies");
  var tags = msg_object.get("tags");

  // Display original message
  $('#messageTitle').html(type + ": " + title);
  $('#messageAuthor').html(author);
  $('div.authorImg img').attr('src', USER_IMAGES[author]);
  $('#messageTime').html(time + ' on ' + day);
  $('#messageText').html(text);

  $('#captainIcon').removeClass('hidden');
  $('#priorityIcon').removeClass('hidden');

  // Display/hide appropriate icons
  if(alert == NO_ALERT) {
    $('#captainIcon').addClass('hidden');
  }
  if(priority == LOW_PRI) {
    $('#priorityIcon').addClass('hidden');
  }

  // Display tags
  $('#messageTags').empty();
  for (var j=0; j<tags.length; j++) {
    var tag = tags[j];
    var tagDiv = $(document.createElement('button'))
        .addClass('btn-info')
        .addClass('btn-mini')
        .addClass('tag')
        .html("#"+tag);
    $('#messageTags').append(tagDiv);
  }

  // Display replies 
  getRepliesForMessage(msg_object,replyHandler);

}

// Reply handler for new backend. After all replies have been loaded, displays replies.
function replyHandler(replies) {

  $('.replies').empty();
  for (var i=0; i< replies.length; i++) {
    var reply = replies[i];
    var title = reply.get("title");
    var text = reply.get("text");
    var time = reply.getTime();
    var day = reply.getDay();
    var author = reply.get("author");
    var tags = reply.get("tags");


    // Create new div for each reply
    var replyDiv = $(document.createElement('div'))
        .addClass('well')
        .addClass('white');
    $('.replies').append(replyDiv);

    // Create new row for reply header
    var replyHeader = $(document.createElement('div'))
        .addClass('replyHeader')
        .addClass('title')
        .addClass('row')
        .html(title);
    $(replyDiv).append(replyHeader);

    // Create new row for reply second header
    var replySecondHeader = $(document.createElement('div'))
        .addClass('replySecondHeader')
        .addClass('row');
    $(replyDiv).append(replySecondHeader);

    // Create new row for reply text
    var replyText = $(document.createElement('div'))
        .addClass('replyText')
        .addClass('row')
        .html(text);
    $(replyDiv).append(replyText);

    // Add content to reply second header
    var authorImg = $("<img src='" + USER_IMAGES[author] + " '>");
    var authorImgDiv = $(document.createElement('div'))
        .addClass('authorImg');
    $(authorImgDiv).append(authorImg);
    $(replySecondHeader).append(authorImgDiv);

    var replyAuthor = $(document.createElement('div'))
        .addClass('author')
        .html(author);
    $(replySecondHeader).append(replyAuthor);

    var replyTime = $(document.createElement('div'))
        .addClass('time')
        .html(time + ' on ' + day);
    $(replySecondHeader).append(replyTime);

    var clockIcon = $("<i class='icon-time icon-large'></i>");
    var clockIconDiv = $(document.createElement('div'))
        .addClass('clockIcon');
    $(clockIconDiv).append(clockIcon);
    $(replySecondHeader).append(clockIconDiv);
  }
}
