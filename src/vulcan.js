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
		spawn = require( 'child_process' ).spawn,
		vlc
	;


	http.createServer(function( req, res ) {

		if ( req.method !== 'POST' ) {
			// favicon! ;)
			res.writeHead( 404, {
				'Content-Type': 'text/plain'
			});
			res.end( 'Not found' );
			return;
		}

		console.log( 'playing', 'file:///f:/dvd/Movies/Dodgeball/VIDEO_TS' );
		// if VLC is running, kill it? queue up next request?
		// what if it's already running what you want to watch?
		if ( vlc && vlc.pid ) {
			vlc.kill();
		}

		// fire up VLC!
		vlc = spawn( 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe', [
			'--fullscreen', // taskbar still visible, W7 bug only?
			'--sub-language=en',
			'--no-video-title-show',
			'--high-priority', // high performance = priority VLC thread
			'--play-and-exit', // quit when done
			'file:///f:/dvd/Movies/Dodgeball/VIDEO_TS',
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

	}).listen( 1337, '127.0.0.1' );


	console.log( 'Server running at http://127.0.0.1:1337/' );


// keeping jslint happy (node globals)
}( require, console ));
