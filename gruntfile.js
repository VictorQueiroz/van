/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	  uglify: {
	    js_files: {
	      files: {
	        'public/js/base.min.js': [
	        	'public/js/vendor/angular.min.js',
	        	'public/js/vendor/angular-route.min.js',
	        	'public/js/vendor/cookie.js',

	        	'public/js/app.js',
	        	'public/js/controllers.js',
	        	'public/js/directives.js'
	        ]
	      }
	    }
	  }
	});

  // Default task.
  grunt.registerTask('default', ['uglify']);
};