/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

// modules
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.use(express.static(__dirname + '/public'));

//app.get('/', function (req, res) {
//        res.sendFile(__dirname + '/index.html');
//        });

var col = true;
var users = 0;
io.sockets.on('connection', function (socket) {
      users += 1;
      console.log('user '+users+' connected');
      socket.emit('username', {username: 'User'+users});
      socket.emit('changeColor', {color: "#FF0000"});
      socket.on('disconnect', function() {
                console.log('user disconnected');
      });
      socket.on('clicked', function(data) {
            console.log(data.username+' clicked the canvas');
            io.emit('update', {xPos: data.xPos, yPos: data.yPos});
      });
});