'use strict'
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/github';
var correlation = require('./correlation2.js');
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

function getValue(type, obj, query, def, giveLength) {
    var data = _.get(obj, query);
    if (typeof data === type) {
        if (giveLength) {
            return data.length;
        }
        return data;
    }
    return def;
}

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
    }
    else {
        var repoCollection = db.collection('repositories');
        var cursor = repoCollection.find({}, {
//            limit: 15000,
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
                masterArr[3].value = repoNameLength;
                masterArr[4].value = imageCountLength;
                masterArr[5].value = descriptionLength;
                masterArr[6].value = readmeSectionCount;

                for (let i = 0; i< masterArr.length; i++){
                    for (let j = 0; j< masterArr.length; j++) {
                        console.log(`\ncorrel btwn ${masterArr[i].title} and ${masterArr[j].title} is: ` + correlation(masterArr[i].value, masterArr[j].value));
                    }
                }
                db.close();
                process.exit(1)
            }
            stargazersArr.push(getValue('number', doc, 'stargazers_count', 0, false));
            sizeArr.push(getValue('number', doc, 'size', 0, false));
            ownerNameLength.push(getValue('number', doc, 'processedData.helpers.ownerInfo.length', 8.8388, false));
            repoNameLength.push(getValue('number', doc, 'processedData.helpers.repoInfo.length', 13.1932, false));
            imageCountLength.push(getValue('object', doc, 'processedData.helpers.imageArray', 2.0015, true));
            descriptionLength.push(getValue('string', doc, 'description', 56.5741, true));
            readmeSectionCount.push(getValue('number', doc, 'processedData.helpers.sectionCount.headerSum', 5.4142, false));
        });
    }

});
