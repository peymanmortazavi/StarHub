'use strict';
module.exports = function (source) {
 const uri_pattern = /(\w*).(tif|tiff|gif|jpeg|jpg|jif|jfif|jp2|jpx|j2k|j2c|fpx|pcd|png|pdf|svg)/g
 return source.match(uri_pattern);
};
