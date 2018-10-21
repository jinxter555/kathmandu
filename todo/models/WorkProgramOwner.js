const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const baseOptions = {
  // our discriminator key, could be anything
  discriminatorKey: '__type',
  // the name of our collection
  collection: 'WorkProgramOwner',
};

const WorkProgramOwner = mongoose.model('WorkProgramOwner', new mongoose.Schema({
  }, baseOptions,
));

module.exports = {WorkProgramOwner}