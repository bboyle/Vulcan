(function( console, exports, require ) {
	'use strict';

	var moviesPath = '/Volumes/Scavenger/media/dvd',
		clivlc = '/Applications/VLC.app/Contents/MacOS/VLC',
		path = require( 'path' ),
		fs = require( 'fs' );

	// OSX or windows?
	path.exists( clivlc, function( exists ) {
		if ( ! exists ) {
			// assume windows
			clivlc = 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe';
		}
	});

	// test environment
	path.exists( moviesPath, function( exists ) {
		if ( ! exists ) {
			// assume windows
			moviesPath = 'f:/dvd/Movies';
		}
	});


	// use for home page
	exports.index = function( req, res ) {
		res.render( 'index', { title: 'Vulcan media centre' });
	};


	// list all movies in folder
	exports.listMovies = function( req, res ) {
		var movies = {},
			i,
			dataFile;

		fs.readdir( moviesPath, function( err, files ) {
			files = files.filter(function( filename ) {
				// ignore . files
				return ! /^\./.test( filename );
			});

			for ( i = 0; i < files.length; i++ ) {
				// add moviee to list
				movies[ files[ i ]] = { title: files[ i ] };

				// read metadata for movie
				dataFile = path.join( moviesPath, files[ i ], 'metadata.json' );
				if ( path.existsSync( dataFile )) {
					movies[ files[ i ]] = JSON.parse( fs.readFileSync( dataFile )).movie;
				}
			}

			console.log( movies );
			res.render( 'movie/list', {
				title: 'Movies',
				files: files,
				movies: movies
			});
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
			join = path.join;

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
			media = path.join( moviesPath, movie, 'VIDEO_TS' ),
			vlcArgs = [
				'--fullscreen', // taskbar still visible, W7 bug only?
				'--sub-language=en,any',
				'--no-video-title-show',
				//'--high-priority', // high performance = priority VLC thread
				// '--rt-offset=2',
				'--play-and-exit', // quit when done
				'file:///' + media
			];

		console.log( clivlc, vlcArgs.join( ' ' ));

		// fire up VLC!
		// require( 'child_process' ).spawn( 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe', [
		require( 'child_process' ).spawn( clivlc, vlcArgs );
		// VLC OPTIONS
		// full screen
		// subtitles on (english)
		// should these be specified in vulcan, or should the user configure VLC?

		// log
/*
		vlc.stdout.on( 'data', function ( data ) {
			console.log( 'stdout: ' + data );
		});
		vlc.stderr.on( 'data', function ( data ) {
			console.log( 'stderr: ' + data );
		});
*/		

		// show "now playing" page
		res.render( 'movie/play', { title: 'Playing ' + movie });

	};


// node globals (keep jslint happy)
}( console, exports, require ));
