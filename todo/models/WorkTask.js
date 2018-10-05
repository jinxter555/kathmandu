const mongoose = require('mongoose');
const WorkProcess = require('./WorkProcess');
const OPStatus = require('../op_status');
const util = require('util');
const Schema = mongoose.Schema;

// Create Schema
const WorkTaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: OPStatus.not_started
  },
  workProcess: {type : Schema.Types.ObjectId, ref: 'WorkProcesses' },
});

WorkTaskSchema.index({description: 1, workProcess: 1}, {unique: true});


/*
 * creates a new task based on Arguments
 *  if work_process_args is an object of WorkProcess then use it directly
 */
WorkTaskSchema.statics.WorkTask = async function(args, work_process_args, project_args, program_args) {
  //if(typeof work_process_args == 'object' &&
  if(work_process_args.constructor.modelName == 'WorkProcesses') {
    workProcess = work_process_args;
  }  else {
    workProcess = await WorkProcess.WorkProcess(work_process_args, project_args, program_args)
  }
  args.workProcess = workProcess

  task = await WorkTask.findOneAndUpdate({
    description: args.description,
    workProcess: workProcess}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })

  return task;
}
WorkTaskSchema.methods.addNextTask = async function(args) {
  args.workProcess = this.workProcess

  task = await WorkTask.findOneAndUpdate({description: args.description}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })

  return  task;
}

WorkTaskSchema.methods.markActivated = function() {
  this.status =  OPStatus.activated;
}

WorkTaskSchema.methods.markCompleted = function() {
  this.status =  OPStatus.completed;
}

WorkTaskSchema.methods.selfInspect = function() {
  console.log("--- self inspect---");
  console.log("task: " + util.inspect(this, null, 4))
  console.log("\n");
}


module.exports = WorkTask = mongoose.model('WorkTasks', WorkTaskSchema);
