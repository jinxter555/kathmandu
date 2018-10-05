const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const MongoDB = require('../openMongo');
const util = require('util');


class Todo {
  constructor(task_args, work_process_args, project_args, program_args) {
    return WorkTask.WorkTask(task_args, work_process_args, project_args, program_args)
      .then(workTask => {
        this.workTask = workTask;
        return this;
      });
  }
  static async Program(program_args) {
    return await WorkProgram.WorkProgram(program_args);
  }
  async addNextTodo(args) {
    todo = await task2_found.addNextTask(task3_args);
    return todo
  }
  static hello() {
    console.log("hello");
  }
}

module.exports = Todo;
