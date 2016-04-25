'use strict'
var stats = require("stats-lite");
var m = require('yagnus');
// const _ = require('lodash');

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
  // console.log(multArr)

  var arrSum = multArr.reduce(function(pv, cv) { return pv + cv; }, 0);
  var covariance = arrSum / (arr1.length - 1)

  console.log('returning covariance of: ' + covariance)
  return covariance;
}


module.exports = function(array1, array2) {
  console.log('stdev of array1: ' + stats.stdev(array1))
  console.log('stdev of array2: ' + stats.stdev(array2))
  return coVariance(array1, array2) / (stats.stdev(array1) * stats.stdev(array2));
}
