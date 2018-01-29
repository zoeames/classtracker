module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js', '!../javascripts/vendor/**/*.js'],
      options: {
        predef: [ "document", "console", "$", "angular", "app"],
        esnext: true
      }
    },
     sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd:"../",
            src: [
              "index.html",
              "favicon.ico",
              "javascripts/**/*",
              "styles/**/*.css",
              "partials/**/*",
              "images/**/*"
            ],
            dest: "../public/"
        }
        ]
      }
    },
    clean: {
      dist: {
        options: {force: true},
        src: ['../public']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
  grunt.registerTask('deploy', ['copy']);
  grunt.registerTask('cl', ['clean']);
};