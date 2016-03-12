'use strict';

module.exports = function(source) { 

  var uri_pattern = /.(?:jpg|gif|png|svg)/g;
  return source.match(uri_pattern);
}
