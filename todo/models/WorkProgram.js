const mongoose = require('mongoose');
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
  opStatus: {
    type: Number,
    default: OPStatus.not_started
  },
});

WorkProgramSchema.statics.WorkProgram = async function(args) {
  workProgram = await WorkProgram.findOneAndUpdate({name: args.name}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })
  return workProgram;
}

WorkProgramSchema.methods.markActivated = function() {
  this.opStatus =  OPStatus.activated;
}

WorkProgramSchema.methods.markCompleted = function() {
  this.opstatus =  OPStatus.completed;
}

WorkProgramSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("program: " + util.inspect(this, null, 4))
  console.log("\n");
}

module.exports = WorkProgram = mongoose.model('WorkPrograms', WorkProgramSchema);
