'use strict';

module.exports = function gruntConfig(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // check all js files for errors, Überprüfung der Syntax

        // configure nodemon
        nodemon: {
            dev: {
                script:  './server.js',
                options: {}
            },
            test: {
                script:  './server.js',
                options: {}
            },
            leosdev: {
                script:  './server.js',
                options: {}
            },
            prod: {
                script:  './server.js',
                options: {}
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['force:eslint:html', 'nodemon', 'watch']
        },

        // watch js files and process the above tasks
        // watch: {
        //     js: {
        //         files:   [systemJs, assetsJs],
        //         tasks:   ['force:eslint:html'],
        //         options: {
        //             livereload: true
        //         }
        //     },
        //     tests: {
        //         files: [testJs],
        //         tasks: ['force:eslint:html']
        //     },
        //     html: {
        //         files:   ['public/cros/**/*.html'],
        //         options: {
        //             livereload: true
        //         }
        //     },
        //     css: {
        //         files: ['public/cros/styles/**/*.less'],
        //         tasks: ['less']
        //     }
        // },

        env: {
            dev: {
                NODE_ENV: 'development',
                PORT:     3000
            },
            leosdev: {
                NODE_ENV: 'leosdevelopment',
                PORT:     7001
            },
            prod: {
                NODE_ENV: 'production',
                PORT:     4000
            },
            test: {
                NODE_ENV: 'test',
                PORT:     7001
            }
        },



        jsdoc: {
            ng: {
                options: {
                    destination: 'doc/ngdoc',
                    configure:   '.ngdocrc'
                }
            },
            js: {
                options: {
                    destination: 'doc/jsdoc',
                    configure:   '.jsdocrc'
                }
            }
        },

    });


    // loadNpmTasks
    require('jit-grunt')(grunt, {
        availabletasks: 'grunt-available-tasks',
    });

    // Installation tasks
    grunt.registerTask('install', ['update']);
    grunt.registerTask('update', ['shell:npm_install']);


    // Run tasks
    grunt.registerTask('dev', ['nodemon:dev', 'env:dev']);
    grunt.registerTask('prod', ['nodemon:prod', 'env:prod']);

    // Default task(s)
    grunt.registerTask('default', ['availabletasks']);

};