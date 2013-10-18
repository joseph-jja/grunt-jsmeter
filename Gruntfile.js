/*
 * grunt-jsmeter
 * https://github.com/joseph-jja/grunt-jsmeter
 *
 * Copyright (c) 2013 Joe Acosta
 * Licensed under the GPL license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: [
          "package.json", 
          "Gruntfile.js", 
          "tasks/**/*.js", 
          "test/**/*.js"
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    jsmeter: {
      default_options: {
        options: {
            dest: 'console'
        },
        files: '<%= jshint.all %>'
      },
      custom_options: {
        options: {
            dest: 'log/jsmeter'
        },
        files: '<%= jshint.all %>'
      },
    },

    // Unit tests.
    jasmine_node: {
        options: {
            specNameMatcher: ".*_spec*", // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath : "./jasmine/",
                useDotNotation: true,
                consolidate: true
             }   
        }, 
        coverage: {
            report: [ 'html' ]
        }
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jasmine_node']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
