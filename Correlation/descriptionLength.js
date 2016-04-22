var arg1 = 'description';

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

        cursor.each(function(err, doc){
          try {
            // console.log('doc: ' + JSON.stringify(doc.description.length.length))
            if (doc === null) {
                correlation(arg1, jsonObject);
                db.close();
            }
            var toPush = {}
            // console.log(doc)
            toPush.stargazers_count = doc.stargazers_count;
            toPush[arg1] = doc.description.length || 0;
            jsonObject.push(toPush);
            // console.log(jsonObject)
          } catch (err) {

          }
        });
    }

});
