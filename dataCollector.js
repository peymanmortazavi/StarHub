var got = require('got');
var moment = require('moment');
var sleep = require('sleep');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

// Change this to be the total amount of pages you want to loop over.
var totalPageLength = 10;
var token = process.env.GTOKEN;

function calculateDaysLeft (date1, date2) {
    return moment.duration(date1.diff(date2)).asDays();
}

var startDate = moment("01012014", "MMDDYYYY");
var endDate = moment("01092014", "MMDDYYYY");
var currentDate = startDate;
var totalDays = calculateDaysLeft(endDate, startDate);

var timeToStart = moment().format('X');

var recordCount = 0;

var startJob = async(function (db, progressCallback) {

  while(currentDate.format("MMDDYYYY") != endDate.format("MMDDYYYY")) {
    for (var page = 1; page <= totalPageLength; page++) {
      progressCallback({type: 'stats', left: calculateDaysLeft(endDate, currentDate), total: totalDays, count: recordCount});
      var now = moment(Date.now(), 'x').format('X');
      if (now < timeToStart) {
        var timeDelta = timeToStart - now + 2;
        console.log('Sleeping for ' + timeDelta + " seconds.");
        progressCallback({type: 'sleep', text: '[INFO] Sleeping for ' + timeDelta + ' seconds.'});
        sleep.sleep(timeDelta);
      }

      var url = 'https://api.github.com/search/repositories?q=created:' + currentDate.format('YYYY-MM-DD') + '+stars:>=5&per_page=100&page=' + page;
      console.log(url);
      try {
        var response = await(got(url, {headers: {'Authorization': 'token ' + token}}));
        var rateRemaining = parseInt(response.headers['x-ratelimit-remaining']);
        if (rateRemaining < 2) {
          timeToStart = parseFloat(response.headers['x-ratelimit-reset']);
        }
        // todo: keep in the db
        console.log('[200] OK');
        var result = JSON.parse(response.body);
        if(result.items.length < 1) {
          progressCallback({type: 'info', text: '[204] NO CONTENT - ' + url});
          break;
        }
        progressCallback({type: 'info', text: '[200] OK - ' + url});
        recordCount += result.items.length;
        db.insertMany(result.items, function(err, result) {
            if (err) {
                console.error(err);
                progressCallback({type: 'error', text: '[ERROR] Could not insert to database: ' + url});
            }
        });
      } catch (error) {
        console.log(error);
        console.log(error.response.body);
        progressCallback({type: 'error', text: '[ERROR] - ' + error.response.body});
      }
    }

    currentDate = currentDate.add(1, 'day');
  }
})

module.exports.startJob = startJob;
