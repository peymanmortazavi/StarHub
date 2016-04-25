'use strict'
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var correlation = require('./correlation.js');
const _ = require('lodash');

const f1  = 'stargazers_count';
const f2  = 'size';
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

        let sizeArr = [];
        let stargazersArr = [];
        let ownerNameLength = [];
        let repoNameLength = [];
        let imageCountLength = [];
        let descriptionLength = [];
        let readmeSectionCount = [];

        cursor.each(function(err, doc){
            if (doc === null) {
                // console.log('correlation between size and stargazers is: ' + correlation(sizeArr, stargazersArr));
                db.close();
                process.exit(1)
            }
            sizeArr.push(_.get(doc, 'size'));
            stargazersArr.push(_.get(doc, 'stargazers_count'));
            ownerNameLength.push(_.get(doc, 'processedData.helpers.ownerInfo.length'));
            repoNameLength.push(_.get(doc, 'processedData.helpers.repoInfo.length'));
            imageCountLength.push(_.get(doc, 'processedData.helpers.imageArray.length'));
            descriptionLength.push(_.get(doc, 'description', '').length);
            readmeSectionCount.push(_.get(doc, 'processedData.helpers.sectionCount.headerSum', 0));

        });
    }

});
