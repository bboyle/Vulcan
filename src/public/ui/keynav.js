(function( $, window ) {
	'use strict';


	var KUP = 38,
		KDOWN = 40,
		KLEFT = 37,
		KRIGHT = 39,
		// KPAGE_DOWN = 34,
		// KPAGE_UP = 33,

		// ENTER = 13 (default behaviour is fine!)
		KESC = 27
	;

	// abc...z = 97, 98, ...
	// jump to first item starting with that letter (or nearest match)


	// put focus on first nav item in page onload
	$( 'nav a' ).eq( 0 ).focus();


	// navigating inside nav elements
	$( 'nav' ).on( 'keypress', 'a', function( event ){
		// console.log( event.keyCode, event.which );

		var target = $( event.target ),
			focus;

		switch ( event.keyCode ) {
			
			// down = next item in menu
			case KDOWN:
				focus = target.parent().next( 'li' );

				if ( focus.length === 0 ) {
					// back to first item
					focus = target.closest( 'nav' ).find( 'li' ).eq( 0 );
				}

				focus.find( 'a' ).eq( 0 ).focus();

				event.preventDefault();
			break;


			// up = prev item in menu
			case KUP:
				focus = target.parent().prev( 'li' );

				if ( focus.length === 0 ) {
					focus = target.closest( 'nav' ).find( 'li' ).eq( -1 );
				}

				focus.find( 'a' ).eq( 0 ).focus();

				event.preventDefault();
			break;
		}
	});


	// browser navigation
	$( window ).on( 'keypress', function( event ){

		switch ( event.keyCode ) {
			
			// go back (left, escape)
			case KESC:
			case KLEFT:
				window.history.go( -1 );
				event.preventDefault();
			break;

			// go forward (right)
			case KRIGHT:
				window.history.go( 1 );
				event.preventDefault();
			break;

		}
	});


}( jQuery, window ));
