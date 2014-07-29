module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {
      // Javascript
      libs: {
          options: {
              destPrefix: 'src/libs'
          },
          files: {
            //For Development
              // jQuery
              'jquery': 'jquery/dist/*',
              
              // Angular
              'angular': 'angular/*',
              
              // Bootstrap
              'bootstrap':'bootstrap/dist/*',
              
              // Font-Awesome
              'font-awesome/css':'font-awesome/css/*',
              'font-awesome/fonts':'font-awesome/fonts/*',
              
              // Ace-Builds
              'ace':'ace-builds/src-noconflict/*'
              
            //For dist
          },
      },
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');

  // Default task(s).
  grunt.registerTask('default', ['bowercopy']);

};