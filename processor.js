var master = require('./helpers/master.js');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var sleep = require('sleep');

var currentStat = {total: 0, processed: 0, errors: 0};
var errors = []

var addError = function (repo, error) {
    repo = repo || {id: "unknown", html_url: "unknown"};
    errors.push({id: repo.id, repo_url: repo.html_url, error, error});
    console.error(error);
    currentStat.errors += 1;
}

var processRepository = function (cursor, db) {
    cursor.nextObject(function(err, repoInfo) {
        if (err != null) {
            // keep track of the error and move on
            currentStat.errors += 1;
            processRepository(cursor, db);
            console.error('could not get the next object in cursor');
            console.error(err);
            addError(null, err);
            return;
        }
        if (repoInfo == null) {
            // We're done
            console.log('DONE');
            console.log(JSON.stringify(errors, null, 2));
            console.log(JSON.stringify(currentStat, null, 2));
            return;
        }
        // validate it
        if(repoInfo.html_url == null || repoInfo.html_url === '') {
            errors.push({id: repoInfo.id, repo_url: repoInfo.html_url, error: "there is no html url"});
            currentStat.errors += 1;
            console.error("no html url");
            processRepository(cursor, db);
            return;
        }
        console.log('Processing: ' + repoInfo.html_url);
        try {
            master(repoInfo.html_url, function(error, result) {

                if (error != null) {
                    addError(repoInfo, error);
                    processRepository(cursor, db);
                    return;
                }

                try {
                    db.updateOne({"id": id}, {$set: {processedData: result.body}});
                    console.log('[OK] Successfully process.');
                    currentStat.processed += 1;
                    var rateRemaining = parseInt(result.headers['x-ratelimit-remaining']);
                    console.log('API Limit: ' + rateRemaining);
                    if (rateRemaining < 2) {
                        console.log('Reached API Limit');
                        timeToStart = parseFloat(response.headers['x-ratelimit-reset']); 
                        var now = moment(Date.now(), 'x').format('X');
                        var timeDelta = timeToStart - now + 2;
                        console.log("Sleeping for " + timeDelta);
                        sleep.sleep(timeDelta);
                    }
                    processRepository(cursor, db);
                } catch (ex) {
                    addError(repoInfo, ex);
                    processRepository(cursor, db);
                }
            });
        } catch (ex) {
            addError(repoInfo, ex);
            processRepository(cursor, db);
        }
    })
}

var url = 'mongodb://localhost:27017/github';
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to database, processing now...');

    var repoCollection = db.collection('repositories');
    var processedCollection = db.collection('processed');

    var cursor = repoCollection.find({}, {}, {});
    cursor.count(function(err, count) {
        currentStat.total = count;
        processRepository(cursor, processedCollection);
    });
});
