const WorkProcess = require('../models/WorkProcess');

// work_process is the single name for processes
// process is a reserved.

class TodoProcess {
  constructor(program_args, project_args, process_args) {
    return WorkProcess.WorkProcess(process_args, project_args, program_args)
      .then(work_process => {
        return work_process;
      });
  }

  static async createOrUpdate(process_args, project_args, program_args) {
    return await WorkProcess.WorkProcess(process_args, project_args, program_args);
  }

  static async findById(id) {
    return await WorkProcess.findById(id, function(err, work_process) {
      return work_process;
    });
  }
  static async findByProjectId(projectId) {
    return await WorkProcess.find({workProject: projectId}, function(err, processes) {
      return processes;
    });
  }

  static async createOrUpdateByProjectId(projectId, process_args) {
    return await WorkProcess.createOrUpdateByProjectId(projectId, process_args);
  }

  static async deleteById(id) {
    return await WorkProcess.findByIdAndDelete(id);
  }
}
module.exports = TodoProcess;