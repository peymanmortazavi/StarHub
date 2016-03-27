const master = require('./master.js');

master('https://github.com/dawsonbotsford/swim', (resp) => {
  console.log('resp: ' + JSON.stringify(resp));
});
