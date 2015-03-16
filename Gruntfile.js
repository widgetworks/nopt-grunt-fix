'use strict';

module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	
	grunt.initConfig({
		nodeunit: {
			all: ['test/grunt/**/*.js'],
			tap: {
				src: '<%= nodeunit.all %>',
				options: {
					reporter: 'tap',
					reporterOutput: 'tests.tap'
				}
			}
		}
	});

	// "npm test" runs these tasks
	grunt.registerTask('test', '', function(reporter) {
		grunt.task.run(['nodeunit:' + (reporter || 'all')]);
	});

	// Default task.
	grunt.registerTask('default', ['test']);
	
};