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

/*WorkProgramSchema.pre('remove', function(next) {
  console.log("WorkProgramSchema: in pre-remove")
  console.log(this.model(WorkProject));
  // this.model('WorkProjects').remove({ workProgram: this._id }, next);
});
*/

/*
WorkProgramSchema.pre('findOneAndRemove', function(next) {
  console.log("WorkProgramSchema: in pre-findOneAndRemove")
  this.model('WorkProjects').find({ workProgram: this._id }, function(projects, err) {
    console.log("projects")
    console.dir(projects)
  });
  next();
});
*/


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
