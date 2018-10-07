const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const MongoDB = require('../openMongo');
const util = require('util');


class TodoProject {
  constructor(program_args, project_args) {
    return WorkProject.WorkProject(project_args, program_args)
      .then(workProject => {
        return workProject;
      });
  }
  static async createOrUpdate(project_args, program_args) {
    return await WorkProject.WorkProject(project_args, program_args);
  }
  static async findById(id) {
    return await WorkProject.findById(id, function(err, project) {
      return project;
    });
  }
  static async findByProgramId(programId) {
    return await WorkProject.find({workProgram: programId}, function(err, projects) {
      return projects;
    });
  }
  static async deleteById(id) {
    return await WorkProject.findByIdAndDelete(id);
  }
  static findAll() {
    return WorkProgram.find();
  }
}

module.exports = TodoProject;