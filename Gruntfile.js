module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'src/js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      },
    },
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
              
              // Angular-bootstrap
              'angular-bootstrap':'angular-bootstrap/*.js',
              
              // Font-Awesome
              'font-awesome/css':'font-awesome/css/*',
              'font-awesome/fonts':'font-awesome/fonts/*',
              
              // Ace-Builds
              'ace':'ace-builds/src-noconflict/*'
              
            //For dist
          },
      },
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['bowercopy','jshint']);
};