(function( console, exports, require ) {
	'use strict';

	// TODO config for movies path and VLC location?
	var moviesPath = '/Volumes/Scavenger/media/dvd',
		clivlc = '/Applications/VLC.app/Contents/MacOS/VLC',
		path = require( 'path' ),
		fs = require( 'fs' ),
		ejs = require( 'ejs' ),

		// ejs 'layouts' (expressjs no longer supports layouts)
		ejsLayout = function( res, view, data ) {
			fs.readFile( 'views/' + view + '.ejs', 'UTF-8', function( err, view ) {
				if ( err ) {
					Error.call( this, err );
				} else {
					data.body = ejs.render( view, data );
					res.render( 'layout',  data );
				}
			});
		}
	;


	// OSX or windows?
	fs.exists( clivlc, function( exists ) {
		if ( ! exists ) {
			// TODO different vlc locations: program files (without 'x86' first)
			// assume windows
			clivlc = 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe';
		}
	});

	// test environment
	fs.exists( moviesPath, function( exists ) {
		if ( ! exists ) {
			// assume windows
			moviesPath = path.resolve( '../fixture/movies' );
			console.log( moviesPath );
		}
	});


	// use for home page
	exports.index = function( req, res ) {
		ejsLayout( res, 'index', {
			title: 'Vulcan media centre'
		});
	};


	// list all movies in folder
	exports.listMovies = function( req, res ) {
		var movies = {},
			i,
			dataFile;

		fs.readdir( moviesPath, function( err, files ) {
			// TODO handle 'no files'
			files = files.filter(function( filename ) {
				// ignore . files
				return ! /^\./.test( filename );
			});

			for ( i = 0; i < files.length; i++ ) {
				// add moviee to list
				movies[ files[ i ]] = { title: files[ i ] };

				// read metadata for movie
				dataFile = path.join( moviesPath, files[ i ], 'metadata.json' );
				if ( fs.existsSync( dataFile )) {
					try {
						movies[ files[ i ]] = JSON.parse( fs.readFileSync( dataFile )).movie;
					} catch ( x ) {
						console.error( dataFile, x );
					}
				}
			}

			ejsLayout( res, 'movie/list', {
				title: 'Movies',
				files: files,
				movies: movies
			});
		});
	};


	// get details for a movie
	exports.getMovie = function( req, res ) {
		var movie = req.params.movie,
			data = { title : movie },
			dataFile = path.join( moviesPath, movie, 'metadata.json' );

		fs.readFile( dataFile, function( err, jsonData ) {
			if ( err ) {
				data.dateCreated = '';
			} else {
				// TODO should merge in with movie title read from file path
				data = JSON.parse( jsonData ).movie;
			}
			ejsLayout( res, 'movie/get', {
				title: movie,
				movie: data
			});
		});
	};


	// get details for a movie
	exports.getMovieData = function( req, res ) {
		var movie = req.params.movie,
			data = { title : movie },
			dataFile = path.join( moviesPath, movie, 'metadata.json' );

		fs.readFile( dataFile, function( err, jsonData ) {
			if ( err ) {
				data.dateCreated = '';
			} else {
				// TODO should merge in with movie title read from file path
				data = JSON.parse( jsonData ).movie;
			}
			ejsLayout( res, 'movie/metadata', {
				title: movie,
				movie: data
			});
		});
	};


	// save details for a movie
	exports.postMovieData = function( req, res ) {
		var movie = String( req.params.movie ),
			dataFile = path.join( moviesPath, movie, 'metadata.json' );

		// write to metadata.json file
		// console.log( req.body );
		fs.writeFile( dataFile, JSON.stringify({ movie: req.body }, null, 4 ) );

		// redirect to metadata page
		// could use 'back' but relies on referrer
		res.redirect( '/movie/' + movie + '/data' );
		
	};


	// get poster image for a movie
	exports.getMoviePoster = function( req, res ) {
		var movie = req.params.movie;

		fs.readdir( path.join( moviesPath, movie ), function( err, files ) {
			var i = 0;

			// look for first image
			while ( i < files.length && ! /\.jpg$/.test( files[ i ] )) {
				i++;
			}

			if ( i < files.length ) {
				res.sendfile( path.join( moviesPath, movie, files[ i ] ));

			} else {
				// no content!
				res.send();
			}

		});
	};


	// play a movie
	exports.playMovie = function( req, res ) {
		var movie = String( req.params.movie ),
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

		// redirect to movie page
		// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.4
		res.writeHead( 303, {
  			'Location': '/movie/' + req.params.movie + '/'
		});
		res.end();

	};


// node globals (keep jslint happy)
}( console, exports, require ));
