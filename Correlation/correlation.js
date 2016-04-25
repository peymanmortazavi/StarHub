'use strict'
var stats = require("stats-lite");
// var m = require('yagnus');
const _ = require('lodash');

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

  return covariance;
}


module.exports = function(attr1, attr2, input) {
  var array1 = [];
  var array2 = [];

  for (let elem of input) {
    array1.push(_.get(attr1, input)]);
    array2.push(_.get(attr2, input)]);
    console.log('array1: ' + array1)
  }

  console.log('correlation between ' + attr1 + ' and ' + attr2 + ' is: ' + (coVariance(array1, array2) / (stats.stdev(array1) * stats.stdev(array2))));
}
