const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');  
const TodoProgram= require('./TodoProgram');

class TodoProject extends WorkProject {
  constructor(project_obj) {
    super(project_obj); 
    return this;
  }
  static async createOrUpdate(project_args, program_args) {
    // return await WorkProject.WorkProject(project_args, program_args);
    return WorkProject.WorkProject(project_args, program_args)
      .then(project => {
        return new TodoProject(project);
      });
  }
  static async findById(id) {
    return await WorkProject.findById(id, function(err, project) {
      return new TodoProject(project);
    });
  }

  static async findByProjectNameAndProgramId(name, programId) {
    return await WorkProject.findOne({name: name, workProgram: programId}, function(err, project) {
      return new TodoProject(project);
    });
  }
  static async findByArgs(project_args, program_args) {
    let program = await TodoProgram.findByArgs(program_args);

    return await WorkProject.findOne({name: project_args.name, workProgram: program._id},
      function(err, project) {
        return new TodoProject(project);
    });
  }

  static async findByProgramId(programId) {
    return await WorkProject.find({workProgram: programId}, function(err, projects) {
      return projects.map(project => new TodoProject(project));
    });
  }

  static async createOrUpdateByProgramId(programId, project_args) {
    let args = Object.create( project_args ); // prevent this function from modifying projects_args
    args.workProgram = await TodoProgram.findById(programId)
    if(args.workProgram === null) {
      return null;
    }
    let project = await WorkProject.findOneAndUpdate({name: args.name, workProgram: args.workProgram._id}, args, {
      upsert: true,
      new: true,
      overwrite: true, function(err, model) { }
    })
    return new TodoProject(project)
  }
  static async findProcessesByProjectId(id) {
    return await WorkProcess.find({workProject: id}, function(err, processes) {
      return processes;
    });
  }
  //static async deleteById(id) {
  //  return await WorkProject.findByIdAndDelete(id);
  //}
  static async deleteById(id) {
    let  work_processes = await TodoProject.findProcessesByProjectId(id)
    if(work_processes.length !== 0)  {
      let work_project = await TodoProject.findById(id)
      console.error("Can't delete WorkProject: (" 
        + work_project.name + 
        ') because it still has the following process(es)')
      work_processes.forEach(function(work_process) {
        console.error(work_process.name);
      });
      throw new Error('WorkProject not empty still referenced by process(es)');
    }
    return await WorkProject.findByIdAndRemove(id);
  }

}

module.exports = TodoProject;