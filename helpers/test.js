const master = require('./master.js');
function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

master('https://github.com/dawsonbotsford/swim', (resp) => {
  prettyJSON(resp);
});
