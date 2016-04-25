import test from 'ava';
const correl = require('./correlation2.js');

const arr1 = [1,2,3]
const arr2 = [1,2,3]
//
const hardArr1 = [56,56,65,65,50,25,87,44,35];
const hardArr2 = [87,91,85,91,75,28,122,66,58];


test('sums to 1', t => {
  t.same(correl(arr1, arr2), 1);
});
test('hard sum', t => {
  t.same(correl(hardArr1, hardArr2).toFixed(4), 0.9662);
});
