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
        var cursor = repoCollection.find({},{name:1, stargazers_count:1, _id:0});
        var jsonObject = [];
        console.log('[');
        var repohasNumbers = false;
        cursor.each(function(err, doc){
            if(doc.name.match(/\d+/g)!=null)
            repohasNumbers = true;
            else
            repohasNumbers = false;
            console.log('{\"RepoNameHasNumbers\": \"%s\", \"StarGazersCount\":\"%d\"},',repohasNumbers,doc.stargazers_count);
            jsonObject.push(doc);
        });
        console.log(']');
    }
});