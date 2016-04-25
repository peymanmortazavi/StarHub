'use strict'
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var correlation = require('./correlation.js');
const _ = require('lodash');
const stats = require('stats-lite')
const inf = require('inf')

const f1  = 'stargazers_count';
const f2  = 'size';

let sizeArr = [];
let stargazersArr = [];
let ownerNameLength = [];
let repoNameLength = [];
let imageCountLength = [];
let descriptionLength = [];
let readmeSectionCount = [];

function safe_avg(arr) {
  var total = 0;
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      total += arr[i];
      count += 1;
    }
  }
  console.log('total: ' + total)
  console.log('count: ' + count)
  console.log('length: ' + arr.length);
  if (count < 1) {
    return -1;
  }
  return total / count;
}

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
    }
    else {
        var repoCollection = db.collection('repositories');
        // var cursor = repoCollection.find({}, {
        //     limit: 2000
        // });
        var cursor = repoCollection.find({}, {
            limit: 1000,
            size: 1,
            _id: 0,
            stargazers_count: 1,
            processedData: 1
        });

        let masterArr = [
            {
                "title": "starcount",
            },
            {
                "title": "repository size",
            },
            {
                "title": "owner name length",
            },
            {
                "title": "repo name length",
            },
            {
                "title": "readme image count",
            },
            {
                "title": "description length",
            },
            {
                "title": "section count",
            }
        ]
        cursor.each(function(err, doc){
            if (doc === null) {
                masterArr[0].value = stargazersArr;
                masterArr[1].value = sizeArr;
                masterArr[2].value = ownerNameLength;
                console.log('owner name length avg: ' + safe_avg(ownerNameLength));
                masterArr[3].value = repoNameLength;
                console.log('repo name length avg: ' + safe_avg(repoNameLength));
                masterArr[4].value = imageCountLength;
                masterArr[5].value = descriptionLength;
                // console.log('description avg: ' + safe_avg(descriptionLength));
                masterArr[6].value = readmeSectionCount;

                // console.log(JSON.stringify(masterArr));
                for (let i = 0; i< masterArr.length; i++){
                    for (let j = 0; j< masterArr.length; j++) {
                        console.log(`\ncorrel btwn ${masterArr[i].title} and ${masterArr[j].title} is: ` + correlation(masterArr[i].value, masterArr[j].value));
                    }
                }
                db.close();
                process.exit(1)
            }
            stargazersArr.push(_.get(doc, 'stargazers_count'));
            sizeArr.push(_.get(doc, 'size'));
            ownerNameLength.push(_.get(doc, 'processedData.helpers.ownerInfo.length', 8.83));
            repoNameLength.push(_.get(doc, 'processedData.helpers.repoInfo.length', 13.19));
            imageCountLength.push(_.get(doc, 'processedData.helpers.imageArray.length', 1.86));


            let descrr = _.get(doc, 'description');
            descriptionLength.push(descrr ? descrr.length : 57.78);
            readmeSectionCount.push(_.get(doc, 'processedData.helpers.sectionCount.headerSum', 0));
        });
    }

});
