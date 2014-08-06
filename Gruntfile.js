module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'src/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    concat: {
      js: {
        src: [
          // The libs
          'bower_components/ace-builds/src-min-noconflict/ace.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          
          // App specific files
          'src/js/*.js'
        ],
        dest: 'dist/built.js',
      },
      css:{
        
      }
    },
    bowercopy: {
      // Javascript
      js: {
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  // Default task(s).
  grunt.registerTask('default', ['bowercopy','jshint','concat']);
};