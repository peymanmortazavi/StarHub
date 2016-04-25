'use strict'
var stats = require("stats-lite");
var m = require('yagnus');

module.exports = function(arr1, arr2) {

  let multArr = []
  for (var i = 0; i < arr1.length; i++) {
   multArr.push(arr1[i] * arr2[i]);
  }
  var arrSum = multArr.reduce(function(pv, cv) { return pv + cv; }, 0);

  var arr1Sum = arr1.reduce(function(pv, cv) { return pv + cv; }, 0);
  var arr2Sum = arr2.reduce(function(pv, cv) { return pv + cv; }, 0);

  var arr1SquareSum = 0;
  for (let i = 0; i < arr1.length; i++) {
    arr1SquareSum += Math.pow(arr1[i], 2);
  }

  var arr2SquareSum = 0;
  for (let i = 0; i < arr2.length; i++) {
    arr2SquareSum += Math.pow(arr2[i], 2);
  }

  const numerator = (arrSum  - ((arr1Sum * arr2Sum) / arr1.length));
  const denominator = Math.sqrt((arr1SquareSum - ((Math.pow(arr1Sum, 2))/arr1.length)) * (arr2SquareSum - (Math.pow(arr2Sum, 2))/arr2.length));

  return numerator / denominator;
}
