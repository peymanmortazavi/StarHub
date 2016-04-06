'use strict';
var wordfreq = require("word-freq");

module.exports = function(source) {
  let obj = wordfreq.freq(source,true,false);
  var keys = Object.keys(obj);
  let toReturn = [];
  for (let elem of keys) {
    const tempObj = {};
    tempObj[elem] = obj[elem];
    toReturn.push(tempObj);
  }
  const compareFunc = (a, b) => {
    return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
  }
  return toReturn.sort(compareFunc);
}
