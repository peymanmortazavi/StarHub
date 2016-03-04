var got = require('got');

// Change this to be the total amount of pages you want to loop over.
var totalPageLength = 5;

for (var page = 1; page <= totalPageLength; page++) {
  got('https://api.github.com/search/repositories?q=stars:%3E5&page=' + page)
  .then(response => {
    console.log(response.body + ', ');
  })
  .catch(error => {
    console.log(error.response.body);
  });
}
