var dataCollector = require('./dataCollector.js');
var MongoClient = require('mongodb').MongoClient;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentStat = {daysLeft: 0, totalDays: 0, totalErrors: 0, totalRecords: 0};
function handleProgress (info) {
    if (info.type == 'error') {
        currentStat.totalErrors += 1;
    } else if (info.type == 'stats') {
        currentStat.totalDays = info.total;
        currentStat.daysLeft = info.left;
        currentStat.totalRecords = info.count;
    }
    if (info.type != 'stats') {
        io.emit('log', info);
    }
    io.emit('stats', currentStat);
}

var url = 'mongodb://localhost:27017/github';
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to database, starting job now...');

    dataCollector.startJob(db.collection('repositories'), handleProgress);
});

// HTTP Connection
app.get('/', function(req, res) {
    res.sendfile('public/status.html');
});

io.on('connection', function(socket) {
    socket.emit('stats', currentStat);
});

http.listen(80, function () {
    console.log('Listening on *:80');
});
