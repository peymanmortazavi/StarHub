var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hackcave.dynu.com:27017/github';
var correlation = require('./correlation');

module.exports = function(arg1) {
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

            var jsonObject = [];

            cursor.each(function(err, doc){
                // console.log('doc: ' + JSON.stringify(doc))
                if (doc === null) {
                    correlation(arg1, jsonObject);
                    db.close();
                }
                jsonObject.push(doc);
                    console.log(doc)
            });
        }

    });
}
