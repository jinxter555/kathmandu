const mongoose = require('mongoose');
// const WorkProject= require('./WorkProject');
const OPStatus = require('../op_status');
const util = require('util');
const Schema = mongoose.Schema;

// Create Schema
const WorkProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: OPStatus.not_started
  },
  WorkProgramOwner:  {type : Schema.Types.ObjectId, ref: 'workentities' }
});
WorkProgramSchema.index({name: 1, WorkProgramOwner: 1}, {unique: true});
WorkProgramSchema.index({description: 1}, {unique: false});


WorkProgramSchema.statics.WorkProgram = async function(args) {
  workProgram = await WorkProgram.findOneAndUpdate({name: args.name}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })
  return workProgram;
}

WorkProgramSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("program: " + util.inspect(this, null, 4))
  console.log("\n");
}

module.exports = WorkProgram = mongoose.model('WorkPrograms', WorkProgramSchema);
