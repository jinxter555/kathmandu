const WorkTask = require('../models/WorkTask');
const WorkProcess = require('../models/WorkProcess');
const TodoProcess = require('./TodoProcess');

// work_process is the single name for processes
// process is a reserved.

class TodoTask extends WorkTask {
  constructor(task_obj) {
    super(task_obj);
    return this;
  }

  static async createOrUpdate(task_args, process_args, project_args, program_args) {
    task = await WorkTask.WorkTask(task_args, process_args, project_args, program_args)
      .then(task => {
        return task;
      });
    return new TodoTask(task);
  }

  static async findById(id) {
    let task = await WorkTask.findById(id, function(err, task) {
      return task;
    });
    return new TodoTask(task);

  }
  static async findByProcessId(processId) {
    let tasks = await WorkTask.find({workProcess: processId}, function(err, tasks) {
      return tasks;
    });
    return tasks.map(task => new TodoTask(task))
  }

  static async findByArgs(task_args, process_args, project_args, program_args) {
    let work_process = await TodoProcess.findByArgs(process_args, project_args, program_args);

    if(work_process === null) { return null}
    let task = await WorkTask.findOne({description: task_args.description, workProcess: work_process._id},
      function(err, task) {
        return task;
    });
    return new TodoTask(task);
  }

  static async createOrUpdateByProcessId(processId, task_args) {
    let workProcess = await TodoProcess.findById(processId) 
    args = Object.create( task_args ); // prevent this function from modifying projects_args
    args.workProcess = workProcess    

    if(args.workProcess === null) {
      return null;
    }
    task =  await WorkTask.findOneAndUpdate({description: args.description, workProcess: args.workProcess}, args, {
      upsert: true,
      new: true,
      overwrite: true, function(err, model) { }
    })
    return new TodoTask(task)
  }
  //static async deleteById(id) {

  static async deleteById(id) {
    return await WorkProcess.findByIdAndDelete(id);
  }
}
module.exports = TodoTask;