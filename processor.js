var master = require('./helpers/master.js');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var sleep = require('sleep');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var masterAsync = Promise.promisify(master);

var currentStat = {total: 0, processed: 0, errors: 0, _c: 0};
var errors = []

var addError = function (repo, error) {
    repo = repo || {id: "unknown", html_url: "unknown"};
    errors.push({id: repo.id, repo_url: repo.html_url, error: error});
    console.error(error);
    currentStat.errors += 1;
}

var processCursor = (cursor, db, cb) => {

    cursor.toArray( async((err, data) => {
        for (var i = 0; i < data.length; i++) {
            var repo = data[i];
            console.log("Processing repository: " + repo.html_url);
            try {
                var result = await(masterAsync(repo.html_url));
                db.updateOne(
                    {"id": repo.id}, { $set: { processedData: result.body }}, 
                    function(err, s) {
                        if (err != null) {
                            addError(repo, err);
                        } else {
                            currentStat.processed += 1;
                            console.log('[OK] Successfully processed.');
                        }
                    }
                    );
                processApiLimit(result.headers)
            } catch (error) {
                addError(repo, error);
                if (error.statusCode == 404) {
                    console.log("[NOT FOUND] 404");
                    db.updateOne({"id": repo.id},
                            {$set: {processedData: {found: false}}});
                }
                if (error.headers != null) {
                    processApiLimit(error.headers);
                }
            }
        }
        cb(null, null);
    }));
}

function processApiLimit(headers) {
    var rateRemaining = parseInt(headers['x-ratelimit-remaining']);
    console.log('API Limit: ' + rateRemaining + "; " + (currentStat.processed + currentStat.errors) + "/" + currentStat.total);
    if (rateRemaining <= 2) {
        console.log('Reached API Limit');
        var timeToStart = parseFloat(headers['x-ratelimit-reset']); 
        var now = moment(Date.now(), 'x').format('X');
        var timeDelta = timeToStart - now + 2;
        console.log("Sleeping for " + timeDelta);
        sleep.sleep(timeDelta);
    } else {
//        sleep.sleep(1);
    }
}

var url = 'mongodb://localhost:27017/github';
MongoClient.connect(url, async ((err, db) => {

    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to database, processing now...');

    var repoCollection = db.collection('repositories');
    var processedCollection = db.collection('processed');
    var threshold = 200;

    var processAsync = Promise.promisify(processCursor);

    repoCollection.count({"processedData": { $exists: false }}, async( (err, count) => {
        currentStat.total = count;
        var remaining = count;
        while(true) {
            console.log(JSON.stringify(currentStat, null, 2));
            console.log("Remaining: " + remaining);
            if (remaining < threshold) {
                threshold = remaining;
            }
            if (threshold == 0) {
                console.log('DONE');
                return;
            }
            var tempC = repoCollection.find({}, {timeout: false}, {limit: threshold}).addCursorFlag('noCursorTimeout', true);
            await(processAsync(tempC, repoCollection));
            console.log('Done with this iteration');
            sleep.sleep(5);
            remaining -= threshold;
        }
     }))

}));
