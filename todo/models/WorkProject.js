const mongoose = require('mongoose');
const OPStatus = require('../op_status');
const util = require('util');
const WorkProgram = require('./WorkProgram');
const Schema = mongoose.Schema;

// Create Schema
const WorkProjectSchema = new Schema({
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
  workProgram: {type : Schema.Types.ObjectId, ref: 'WorkPrograms' },
});
WorkProjectSchema.index({name: 1, workProgram: 1}, {unique: true});

WorkProjectSchema.statics.WorkProject = async function(project_args, program_args) {
  workProgram = await WorkProgram.WorkProgram(program_args)
  args = Object.create( project_args ); // prevent this function from modifying projects_args
  args.workProgram = workProgram;

  workProject = await WorkProject.findOneAndUpdate({name: args.name, workProgram: args.workProgram}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })

  return workProject;
}

WorkProjectSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("project: " + util.inspect(this, null, 4))
  console.log("\n");
}

module.exports = WorkProject = mongoose.model('WorkProjects', WorkProjectSchema);
