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
                size: 1,
                stargazers_count:1,
                _id:0
            };
            var cursor = repoCollection.find({},findObj);

            var jsonObject = [];

            cursor.each(function(err, doc){
                if (doc === null) {
                    correlation(jsonObject);
                    db.close();
                }
                jsonObject.push(doc);
            });
        }

    });
}
