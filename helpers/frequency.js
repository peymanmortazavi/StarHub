'use strict';
var freq = require('freq');

module.exports = function(source) {

  return freq(source).sort();

}
