/* jshint node: true */

var merge        = require('deepmerge');
var through      = require('through2');
var PluginError  = require('gulp-util').PluginError;
var detectIndent = require('detect-indent');

module.exports = function (editor, serializer) {

  /*
   create 'editBy' function from 'editor'
   */
  var editBy;
  if (typeof editor === 'function') {
    // edit JSON object by user specific function
    editBy = function(json) { return editor(json); };
  }
  else if (typeof editor === 'object') {
    // edit JSON object by merging with user specific object
    editBy = function(json) { return merge(json, editor); };
  }
  else if (typeof editor === 'undefined') {
    throw new PluginError('gulp-json-editor', 'missing "editor" option');
  }
  else {
    throw new PluginError('gulp-json-editor', '"editor" option must be a function or object');
  }

  /*
   create through object and return it
   */
  return through.obj(function (file, encoding, callback) {

    // ignore it
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    // stream is not supported
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-json-editor', 'Streaming is not supported'));
      return callback();
    }

    try {
      // try to get current indentation
      var indent = detectIndent(file.contents.toString('utf8'));

      // edit JSON object
      var data = editBy(JSON.parse(file.contents.toString('utf8')));

      // get string notation of edited JSON object
      var json = serializer ? serializer(data) : JSON.stringify(data);

      // write it to file
      file.contents = new Buffer(json);
    }
    catch (err) {
      this.emit('error', new PluginError('gulp-json-editor', err));
    }

    this.push(file);
    callback();

  });

};
