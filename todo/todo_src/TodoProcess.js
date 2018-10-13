const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const TodoProject= require('./TodoProject');

// work_process is the single name for processes
// process is a reserved.

class TodoProcess extends WorkProcess {
  constructor(process_obj) {
    super(process_obj);
    return this;
  }

  static async createOrUpdate(process_args, project_args, program_args) {
    return WorkProcess.WorkProcess(process_args, project_args, program_args)
      .then(work_process => {
        return new TodoProcess(work_process);
      });
  }

  static async findById(id) {
    return await WorkProcess.findById(id, function(err, work_process) {
      return new TodoProcess(work_process);
    });
  }
  static async findByProjectId(projectId) {
    return await WorkProcess.find({workProject: projectId}, function(err, processes) {
      return new TodoProcess(processes);
    });
  }

  static async findByArgs(process_args, project_args, program_args) {
    let project = await TodoProject.findByArgs(project_args, program_args);

    if(project === null) { return null}
    let work_process = await WorkProcess.findOne({name: process_args.name, workProject: project._id},
      function(err, work_process) {
        return work_process;
    });
    return new TodoProcess(work_process);
  }

  static async createOrUpdateByProjectId(projectId, process_args) {
    var args = Object.create( process_args ); // prevent this function from modifying projects_args
    args.workProject = await TodoProject.findById(projectId)
    if(args.workProject === null) {
      return null;
    }
    work_process =  await WorkProcess.findOneAndUpdate({name: args.name, workProject: args.workProject._id}, args, {
      upsert: true,
      new: true,
      overwrite: true, function(err, model) { }
    })
    return new TodoProcess(work_process);
  }
  static async findTasksByProcessId(id) {
    return await WorkTask.find({workProcess: id}, function(err, tasks) {
      return tasks;
    })
  }
  //static async deleteById(id) {

  static async deleteById(id) {
    // return await WorkProcess.findByIdAndDelete(id);
    let  tasks = await TodoProcess.findTasksByProcessId(id)

    if(tasks.length !== 0)  {
      let work_process = await TodoProcess.findById(id)
      console.error("Can't delete WorkProcess: (" 
        + work_process.name + 
        ') because it still has the following process(es)')
      tasks.forEach(function(task) {
        console.error(task.name);
      });
      throw new Error('WorkProcess not empty still referenced by process(es)');
    }
    return await WorkProcess.findByIdAndRemove(id);
  }

  async findChildrenTasks() {
    return await TodoProcess.findTasksByProcessId({workProcess: this._id}, function(err, tasks) {
      return tasks;
    });
  }
}
module.exports = TodoProcess;