const WorkProgram = require('../models/WorkProgram');
// const TodoProject = require('./TodoProject'); // at bottom of file because of circular require

class TodoProgram {
  constructor(program_args) {
    return WorkProgram.WorkProgram(program_args)
      .then(program => {
        return program;
      });
  }
  static async createOrUpdate(program_args) {
    return await WorkProgram.WorkProgram(program_args);
  }
  static async findById(id) {
    return await WorkProgram.findById(id, function(err, program) {
      return program;
    });
  }
  static async findByName(name) {
    return await WorkProgram.findOne({name: name}, function(err, program) {
      return program;
    });
  }
  static async findByArgs(args) {
    return await WorkProgram.findOne({name: args.name}, function(err, program) {
      return program;
    });
  }
  static async deleteById(id) {
    let projects = await TodoProject.findByProgramId(id)
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
const TodoProject = require('./TodoProject');