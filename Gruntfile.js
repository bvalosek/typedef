module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            lib: ['lib/**/*.js'],
            test: ['test/main.js', 'test/unit/*.js'],
            grunt: ['Gruntfile.js']
        },

        browserify: {
            debug: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'bin/<%= pkg.name %>.debug.js',
                options: { debug: true }
            },

            release: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'bin/<%= pkg.name %>.release.js',
                options: { standalone: '<%= pkg.name %>' }
            },

            test: {
                src: ['test/main.js'],
                dest: 'test/bin/main.debug.js',
                options: { debug: true }
            }
        },

        uglify: {
            release: {
                src: ['bin/<%= pkg.name %>.release.js'],
                dest: 'bin/<%= pkg.name %>.min.js',
                options: { report: 'gzip' }
            },
        },

        watch: {
            lib: {
                files: ['lib/**/*.js'],
                tasks: ['build', 'test']
            },

            test: {
                files: ['test/unit/**/*.js', 'test/main.js'],
                tasks: ['lint', 'browserify:test']
            },

            options: {
                livereload: 35729
            }
        },

        qunit: {
            all: ['test/index.html']
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // tasks
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['lint', 'browserify:debug']);
    grunt.registerTask('test', ['build', 'browserify:test', 'qunit']);
    grunt.registerTask('release', ['lint', 'browserify:release', 'uglify:release']);
    grunt.registerTask('default', ['build']);

};
