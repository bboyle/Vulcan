(function( console, require, module, __dirname ) {
	'use strict';


	var express = require( 'express' ),
		routes = require( './routes' ),

		app = module.exports = express.createServer()
	;

	// Configuration

	app.configure(function() {
		app.set( 'views', __dirname + '/views' );
		app.set( 'view engine', 'ejs' );
		app.use( express.bodyParser() );
		app.use( express.methodOverride() );
		app.use( app.router );
		app.use( express[ 'static' ]( __dirname + '/public' ));
	});

	app.configure( 'development', function() {
		app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
	});

	app.configure( 'production', function() {
		app.use( express.errorHandler() );
	});


	// Routes
	app.get( '/', routes.index );
	app.get( '/movie/list', routes.listMovies );
	app.get( '/movie/:movie/', routes.playMovie );
	app.get( '/movie/:movie/poster', routes.getMoviePoster );
	app.get( '/movie/:movie/data', routes.getMovieData );
	// app.post( '/movie/:movie/play', routes.playMovie );


	// start
	app.listen( 3000 );
	console.log( 'Express server listening on port %d in %s mode', app.address().port, app.settings.env );


// node globals (keep jslint happy)
}( console, require, module, __dirname ));
