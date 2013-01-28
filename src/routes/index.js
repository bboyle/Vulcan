(function( console, exports, require ) {
	'use strict';

	var moviesPath,
		tvPath,
		clivlc,
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


	// load prefs
	fs.readFile( 'preferences.json', function( err, jsonData ) {
		if ( err ) {
			console.log( err + '\nUsing default preferences.' );
			jsonData = {
				vlc : {
					cmd : '/Applications/VLC.app/Contents/MacOS/VLC'
				},
				media : {
					movieFolders : [ '../fixture/movies' ],
					tvFolders : [ '../fixture/tv' ]
				}
			};
		} else {
			jsonData = JSON.parse( jsonData ).preferences;
		}

		if ( jsonData.vlc && jsonData.vlc.cmd ) {
			clivlc = path.resolve( jsonData.vlc.cmd );
			console.log( 'vlc: ' + clivlc );
		}

		if ( jsonData.media && jsonData.media.movieFolders ) {
			moviesPath = path.resolve( jsonData.media.movieFolders[ 0 ]);
			console.log( 'movies: ' + moviesPath );
		}

		if ( jsonData.media && jsonData.media.tvFolders ) {
			tvPath = path.resolve( jsonData.media.tvFolders[ 0 ]);
			console.log( 'movies: ' + tvPath );
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
				// ignore . files, thumbs.db
				return ! /^\.|thumbs\.db/i.test( filename );
			});

			for ( i = 0; i < files.length; i++ ) {
				// add movie to list
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


	// list all TV shows in folder
	exports.listTv = function( req, res ) {
		var shows = {},
			i,
			dataFile;

		fs.readdir( tvPath, function( err, files ) {
			// TODO handle 'no files'
			files = files.filter(function( filename ) {
				// ignore . files, thumbs.db
				return ! /^\.|thumbs\.db/i.test( filename );
			});

			for ( i = 0; i < files.length; i++ ) {
				// add show to list
				shows[ files[ i ]] = { title: files[ i ] };

				// read metadata for show
				dataFile = path.join( tvPath, files[ i ], 'metadata.json' );
				if ( fs.existsSync( dataFile )) {
					try {
						shows[ files[ i ]] = JSON.parse( fs.readFileSync( dataFile )).show;
					} catch ( x ) {
						console.error( dataFile, x );
					}
				}
			}

			ejsLayout( res, 'tv/list', {
				title: 'TV shows',
				files: files,
				shows: shows
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
			if ( err ) {
				console.log( err );
				return;
			}

			var i = 0;

			// look for first image
			while ( files && i < files.length && ! /\.jpg$/.test( files[ i ] )) {
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
			vlcArgs = [
				'--fullscreen', // taskbar still visible, W7 bug only?
				'--no-video-title-show',
				'--sub-language=en,any',
				//'--high-priority', // high performance = priority VLC thread
				// '--rt-offset=2',
				'--play-and-exit' // quit when done
			],

			playMovie = function() {
				console.log( clivlc, vlcArgs.join( ' ' ));
				require( 'child_process' ).spawn( clivlc, vlcArgs );
			}
		;

		// read metadata
		fs.readFile( path.join( moviesPath, movie, 'metadata.json' ), function( err, jsonData ) {
			var data, MRL;

			// check we have data
			if ( err ) {
				console.log( 'no data' );
				data = {};
			} else {
				data = JSON.parse( jsonData ).movie;
			}

			// audio stream
			if ( data.playback && data.playback.audio ) {
				vlcArgs.push( '--audio-track=' + data.playback.audio );
			}

			// subtitles
			if ( data.playback && data.playback.subtitle ) {
				vlcArgs.push( '--sub-track=' + data.playback.subtitle );
			}

			// media URL
			if ( data.playback && data.playback.file ) {
				// dvd file name, title and (TODO chapter)
				MRL = data.playback.file;
				if ( data.playback.title ) {
					MRL += '#' + data.playback.title;
				}
			} else {
				MRL = 'VIDEO_TS';
			}
			vlcArgs.push( 'file:///' + path.join( moviesPath, movie, MRL ));

			playMovie();
		});

		// redirect to movie page
		// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.4
		res.writeHead( 303, {
			'Location': '/movie/' + req.params.movie + '/'
		});

		res.end();
	};


// node globals (keep jslint happy)
}( console, exports, require ));
