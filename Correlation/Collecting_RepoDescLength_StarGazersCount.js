var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var async = require('async');

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return;
    }
    else {
        //console.log('Connection established to', url);

        var repoCollection = db.collection('repositories');
        var cursor = repoCollection.find({},{description:1, stargazers_count:1, _id:0});
        var jsonObject = [];
        console.log('[');
        var len = 0;
        cursor.each(function(err, doc){
            if(doc.description==null)
            len = 0;
            else
            len = doc.description.length;
            console.log('{\"RepositoryDescriptionLength\": %d, \"StarGazersCount\":%d},',len,doc.stargazers_count);
            jsonObject.push(doc);
        });
        console.log(']');
    }
});