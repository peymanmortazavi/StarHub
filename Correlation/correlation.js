'use strict'
var stats = require("stats-lite");
var m = require('yagnus');

const coVariance = function(arr1, arr2) {
  var arr1Mean = stats.mean(arr1);
  var arr2Mean = stats.mean(arr2);

  var subtractedArr1 = arr1.map(function(val) {
    return val - arr1Mean;
  });
  var subtractedArr2 = arr2.map(function(val) {
    return val - arr2Mean;
  });

  var multArr = []
  for (var i = 0; i < arr1.length; i++) {
   multArr.push(subtractedArr1[i] * subtractedArr2[i]);
  }
  console.log(multArr)

  var arrSum = multArr.reduce(function(pv, cv) { return pv + cv; }, 0);
  var covariance = arrSum / (arr1.length - 1)

  return covariance;
}


module.exports = function(input) {
  var sizeArr = [];
  var starArr = [];

  for (let elem of input) {
    sizeArr.push(elem.size);
    starArr.push(elem.stargazers_count);
  }

  // console.log(stats.stdev(sizeArr));
  // console.log(stats.stdev(starArr));

  console.log('correlation: ' + (coVariance(sizeArr, starArr) / (stats.stdev(sizeArr) * stats.stdev(starArr))));
}
