// custom UI for movie list view
(function( $, window ) {
	'use strict';


	// alphabetic nav
	$( window ).on( 'keyup', function( event ){
		var letter = String.fromCharCode( event.keyCode );

		console.log( event.keyCode );
		console.log( letter );

		if ( /[A-Z]/.test( letter )) {
			var li = $( 'li', 'nav' ),
				i = 0
			;

			while ( i < li.length && letter > li.eq( i ).text().replace( /^\s*(.)[\s\S]*$/, '$1' ).toUpperCase() ) {
				i++;
			}

			if ( i < li.length ) {
				$( window ).scrollTo( li.eq( i ));
			}
		}

	});


	// put focus on first nav item in page onload
	$( 'nav a' ).eq( 0 ).focus();


}( jQuery, window ));
