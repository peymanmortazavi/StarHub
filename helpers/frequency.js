'use strict';
var wordfreq = require("word-freq");

module.exports = function(source) {
  // freq(text, noStopWords, shouldStem)
  return wordfreq.freq(source,true,false);
}
