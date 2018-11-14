/*
 * Copyright (c) 2015, All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [ 'bin/*', 'src/*.js' ],
      options: {
        scripturl: true,
        camelcase: true,
        esversion: 6
      }
    },
    mocha_istanbul: {
      target: {
        src: 'test/unit',
        options: {
          coverageFolder: 'test/coverage',
          excludes: [
          ],
          coverage: true,
          check: {
            lines: 80,
            statements: 80 
          }
        }
      }
    },

    clean: {
      all: ['coverage', 'node_modules'],
      buildResidues: ['coverage']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('test', ['clean:buildResidues', 'jshint', 'mocha_istanbul']);
  grunt.registerTask('default', ['test']);

};
