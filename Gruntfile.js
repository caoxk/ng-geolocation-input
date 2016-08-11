module.exports = function(grunt) {
	grunt.initConfig({
		//this loads our packages for our grunt file
		pkg: grunt.file.readJSON('package.json'),

		//this section does our bower installs for us
		html2js: {
			options: {

			},
			main: {
				src: ['./templates/**/*.html'],
				dest: './dist/angular-gaode-template.js'
			}
		},
	});

	//npm modules need for our task
	grunt.loadNpmTasks('grunt-html2js');
	//run bower for package install
	grunt.registerTask('default', ['html2js']);
};