'use strict';
var freq = require('freq');

const compareFunc = (a, b) => {
  return b.count - a.count;
}
module.exports = function(source) {

  return freq(source).sort(compareFunc);

}
