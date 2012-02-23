var app = require( 'express' ).createServer();

app.get( '/', function( req, res ) {
  res.send( 'Hello World!' );
});
app.listen(20005);

console.log("Server started.");
