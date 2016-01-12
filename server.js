/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

// modules
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
        });

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
                col = !col;
                //console.log(data.username+' has clicked the canvas');
                if(col) {
                    io.emit('changeColor', {color: "#FF0000"});
                } else {
                    io.emit('changeColor', {color: "#00FF00"});
                }
        });
});