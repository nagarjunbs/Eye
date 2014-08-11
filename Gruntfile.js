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
      'concat-js': {
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
        dest: 'dist/js/built.js',
      },
      'concat-css':{
        src:[
          // The libs
          'bower_components/angular/angular-csp.css',
          'bower_components/bootstrap/css/bootstrap.min.css',
          'bower_components/font-awesome/css/font-awesome.min.css',
          
          //App specific files
          'src/resources/app.css'
        ],
        dest:'dist/resources/css/build.css'
      }
    },
    bowercopy: {
      //For Development
      'copy-src-js': {
          options: {
              destPrefix: 'src/libs'
          },
          files: {
              // jQuery
              'jquery': 'jquery/dist/*',
              
              // Angular
              'angular': 'angular/*',
              
              // Bootstrap
              'bootstrap':'bootstrap/dist/*',
              
              // Angular-bootstrap
              'angular-bootstrap':'angular-bootstrap/*.js',
              
              // Ace-Builds
              'ace':'ace-builds/src-noconflict/*'
          },
      },
      'copy-src-css':{
        options: {
              destPrefix: 'src/libs'
          },
        files:{
          // Font-Awesome
          'font-awesome/css':'font-awesome/css/*',
          'font-awesome/fonts':'font-awesome/fonts/*',
        }
      },
      
      //For Dist
      'copy-dist-resources':{
        options:{
          destPrefix:'dist/resources/'
        },
        files:{
          'fonts':[
            'bower_components/font-awesome/fonts/*',
            'bower_components/bootstrap/dist/fonts/*'
          ]
        }
      }
    },
    /*Tests*/
    jasmine: {
      "unit-tests": {
        src: [
          'src/js/app.js',
          'src/js/services/EditorService.js',
          'src/js/controllers/EditorController.js',
          'src/tests/controllers/EditorController.tests.js'
        ],
        options:{
            vendor: [
            'bower_components/jquery/dist/jquery.min.js',
            
            //Include unminified angular so that it emits proper errors if any
            'bower_components/angular/angular.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/ace-builds/src-min-noconflict/ace.js'
          ]
        }
      }
    },
    
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  // Default task(s).
  grunt.registerTask('default', ['bowercopy','jshint','concat']);
  grunt.registerTask('hint',['jshint']);
  grunt.registerTask('bower',['bowercopy']);
};