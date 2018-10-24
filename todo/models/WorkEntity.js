const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const baseOptions = {
  // our discriminator key, could be anything
  discriminatorKey: '__type',
  // the name of our collection
  collection: 'workentities',
};

const WorkEntity = mongoose.model('workentities', new mongoose.Schema({
  }, baseOptions,
));

module.exports = {WorkEntity}