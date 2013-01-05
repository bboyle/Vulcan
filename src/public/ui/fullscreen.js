/*jslint browser:true, jquery:true*/
(function( window, screen, document ) {
	'use strict';


	var polyFullscreen = document.body.requestFullscreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen;

	if ( polyFullscreen ) {
		polyFullscreen.call( document.body );
	} else {
		window.moveTo( 0, 0 );
		window.resizeTo( screen.availWidth, screen.availHeight );
	}


}( window, screen, document ));
