'use strict';
module.exports = function (source) {
  try{
    const uri_pattern = /(\w*).(gif|jpeg|jpg|jif|png)/g
    return source.match(uri_pattern);
  }
  catch (error) {
    return null;
  }};
