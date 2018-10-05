
const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');
const util = require('util');


var task1, task2, task1_found, task2_found, task3, task3_found,
  program_args = { name: 'my program 1', description: faker.lorem.sentence()},
  project_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

describe('Task test',  () => {

  beforeAll(async () => {
    MongoDB.open('dev');
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkTask.find({null: null});
  });

  // helper function to define the tasks
  // if the tasks having been found return them
  // otherwise look them up in the database
  //
  async function findTask(args) {
    task_found = await WorkTask
      .findOneAndUpdate(args, {}, {new: false})
      .populate({
        path: 'workProcess',
        populate: {
          path: 'workProject',
          populate: {
            path: 'workProgram'
          }
        }
      });
    return task_found;
  }

  async function findTask1() {
    if(typeof task1_found == 'object'
      && task1_found.constructor.modelName == 'worktasks') {
      return task1_found;
    }
    task1_found = await findTask(task1_args);
  }

  async function findTask2() {
    if(typeof task2_found == 'object'
      && task1_found.constructor.modelName == 'worktasks') {
      return task2_found;
    }
    task2_found = await findTask(task2_args);
  }

  async function findTask3() {
    if(typeof task3_found == 'object'
      && task1_found.constructor.modelName == 'worktasks') {
      return task3_found;
    }
    task3_found = await findTask(task3_args);
  }

  //-------------------------  Test suites here
  test('Able to find or create a new task using Task function', async() => {
    jest.setTimeout(5000);

    task1  = await WorkTask.WorkTask(task1_args, work_process_args, project_args, program_args);
    await findTask1();

    expect(task1._id).toMatchObject(task1_found._id);
    expect(work_process_args.name).toMatch(task1_found.workProcess.name);
  })

  test('Able to find or create a new task using Task function using workProcess object', async() => {
    jest.setTimeout(500);

    task2  = await WorkTask.WorkTask(task2_args, task1_found.workProcess);
    await findTask2();

    expect(task2._id).toMatchObject(task2_found._id);
    expect(work_process_args.name).toMatch(task2_found.workProcess.name);
  })

  test('Able to find or create a new task Task.addNextTask', async() => {
    task3  = await task2_found.addNextTask(task3_args);
    await findTask3();

    expect(task3._id).toMatchObject(task3_found._id);
    expect(work_process_args.name).toMatch(task3_found.workProcess.name);
    //console.log(task3_found);
    //console.log(task3_found.workProcess.project.program.name);
  })

  test('Able to find or create another project/aka project2 using the same tasks args  ', async() => {
    jest.setTimeout(5000);

    task1  = await WorkTask.WorkTask(task1_args, work_process_args, project2_args, program_args);
    //await findTask1();

    //expect(task1._id).toMatchObject(task1_found._id);
    // expect(work_process_args.name).toMatch(task1_found.workProcess.name);
  })

});
