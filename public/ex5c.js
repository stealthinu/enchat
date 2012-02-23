var port = 20005;
var socket = io.connect("/", { port: port });

socket.on("connect", function() {
  socket.emit("message", "Hello server!");
});

socket.on("message", function(text) {
  $("#message").html(text);
});
