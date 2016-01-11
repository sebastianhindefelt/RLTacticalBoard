/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

// modules
var static = require( 'node-static' ),
port = 8080,
http = require( 'http' ),
io = require('socket.io')(http);

// config
var file = new static.Server( './', {
                             cache: 3600,
                             gzip: true
 
                             } );
io.on('connection', function(socket) {
      console.log('a user connected');
      });

// serve
http.createServer( function ( request, response ) {
                  request.addListener( 'end', function () {
                                      file.serve( request, response );
                                      } ).resume();
                  } ).listen( port );

