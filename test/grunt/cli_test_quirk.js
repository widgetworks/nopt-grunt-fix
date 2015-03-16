'use strict';

var grunt = require('grunt');

// Parse options printed by fixtures/Gruntfile-cli into an object.
var optionValueRe = /###(.*?)###/;
function getOptionValues(str) {
  var matches = str.match(optionValueRe);
  return matches ? JSON.parse(matches[1]) : {};
}

exports['cli'] = {
  '--once --no-watch': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli.js', 'print-option:once', 'print-option:no-watch', 'finalize', '--once', '--no-watch'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {once: '--no-watch', 'no-watch': false}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--once --no-watch flags': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli.js', 'print-option:watch', 'print-option:no-watch', 'finalize', '--once', '--no-watch'],
    }, function(err, result) {
      // NOTE: `watch` is undefined so won't be output by `JSON.stringify()`.
      test.deepEqual(getOptionValues(result.stdout), {'no-watch': false}, 'Options should parse correctly.');
      test.done();
    });
  },
  '--ver=1.10': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', 'test/fixtures/Gruntfile-cli.js', 'print-option:ver', 'finalize', '--ver=1.10'],
    }, function(err, result) {
      test.deepEqual(getOptionValues(result.stdout), {ver: 1.1}, 'Option should parse as number.');
      test.done();
    });
  },
};