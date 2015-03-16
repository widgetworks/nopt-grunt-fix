'use strict';

var grunt = require('grunt');

// Parse options printed by fixtures/Gruntfile-cli into an object.
var optionValueRe = /###(.*?)###/;
function getOptionValues(str) {
  var matches = str.match(optionValueRe);
  return matches ? JSON.parse(matches[1]) : {};
}

exports['cli'] = {
  '--debug taskname': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', '--debug', 'debug', 'finalize'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {debug: 1}, 'Options should parse correctly.');
      test.done();
    });
  },
  'taskname --debug': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', 'debug', '--debug', 'finalize'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {debug: 1}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--debug --verbose': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', '--debug', '--verbose', 'debug', 'verbose', 'finalize'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {debug: 1, verbose: true}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--verbose --debug': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', '--verbose', '--debug', 'debug', 'verbose', 'finalize'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {debug: 1, verbose: true}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--once --no-watch': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', 'print-option:once', 'print-option:no-watch', 'finalize', '--once', '--no-watch'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {once: true, 'no-watch': true}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--once --no-watch flags': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', 'print-option:watch', 'print-option:no-watch', 'finalize', '--once', '--no-watch'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {'no-watch': true, watch: false}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--ver=1.10': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli-fix.js', 'print-option:ver', 'finalize', '--ver=1.10'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {ver: '1.10'}, 'Option should parse as number.');
      test.done();
    });
  },
};