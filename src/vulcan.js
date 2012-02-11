/**
 * @author		Ben Boyle <benjamins.boyle@gmail.com>
 * @version		0.1
 * @since		2012-02-11
 *
 * @requires	node.js (a node.js environment is assumed)
 */
(function( require, console ) {
	'use strict';


	var http = require( 'http' ),
		path = require( 'path' ),
		spawn = require( 'child_process' ).spawn,
		config,
		app,
		vlc
	;


	// configure
	config = {
		port: 1337,
		movies : 'f:/dvd/Movies/'
	};


	// start server
	app = require( 'express' ).createServer();


	// get a list of all movies
	app.get( '/movie/', function( req, res ) {
		
	});


	app.post( '/movie/:title/play', function( req, res ) {

		// allow for VIDEO_TS, fallback to .iso?
		var media = path.join( config.movies, req.params.title, '/VIDEO_TS' );

/*		path.exists( media, function( exists ) {
			
			if ( exists ) {
				// play media
				// return success

			} else {
				// no media
				// return 404
			}

		});*/

		console.log( 'playing', media );

		// if VLC is running, kill it? queue up next request?
		// what if it's already running what you want to watch?
		if ( vlc && vlc.pid ) {
			vlc.kill();
		}

		// movie path


		// fire up VLC!
		vlc = spawn( 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe', [
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
		res.writeHead( 200, {
			'Content-Type': 'text/plain'
		});
		res.end( 'Now playing demo movie…' );

	});


	// listen on port
	app.listen( config.port );

	console.log( 'Server running on localhost@', config.port );


// keeping jslint happy (node globals)
}( require, console ));
