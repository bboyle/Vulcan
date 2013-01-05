/*jslint browser:true, jquery:true*/
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


	$( 'nav' )

		// normalise hover = focus for nav
		.on( 'mouseenter', 'a, button, :button, :submit', function( event ) {
			$( event.target ).focus();
		})

		// navigating inside nav elements
		.on( 'keydown', 'a, button, :button, :submit', function( event ){

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

					focus.find( 'a, button, :button, :submit' ).eq( 0 ).focus();

					event.preventDefault();
				break;


				// up = prev item in menu
				case KUP:
					focus = target.parent().prev( 'li' );

					if ( focus.length === 0 ) {
						focus = target.closest( 'nav' ).find( 'li' ).eq( -1 );
					}

					focus.find( 'a, button, :button, :submit' ).eq( 0 ).focus();

					event.preventDefault();
				break;
			}
	});


	// browser navigation
	$( window ).on( 'keyup', function( event ){

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


	// put focus on first nav item in page onload
	$( 'a, button, :button, :submit', 'nav' ).eq( 0 ).focus();


}( jQuery, window ));
