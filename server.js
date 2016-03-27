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
var fieldObjects = {cars: []};

function Car(x,y,type) {
    return {x: x,y: y, type: type};
}

io.sockets.on('connection', function (socket) {
    users += 1;
    console.log('user '+users+' connected');
    socket.emit('username', {username: 'User'+users});
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('clicked', function(data) {
        //io.emit('update', {xPos: data.xPos, yPos: data.yPos});
    });
    socket.on('added', function(data) {
        if(data.type === "car") {
            fieldObjects.cars.append(Car(data.x, data.y, data.type));
        }
        var i;
        for(i = 0; i < fieldObjects.cars.length; i++) {
            var car = fieldObjects.cars[i];
            io.emit('object', {object: "car", type: "friendly", xPos: car.x, yPos: car.y});
        }
    });
              
});