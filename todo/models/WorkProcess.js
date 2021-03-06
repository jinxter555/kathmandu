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
    type: String,
    default: OPStatus.not_started
  },
  workProject: {type : Schema.Types.ObjectId, ref: 'WorkProjects' },
});

WorkProcessSchema.index({name: 1, workProject: 1}, {unique: true});
WorkProcessSchema.index({description: 1}, {unique: false});

WorkProcessSchema.statics.WorkProcess = async function(process_args, project_args, program_args) {
  workProject = await WorkProject.WorkProject(project_args, program_args).catch(e => {console.log(e)});
  args = Object.assign({}, process_args) // prevent this function from modifying process_args
  args.workProject = workProject;

  workProcess = await WorkProcess.findOneAndUpdate({name: args.name, workProject: args.workProject}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  }).catch((err)  => {
    console.log(err)
  });

  return workProcess;
}

WorkProcessSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("Workprocess: " + util.inspect(this, null, 4))
  console.log("\n");
}


module.exports = WorkProcess = mongoose.model('WorkProcesses', WorkProcessSchema);
