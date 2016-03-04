var github = require('octonode');
var client = github.client(process.env.STARHUB_DAWSON);

client.get('/repos/angular/angular/stargazers', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
