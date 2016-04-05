const master = require('./master.js');
function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

master('http://github.com/andris9/mailtrain', (resp) => {
// master('https://github.com/dawsonbotsford/swim', (resp) => {
// master('https://github.com/chalk/chalk', (resp) => {
// master('https://github.com/dawsonbotsford/inf', (resp) => {
  prettyJSON(resp);
});
