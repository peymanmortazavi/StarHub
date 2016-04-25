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

        cursor.each(function(err, doc){
            // if (doc === null) {
            //     // console.log(sizeArr)
            //     // console.log(stargazersArr)
            //     console.log('correlation between size and stargazers is: ' + correlation(sizeArr, stargazersArr));
            //     db.close();
            // }
            // sizeArr.push(_.get(doc, 'size'));
            // stargazersArr.push(_.get(doc, 'stargazers_count'));
            // ownerNameLength.push(_.get(doc, 'processedData.helpers.ownerInfo.length'));
            repoNameLength.push(_.get(doc, 'processedData.helpers.repoInfo.length'));
            console.log(repoNameLength)
        });
    }

});
