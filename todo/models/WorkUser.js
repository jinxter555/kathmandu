const mongoose = require('mongoose');
const Project = require('./Project');
const OPStatus = require('../op_status');
const util = require('util');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  address: {
    type: String,
  }
});

// Create Schema
const WorkUserSchema = new Schema({
  username: {
    type: String,
    //required: true
  },
  password: {
    type: String,
    //required: true
  },
  email: {
    type: String,
    //required: true
  }
});


WorkUserSchema.index({username: 1, project: 1}, {unique: true});


WorkProcessSchema.methods.markActivated = function() {
  this.status =  OPStatus.activated;
}

WorkProcessSchema.statics.WorkProcess = async function(args, project_args, program_args) {
  project = await Project.Project(project_args, program_args).catch(e => {console.log(e)});
  args.project = project

  workProcess = await WorkProcess.findOneAndUpdate({name: args.name}, args, {
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
