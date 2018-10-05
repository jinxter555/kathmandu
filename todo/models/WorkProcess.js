const mongoose = require('mongoose');
const WorkProject = require('./WorkProject');
const OPStatus = require('../op_status');
const util = require('util');
const Schema = mongoose.Schema;

// Create Schema
const WorkProcessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: OPStatus.not_started
  },
  workProject: {type : Schema.Types.ObjectId, ref: 'WorkProjects' },
});

WorkProcessSchema.index({name: 1, workProject: 1}, {unique: true});


WorkProcessSchema.methods.markActivated = function() {
  this.status =  OPStatus.activated;
}

WorkProcessSchema.statics.WorkProcess = async function(args, project_args, program_args) {
  project = await WorkProject.WorkProject(project_args, program_args).catch(e => {console.log(e)});
  args.workProject = project

  workProcess = await WorkProcess.findOneAndUpdate({name: args.name, workProject: args.workProject}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  }).catch((err)  => {
    console.log(err)
  });

  return workProcess;
}


WorkProcessSchema.methods.markCompleted = function() {
  this.status =  OPStatus.completed;
}

WorkProcessSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("Workprocess: " + util.inspect(this, null, 4))
  console.log("\n");
}


module.exports = WorkProcess = mongoose.model('WorkProcesses', WorkProcessSchema);
