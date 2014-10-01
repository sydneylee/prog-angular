module.exports = function(grunt) {
  grunt.initConfig ({
         sass: {
          dist: {
            files: {
              'public/css/site-sass.css' : 'public_src/sass/site-sass.scss'
            }
          }
        },
        watch: {
          css: {
            files: 'public_src/sass/site-sass.scss',
            tasks: ['sass']
          }
        },
        // Configuration to be run (and then tested).
        uglify: {
          compress_mangle: {
            files: {
              'public/js/app.min.js': [
              'public_src/app.js',
              'public_src/component/progressbar/progressbar.js'
              ]
              
            },
            options:{
              mangle:true,
              sourceMap: true
            }
          }
        }
      });  
      // grunt.loadNpmTasks('grunt-sass');//require module
      // grunt.loadNpmTasks('grunt-contrib-watch');//require module 
      // grunt.registerTask('default', ['sass']);//-watch is called once at first
     // Load the plugin that provides the "sass" task.
      grunt.loadNpmTasks('grunt-sass');
      
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.registerTask('test', [
        //'jshint'
        //'clean','uglify:compress_mangle','copy' 
        'uglify:compress_mangle'
        // 'uglify:compress_mangle', 'jscrambler:main'
        ]);
      grunt.registerTask('default', ['test', 'sass']);
    };