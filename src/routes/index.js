(function( exports, require ) {
	'use strict';


	// use for home page
	exports.index = function( req, res ) {
		res.render( 'index', { title: 'Express' });
	};


	// list all movies in folder
	exports.listMovies = function( req, res ) {
		var fs = require( 'fs' );

		fs.readdir( 'f:/dvd/Movies', function( err, files ) {
			res.render( 'movie/list', { title: 'Movies', files: files });
		});
	};


	// get details for a movie
	exports.getMovie = function( req, res ) {
		var title = req.params.title;
		res.render( 'movie/get', { title: title });
	};


	// get poster image for a movie
	exports.getMoviePoster = function( req, res ) {
		// var title = req.params.title;
		res.sendfile( 'f:/dvd/Movies/Dirty Dancing/dirty_dancing.jpg' )
	};


// node globals (keep jslint happy)
}( exports, require ));
