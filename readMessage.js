/** READ MESSAGE DOCUMENTATION
 * Functions for read message pane.
 */


// Given a message id, display all the content of that message in the read message pane,
// including all the content of any replies to that message.
function displayMessage(message_id) {
  getMessage(message_id, msgHandler);
}

var readingMessage = null;
// Message handler for new backend. After all message data has been loaded, displays message.
function msgHandler(msg_object) {
  readingMessage = msg_object;
  var title = msg_object.get("title");
  var text = msg_object.get("text");
  var type = msg_object.get("type");
  var time = msg_object.getDay()
  var day = msg_object.getTime();
  var author = msg_object.get("author");
  var priority = msg_object.get("priority");
  var alert = msg_object.get("alert");
  var replies = msg_object.get("replies");
  var tags = msg_object.get("tags");

  console.log(title);
  console.log(text);
  console.log(type);
  console.log(time);
  console.log(day);
  console.log(author);
  console.log(priority);
  console.log(alert);
  console.log(replies);
  console.log(tags);

  // Display original message
  $('.originalMsgTitle').html(type + ": " + title);
  $('.originalMsgDetailsText').html(author + " at " + time + " on " + day);
  $('.originalMsgText').html(text);

  $('.captain').removeClass('hidden');
  $('.high_pri').removeClass('hidden');

  // Display/hide appropriate icons
  if(alert == NO_ALERT) {
    $('.captain').addClass('hidden');
  }
  if(priority == LOW_PRI) {
    $('.high_pri').addClass('hidden');
  }

  // Display tags
  $('.hashtags').empty();
  for (var j=0; j<tags.length; j++) {
    var tag = tags[j];
    var tagDiv = $(document.createElement('button'))
        .addClass('btn')
        .addClass('tag')
        .html("#"+tag);
    $('.hashtags').append(tagDiv);
  }

  // Display replies
  $('.replies').empty();
  console.log(replies.length);
  for (var i=0; i< replies.length; i++) {
    var reply = replies[i];

    // Create new div for each reply
    var replyDiv = $(document.createElement('div'))
        .addClass('well')
        .addClass('white')
        .addClass('reply');
    $('.replies').append(replyDiv);

    // Create new div for heading (title)
    var replyHeaderDiv = $(document.createElement('div'))
        .addClass('replyHeader')
        .html(reply.title);
    $(replyDiv).append(replyHeaderDiv);

    // Create new div for body
    var replyBodyDiv = $(document.createElement('div'))
        .addClass('replyBody');
    $(replyDiv).append(replyBodyDiv);

    // Create new div for body details (author, time, date, picture)
    var replyDetailsDiv = $(document.createElement('div'))
        .addClass('replyDetails');
    $(replyBodyDiv).append(replyDetailsDiv);

    // Add table for body details divs to appear side by side
    var replyTable = $(document.createElement('table'));
    var replyRow = $(document.createElement('tr'));
    $(replyTable).append(replyRow);
    var authorCell = $(document.createElement('td'));
    $(replyRow).append(authorCell);
    var textCell = $(document.createElement('td'));
    $(replyRow).append(textCell);
    $(replyDetailsDiv).append(replyTable);

    // Create new div for author picture
    var authorPicDiv = $(document.createElement('div'))
        .addClass('authorPic');
    var authorPicImg = $("<img class='authorPic', src='images/generic_avatar.jpg'>");
    $(authorPicDiv).append(authorPicImg);
    $(authorCell).append(authorPicDiv);

    // Create new div for body details text (author, time, date)
    var replyDetailsTextDiv = $(document.createElement('div'))
        .addClass('replyDetailsText')
        .html(reply.author + " at " + reply.getTime() + " on " + reply.getDay());
    $(textCell).append(replyDetailsTextDiv);

    // Create new div for body text (actual text of reply)
    var replyTextDiv = $(document.createElement('div'))
        .addClass('replyText')
        .addClass('offset1')
        .html(reply.text);
    $(replyBodyDiv).append(replyTextDiv);
  }
}