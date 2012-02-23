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
  var player = {
    login_name : "",
    x : 0,
    y : 0,
    direction : 0,
    message : "…", // フキダシの中身
  };

  console.log("connect new client.");
  socket.emit("message", "Hello client!"); // 繋がったらとりあえず送る
  socket.broadcast.emit("message", "new client login!"); // 全員に知らせる

  // 名前を送ってきた時の処理
  var login_name = "unknown";
  socket.on("name", function(text) {
    console.log("name: " + text);
    player.login_name = text;
    socket.broadcast.emit("name", player.login_name);
  });
  
  // 移動処理
  socket.on("position", function(pos) {
    // console.log("position:" + player.login_name + " " + text);
    player.x = pos.x;
    player.y = pos.y;
    player.direction = pos.direction;
    socket.broadcast.emit("position:" + player.login_name, pos);
  });

  // こちらがメッセージを受けた時の処理
  socket.on("message", function(text) {
    console.log("message:" + player.login_name + " " + text);
    player.message = text;
    socket.broadcast.emit("message:" + player.login_name, text);
  });

  // 切断した時の処理
  socket.on("disconnect", function() {
    console.log("disconnect:" + player.login_name);
    socket.broadcast.emit("disconnect:" + player.login_name);
  });
});
