var master = require('./helpers/master.js');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var sleep = require('sleep');

var currentStat = {total: 0, processed: 0, errors: 0, _c: 0};
var errors = []

var addError = function (repo, error) {
    repo = repo || {id: "unknown", html_url: "unknown"};
    errors.push({id: repo.id, repo_url: repo.html_url, error, error});
    console.error(error);
    currentStat.errors += 1;
}

var processRepository = function (cursor, db) {
    cursor.hasNext( (err, r) => {
        if (!r) {
            console.log(r)
            console.log(err)
            console.log('DONE')
            console.log(JSON.stringify(currentStat, null, 2));
            process.exit()
        }
        currentStat._c += 1;

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
                        if (error.statusCode == 404) {
                            console.log("[NOT FOUND] 404; HTTP")
                    db.updateOne(
                        {"id": repoInfo.id}, {$set: {processedData: {found: false}}},
                        function (err, s) {
                            processRepository(cursor, db);
                        });
                        }
                        return;
                    }

                    try {
                        db.updateOne(
                            {"id": repoInfo.id}, {$set: {processedData: result.body}}, 
                            function(err, s) {
                                if (err != null) {
                                    addError(repoInfo, err);
                                } else {
                                    currentStat.processed += 1;
                                    console.log('[OK] Successfully processed.');
                                }
                                var rateRemaining = parseInt(result.headers['x-ratelimit-remaining']);
                                console.log('API Limit: ' + rateRemaining + "; " + (currentStat.processed + currentStat.errors) + "/" + currentStat.total);
                                if (rateRemaining <= 2) {
                                    console.log('Reached API Limit');
                                    var timeToStart = parseFloat(result.headers['x-ratelimit-reset']); 
                                    var now = moment(Date.now(), 'x').format('X');
                                    var timeDelta = timeToStart - now + 2;
                                    console.log("Sleeping for " + timeDelta);
                                    sleep.sleep(timeDelta);
                                }
                                processRepository(cursor, db);
                            }
                        );
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

    });
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

    var cursor = repoCollection.find({"processedData" : { $exists: false }}, {timeout: false}, {}).addCursorFlag('noCursorTimeout', true);
    cursor.count(function(err, count) {
        currentStat.total = count;
        console.log('TOTAL: ' + count);
        processRepository(cursor, repoCollection);
    });
});
