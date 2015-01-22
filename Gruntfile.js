'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json')
			.appPath || 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['src/scripts/{,*/}*.js'],
				tasks: ['build']
			},
			less: {
				files: ['src/styles/{,*/}*.less'],
				tasks: ['build']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			}
		},

		// "less"-task configuration
		less: {
			// production config is also available
			development: {
				options: {
					// Specifies directories to scan for @import directives when parsing.
					// Default value is the directory of the source, which is probably what you want.
					// paths: [""]
				},
				files: {
					// compilation.css : source.less
					"dist/styles/ng-awesome-bootstrap.css": [
						"src/styles/ng-awesome-bootstrap.less"
					]
				}
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist/styles',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/styles',
					ext: '.min.css'
				}]
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/scripts/ng-awesome-bootstrap.min.js': ['src/scripts/{,*/}*.js']
				}
			}
		},

		dist: {
			options: {
				open: true,
				base: 'dist'
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
					'.tmp',
					'dist/{,*/}*',
					'!dist/.git{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},

		// Copies remaining files to places other tasks can use
		copy: {
			fonts: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'src',
					dest: 'dist',
					src: [
					'fonts/{,*/}*.*'
					]
				}]
			},
			test: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'dist',
					dest: '../AngApp01/bower_components/ng-awesome-bootstrap/dist',
					src: [
					'{,*/}*.*'
					]
				}]
			}
		}
	});


	grunt.registerTask('build', [
		'clean:dist',
		'less',
		'cssmin',
		'uglify',
		'copy:fonts',
		'copy:test'
		]);

	grunt.registerTask('default', [
	'build',
		'watch'
		]);

};