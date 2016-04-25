'use strict'
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var correlation = require('./correlation.js');
const _ = require('lodash');

const f1  = 'stargazers_count';
const f2  = 'size';

let sizeArr = [];
let stargazersArr = [];
let ownerNameLength = [];
let repoNameLength = [];
let imageCountLength = [];
let descriptionLength = [];
let readmeSectionCount = [];

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
    }
    else {
        var repoCollection = db.collection('repositories');
        var cursor = repoCollection.find({}, {
            limit: 10,
            size: 1,
            _id: 0,
            stargazers_count: 1,
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
                masterArr[3].value = repoNameLength;
                masterArr[4].value = imageCountLength;
                masterArr[5].value = descriptionLength;
                masterArr[6].value = readmeSectionCount;

                console.log(JSON.stringify(masterArr));
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
            ownerNameLength.push(_.get(doc, 'processedData.helpers.ownerInfo.length'));
            repoNameLength.push(_.get(doc, 'processedData.helpers.repoInfo.length'));
            imageCountLength.push(_.get(doc, 'processedData.helpers.imageArray.length'));
            descriptionLength.push(_.get(doc, 'description', '').length);
            readmeSectionCount.push(_.get(doc, 'processedData.helpers.sectionCount.headerSum', 0));
            // console.log('SECTION COUNT: ' + readmeSectionCount)
        });
    }

});
