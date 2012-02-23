var sys = require( 'sys' );
var http = require( 'http' );

var server = http.createServer(
  function http_createServer( request, response ) {
      response.writeHead( 200, { 'content-type': 'text/plain' } );
      response.write( "Hello World!" );
      response.end();
    }
).listen(20005);

console.log("Server started.");
