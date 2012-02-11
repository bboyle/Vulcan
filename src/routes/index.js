(function( console, exports, require ) {
	'use strict';

	var moviesPath = 'f:/dvd/Movies';


	// use for home page
	exports.index = function( req, res ) {
		res.render( 'index', { title: 'Vulcan (VLC + Node)' });
	};


	// list all movies in folder
	exports.listMovies = function( req, res ) {
		require( 'fs' ).readdir( moviesPath, function( err, files ) {
			res.render( 'movie/list', { title: 'Movies', files: files });
		});
	};


	// get details for a movie
	exports.getMovie = function( req, res ) {
		var movie = req.params.movie;
		res.render( 'movie/get', { title: movie });
	};


	// get poster image for a movie
	exports.getMoviePoster = function( req, res ) {
		var movie = req.params.movie,
			join = require( 'path' ).join;

		require( 'fs' ).readdir( join( moviesPath, movie ), function( err, files ) {
			var i = 0;

			// look for first image
			while ( i < files.length && ! /\.jpg$/.test( files[ i ] )) {
				i++;
			}

			if ( i < files.length ) {
				res.sendfile( join( moviesPath, movie, files[ i ] ));

			} else {
				// no content!
				res.send();
			}

		});
	};


	// play a movie
	exports.playMovie = function( req, res ) {
		var movie = req.params.movie,
			media = require( 'path' ).join( moviesPath, movie, 'VIDEO_TS' );

		console.log( 'vlc', media );

		// fire up VLC!
		require( 'child_process' ).spawn( 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe', [
			'--fullscreen', // taskbar still visible, W7 bug only?
			'--sub-language=en',
			'--no-video-title-show',
			'--high-priority', // high performance = priority VLC thread
			'--play-and-exit', // quit when done
			'file:///' + media
		]);
		// VLC OPTIONS
		// full screen
		// subtitles on (english)
		// should these be specified in vulcan, or should the user configure VLC?

		// show "now playing" page
		res.render( 'movie/play', { title: 'Playing ' + movie });

	};


// node globals (keep jslint happy)
}( console, exports, require ));
