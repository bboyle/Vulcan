(function() {
	'use strict';


	var port = 3000,
		express = require( 'express' ),
		routes = require( './routes' ),

		app = module.exports = express()
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
		app.use( express.errorHandler({
			dumpExceptions : true,
			showStack : true
		} ));
	});

	app.configure( 'production', function() {
		app.use( express.errorHandler() );
	});


	// Routes
	app.get( '/', routes.index );

	// movies
	app.get( '/movie/list', routes.listMovies );
	app.get( '/movie/:movie/', routes.getMovie );
	app.get( '/movie/:movie/poster', routes.getMoviePoster );
	// movie actions
	app.post( '/movie/:movie/play', routes.playMovie );
	// movie data
	app.get( '/movie/:movie/data', routes.getMovieData );
	app.post( '/movie/:movie/data', routes.postMovieData );

	// TV shows
	app.get( '/tv/list', routes.listTv );
	// app.get( '/tv/:tv/', routes.getTv );
	// app.get( '/tv/:tv/poster', routes.getTvPoster );
	// tv actions
	// app.post( '/tv/:tv/play', routes.playTv );
	// tv data
	// app.get( '/tv/:tv/data', routes.getTvData );
	// app.post( '/tv/:tv/data', routes.postTvData );

	// start
	app.listen( port );
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );


}());
