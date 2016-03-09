var dataCollector = require('./dataCollector.js');
var MongoClient = require('mongodb').MongoClient;

function handleProgress (info) {
    console.log(info);
}

var url = 'mongodb://localhost:27017/git-test';
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error(err);
        return;
    }

    dataCollector.startJob(db.collection('repositories'), handleProgress);
});
