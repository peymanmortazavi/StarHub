'use strict'
var arg1 = 'processedData.helpers';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var correlation = require('./correlation');

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
    }
    else {
        var repoCollection = db.collection('repositories');
        var findObj = {
            stargazers_count:1,
            _id:0
        };
        findObj[arg1] = 1;
        var cursor = repoCollection.find({},findObj);
        // console.log(findObj)

        var jsonObject = [];

        let count = 0;
        // console.log(arg1)
//         correlation('sectionCount', [{ stargazers_count: 16, sectionCount: 5 },
// { stargazers_count: 16, sectionCount: 0 },
// { stargazers_count: 14, sectionCount: 7 }]);
        cursor.each(function(err, doc){
          try {
            // console.log('doc: ' + JSON.stringify(doc.processedData.helpers.repoInfo.length))
            if (doc === null) {
                console.log('closing db')
                correlation('sectionCount', jsonObject);
                db.close();
            }

            count += 1;
            if (doc.processedData.helpers.readmeIsMarkdown) {
                let toPush = {}

                toPush.stargazers_count = doc.stargazers_count;
                toPush['sectionCount'] = doc.processedData.helpers.sectionCount.headerSum;
                // console.log(toPush)
                // console.log(toPush)
                jsonObject.push(toPush);
            } else {
                // console.log(doc.processedData.helpers.readmeIsMarkdown)
                console.log(count + '\n');

            }
          } catch (err) {

          }
        });
    }

});
