'use strict'
var stats = require("stats-lite");
var m = require('yagnus');

// var input = [
//   {size: 600, stars: 1234},
//   {size: 470, stars: },
//   {size: 170},
//   {size: 430},
//   {size: 300}
// ]

const coVariance = function(arr1, arr2) {
  var arr1Mean = stats.mean(arr1);
  var arr2Mean = stats.mean(arr2);
  // console.log(arr1Mean)
  // console.log(arr2Mean)

  var subtractedArr1 = arr1.map(function(val) {
    return val - arr1Mean;
  });
  var subtractedArr2 = arr2.map(function(val) {
    return val - arr2Mean;
  });

  // console.log(subtractedArr1)
  // console.log(subtractedArr2)

  // var arr1Sum = subtractedArr1.reduce(function(pv, cv) { return pv + cv; }, 0);
  // var arr2Sum = subtractedArr2.reduce(function(pv, cv) { return pv + cv; }, 0);

  var multArr = []
  for (var i = 0; i < arr1.length; i++) {
   multArr.push(subtractedArr1[i] * subtractedArr2[i]);
  }
  console.log(multArr)

  var arrSum = multArr.reduce(function(pv, cv) { return pv + cv; }, 0);
  // console.log(arr1Sum)
  // console.log(arr2Sum)
  // var covariance = (arr1Sum * arr2Sum) / (arr1.length - 1)
  var covariance = arrSum / (arr1.length - 1)

  return covariance;
}

// console.log(coVariance([1,3,2,5,8,7,12,2,4], [8,6,9,4,3,3,2,7,7]))
console.log(coVariance([65.21,64.75,65.26,65.76,65.96], [67.25,66.39,66.12,65.70,66.64]))

module.exports = function(input) {
  var sizeArr = [];
  var starArr = [];

  for (let elem of input) {
    sizeArr.push(elem.size);
    starArr.push(elem.stargazers_count);
  }

  console.log(stats.stdev(sizeArr));
  console.log(stats.stdev(starArr));

  console.log('covariance: ' + covariance(sizeArr, starArr))
}
