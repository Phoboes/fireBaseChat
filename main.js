// My Database
var fbData = new Firebase('https://wdi14chatdemo.firebaseio.com/messages');

// Randomly generated text color array
var colorArray = ["Red", "blue", "green", "orange", "cyan", "purple", "pink", "goldenrod", "grey"];
// Pick a random color on page load
var color = colorArray[Math.round(Math.random() * (1, colorArray.length-1) )];

$(document).ready(function(){

 // If enter key is pressed in textInput
  $('.textInput').on("keypress", function(e){
    if( e.keyCode === 13 && $('.textInput').val() !== '' ){
      // Disable default behavior of the enter key
      e.preventDefault();
      // Take the text values from text & name inputs
      var name = $('.nameInput').val() || "Anonymous";
      var text = $('.textInput').val();

      // Put them in an object and send them to a server.

      fbData.push({ name: name, text: text, color: color });

      // Empty the text box after the message has been sent to the database.
      $('.textInput').val('');
    };
  });
}); // end doc

// Every time data is added to the server, it sends us back a snapshot.
fbData.on("child_added", function( snapshot ){

  // snapshot.val() breaks it back down to our basic object.
  var message = snapshot.val();
  // Call our showText function taking the information out of our snapshot.
  showText( message.name, message.text, message.color );
});

var showText = function( name, text, color ){
  // Generates our html and concatenates our variables in to the string.
  $('<div class="singleChatLine"><strong>' + name + '</strong>: ' + text + '</div>').appendTo('.messagesDiv').css( "color", color );
  // Scrolls to the last appended message.
  $('.messagesDiv')[0].strollTop = $('.messagesDiv')[0].scrollHeight
}
