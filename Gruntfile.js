/*
 * grunt-jsmeter
 * https://github.com/joseph-jja/grunt-jsmeter
 *
 * Copyright (c) 2013 Joe Acosta
 * Licensed under the GPL license.
 */

'use strict';

function GruntSupport(grunt) {

    var ext = "hbs",
        outExt = "js";

    function getFileMap(baseDir) {
        var sources = {}, key;

        grunt.file.recurse(baseDir, function(abspath, rootdir, subdir, filename) {

            if (filename.substring(filename.length - ext.length) === ext) {
                key = abspath.replace(ext, outExt);
                sources[key] = abspath;
            }

        });

        return sources;
    }

    return {
        getFileMap: getFileMap
    };
}

module.exports = function(grunt) {

    var gruntSupport = new GruntSupport(grunt);

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
            tests: ['tmp', 'coverage', 'logs'],
        },

        jsbeautifier: {
            files: '<%= jshint.files %>'
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'GJSM',
                    node: true
                },
                files: gruntSupport.getFileMap('templates')
            }
        },

        // Configuration to be run (and then tested).
        jsmeter: {
            default_options: {
                options: {
                    dest: 'console'
                },
                files: {
                    src: '<%=jshint.files %>'
                }
            },
            custom_options: {
                options: {
                    dest: 'logs/jsmeter',
                    engine: 'HTMLRender'
                },
                files: {
                    src: '<%=jshint.files %>'
                }
            },
        },

        // Unit tests.
        jasmine_node: {
            src: 'tasks/**/**.js',
            projectRoot: ".",
            specFolders: ["./test/"],
            verbose: true,
            options: {
                specNameMatcher: "*_spec*", // load only specs containing specNameMatcher
                requirejs: false,
                forceExit: true,
                jUnit: {
                    report: false,
                    savePath: "./coverage/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            coverage: {
                //collect: ['tasks/**/**.js'],
                report: ['html']
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'jasmine_node']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'handlebars', 'jsbeautifier', 'jshint', 'jasmine_node']);

};
