(function( $ ) {
	'use strict';


	// load movie poster when showing a 
	$( '#movies' ).on( 'focus', 'a', function( event ) {
		$( '#poster' ).attr( 'src', $( event.target ).attr( 'href' ).replace( /data$/, '' ) + 'poster' );
	});


}( jQuery ));
