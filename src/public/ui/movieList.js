// custom UI for movie list view
(function( $, window ) {
	'use strict';


	// alphabetic nav
	$( window ).on( 'keyup', function( event ){
		var letter = String.fromCharCode( event.keyCode ),
			li, i;

		if ( /[A-Z]/.test( letter )) {
			li = $( 'li', 'nav' );
			i = 0;

			while ( i < li.length && letter > li.eq( i ).text().replace( /^\s*(\S)[\s\S]*$/, '$1' ).toUpperCase() ) {
				i++;
			}

			if ( i < li.length ) {
				$( window ).scrollTo( li.eq( i ));
				// keyboard focus on first link or button
				$( 'a, button', li.eq( i )).eq( 0 ).focus();
			}
		}

	});


	// put focus on first nav item in page onload
	$( 'nav a' ).eq( 0 ).focus();


}( jQuery, window ));
