(function( exports ) {
	'use strict';

	/*
	 * GET home page.
	 */

	exports.index = function( req, res ) {
		res.render( 'index', { title: 'Express' });
	};


// node globals (keep jslint happy)
}( exports ));
