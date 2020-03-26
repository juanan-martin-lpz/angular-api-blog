var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/testApp';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', () => {});

module.exports = mongoose;
