const WorkProgram = require('../models/WorkProgram');
const WorkProject = require('../models/WorkProject');

class TodoProgram extends WorkProgram {
  constructor(program_obj) {
    super(program_obj); 
    return this;
  }
  static async createOrUpdate(program_args) {
    let program = await WorkProgram.WorkProgram(program_args)
      .then(program => {
        return program; // added
      });
    return new TodoProgram(program); // added
  }
  static async findById(id) {
    let program = await WorkProgram.findById(id, function(err, program) {
      return program;
    });
    return new TodoProgram(program);
  }
  static async findByName(name) {
    let program = await WorkProgram.findOne({name: name}, function(err, program) {
      return program;
    });
    return new TodoProgram(program);
  }

  // this should be called from outside of this TodoProgram class
  static async findProjectsByProgramId(id) {  
    return await WorkProject.find({workProgram: id}, function(err, projects) {
      //return projects.map(project => new TodoProject(project));
      return projects;
    });
  }
  static async findByArgs(args) {
    let program = await WorkProgram.findOne({name: args.name}, function(err, program) {
      return program;
    });
    return new TodoProgram(program);
  }
  static async deleteById(id) {
    let projects = await TodoProgram.findProjectsByProgramId(id)
    if(projects.length !== 0)  {
      let program = await TodoProgram.findById(id)
      console.error("Can't delete WorkProgram: (" 
        + program.name + 
        ') because it still has the following project(s)')
      projects.forEach(function(project) {
        console.error(project.name);
      });
      throw new Error('WorkProgram not empty still referenced by projects');
    }
    // return await WorkProgram.findByIdAndDelete(id);
    return await WorkProgram.findByIdAndRemove(id);
  }
  static findAll() {
    return WorkProgram.find();
  }
}

module.exports = TodoProgram;