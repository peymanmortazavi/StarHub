var got = require('got');
var moment = require('moment');
var sleep = require('sleep');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

// Change this to be the total amount of pages you want to loop over.
var totalPageLength = 10;
var token = '098b291e97c230306829936401a38cdfd01e7ab6';

var startDate = moment("01012014", "MMDDYYYY");
var endDate = moment("01092014", "MMDDYYYY");
var currentDate = startDate;

var timeToStart = moment().format('X');

var getData = async(function () {

  while(currentDate.format("MMDDYYYY") != endDate.format("MMDDYYYY")) {
    for (var page = 1; page <= totalPageLength; page++) {
      var now = moment(Date.now(), 'x').format('X');
      if (now < timeToStart) {
        var timeDelta = timeToStart - now + 2;
        console.log('Sleeping for ' + timeDelta + " seconds.");
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
        var result = JSON.parse(response.body);
        if(result.items.length < 1) {
          break;
        }
        console.log(response.body);
        console.log('[200] OK');
      } catch (error) {
        console.log(error);
        console.log(error.response.body);
      }
    }

    currentDate = currentDate.add(1, 'day');
  }
})

getData()
