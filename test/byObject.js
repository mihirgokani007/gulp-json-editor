/* jshint node: true */
/* global it */

var json   = require('../');
var gulp   = require("gulp");
require('should');
require('mocha');

it('should modify property of JSON object (by object editor)', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    version: '2.0.0'
  }));

  stream.on('data', function(file) {
    var expected =
      '{' +
      '"name":"test object",' +
      '"version":"2.0.0",' +
      '"nested":{' +
      '"name":"nested object",' +
      '"version":"1.0.0"' +
      '}' +
      '}'
    file.contents.toString().should.eql(expected);
    done();
  });
});


it('should add property of JSON object (by object editor)', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    description: 'this is test'
  }));

  stream.on('data', function(file) {
    var expected =
      '{' +
      '"name":"test object",' +
      '"version":"1.0.0",' +
      '"nested":{' +
      '"name":"nested object",' +
      '"version":"1.0.0"' +
      '},' +
      '"description":"this is test"' +
      '}'
    file.contents.toString().should.eql(expected);
    done();
  });
});


it('should modify nested property of JSON object (by object editor)', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    nested: {
      version: '2.0.1'
    }
  }));

  stream.on('data', function(file) {
    var expected =
      '{' +
      '"name":"test object",' +
      '"version":"1.0.0",' +
      '"nested":{' +
      '"name":"nested object",' +
      '"version":"2.0.1"' +
      '}' +
      '}'
    file.contents.toString().should.eql(expected);
    done();
  });
});


it('should add nested property of JSON object (by object editor)', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    nested: {
      description: 'this is test for nested'
    }
  }));

  stream.on('data', function(file) {
    var expected =
      '{' +
      '"name":"test object",' +
      '"version":"1.0.0",' +
      '"nested":{' +
      '"name":"nested object",' +
      '"version":"1.0.0",' +
      '"description":"this is test for nested"' +
      '}' +
      '}'
    file.contents.toString().should.eql(expected);
    done();
  });
});


it('should multiple properties of JSON object (by object editor)', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    version: '2.0.0',
    description: 'this is test',
    nested: {
      version: '2.0.1',
      description: 'this is test for nested'
    }
  }));

  stream.on('data', function(file) {
    var expected =
      '{' +
      '"name":"test object",' +
      '"version":"2.0.0",' +
      '"nested":{' +
      '"name":"nested object",' +
      '"version":"2.0.1",' +
      '"description":"this is test for nested"' +
      '},' +
      '"description":"this is test"' +
      '}'
    file.contents.toString().should.eql(expected);
    done();
  });
});
