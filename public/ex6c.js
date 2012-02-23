var port = 20005;
var socket = io.connect("/", { port: port });

socket.on("connect", function() {
  socket.emit("message", "Hello server!");
});

socket.on("message", function(text) {
  $("#message").html(text);
});

$("#message_button").click(function() {
  var message = $("#message_text").val();
  socket.emit("message", message);
});
