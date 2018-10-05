const mongoose = require('mongoose');
const path = require('path');


// DB Config
// const db = require('./config/keys').mongoURI;


// Connect to Mongo
exports.open = function(env=null) {
  var db;

  switch(env) {
  case  null:  // null is roduction
    db = require('./config/keys').mongoURI;
    break;
  case 'test':
    db = require('./config/keys').mongoURI_TEST;
    break;
  case  'dev':
    db = require('./config/keys').mongoURI_DEV;
    break;
  }

  mongoose
    .connect(db,  { useNewUrlParser: true } )
    .then(() => console.log('MongoDB Connected to: env ' + env))
    .catch(err => console.log(err));
}

exports.UCI = function() {
  mongoose.set('useCreateIndex', true);
}

exports.close_test = function(done) {
  mongoose.disconnect(done)
}

exports.close = function() {
  mongoose.connection.close()
}

exports.mongoose = mongoose;
