var port = 20005;

// websocketとexpressの読み込み
var express = require("express");
var app = express.createServer();
var io = require("socket.io").listen(app);
io.set("log level", 1);

// expressの設定と起動
app.configure(function() {
  app.use(express.static(__dirname + "/public"));
});
app.listen(port);
console.log("Server started.");

// 通信プロトコル
io.sockets.on("connection", function(socket) {
  console.log("connect new client.");
  socket.emit("message", "Hello client!"); // 繋がったらとりあえず送る
  socket.broadcast.emit("message", "new client login!"); // 全員に知らせる

  // 名前を送ってきた時の処理
  var login_name = "unknown";
  socket.on("name", function(text) {
    console.log("name: " + text);
    login_name = text;
    socket.broadcast.emit("name", login_name);
  });
  
  // こちらがメッセージを受けた時の処理
  socket.on("message", function(text) {
    console.log("message:" + text);
    socket.broadcast.emit("message", login_name + ":" + text);
  });

  // 切断した時の処理
  socket.on("disconnect", function() {
    console.log("disconnect.");
    socket.broadcast.emit("message", "client logout.");
  });
});
