'use strict';

module.exports = function(source) {

  var uri_pattern = /(\w*).(?:jpg|gif|png|svg)/g;
  // var uri_pattern = /(\w*).(tif|tiff|gif|jpeg|jpg|jif|jfif|jp2|jpx|j2k|j2c|fpx|pcd|png|pdf)
  return source.match(uri_pattern);
}


// |tif|tiff|gif|jpeg|jpg|jif|jfif|jp2|jpx|j2k|j2c|fpx|pcd|png|pdf
