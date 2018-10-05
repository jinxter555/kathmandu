const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const MongoDB = require('../openMongo');
const util = require('util');


class TodoProgram {
  constructor(program_args) {
    return WorkProgram.WorkProgram(program_args)
      .then(program => {
        return program;
      });
  }
  static async WorkProgram(program_args) {
    return await WorkProgram.WorkProgram(program_args);
  }
  static async WorkProgramById(id) {
    return await WorkProgram.findById(id, function(err, program) {
      return program;
    });
  }
  static async WorkProgramDeleteById(id) {
    return await WorkProgram.findByIdAndDelete(id);
  }
  static WorkPrograms() {
    return WorkProgram.find();
  }
}

module.exports = TodoProgram;
