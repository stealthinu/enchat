name = prompt("Input name:");

var port = 20005;
var socket = io.connect("/", { port: port });

socket.on("connect", function() {
  socket.emit("name", name);
});

socket.on("name", function(text) {
  $("#message").append("login:" + text + "<br>");
});

socket.on("message", function(text) {
  $("#message").append(text + "<br>");
});

$("#message_button").click(function() {
  var message = $("#message_text").val();
  socket.emit("message", message);
});
