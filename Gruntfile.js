'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			build: [ 'build' ]
		},
		// code quality tasks
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'src/*.js',
					'src/routes/*.js',
					'src/*.json'
				]
			},
			ui: {
				options: {
					jshintrc: 'src/public/.jshintrc'
				},
				src: [
					'src/public/**/*.js',
					'!src/public/ui/lib/*.js'
				]
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			},
			srcServer: {
				files: '<%= jshint.src.src %>',
				tasks: [ 'jshint:src' ]
			},
			srcClient: {
				files: '<%= jshint.ui.src %>',
				tasks: [ 'jshint:ui' ]
			}
		},
		cucumber: {
			test: {
				features: 'features'
			},
			options: {
				profile: 'grunt'
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-rcukes' );

	// Default task.
	grunt.registerTask( 'test', [ 'jshint', 'cucumber' ]);
	grunt.registerTask( 'default', [ 'test' ]);

};
