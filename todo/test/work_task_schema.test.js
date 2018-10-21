
const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');
const util = require('util');


var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  process1_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

describe('Task test',  () => {

  beforeAll(async () => {
    MongoDB.open('dev');

    WorkTask.remove({}, function(err) {
      //console.log('collection removed')
    });

    WorkProcess.remove({}, function(err) {
      //console.log('collection removed')
    });

    WorkProject.remove({}, function(err) {
      //console.log('collection removed')
    });

    WorkProgram.remove({}, function(err) {
      //console.log('collection removed')
    });

  });

 afterAll(async () => {
    MongoDB.close();
    p = await WorkTask.find({null: null});
  });



  test('Able to find or create a task ', async() => {
    jest.setTimeout(5000);

    task1  = await WorkTask.WorkTask(task1_args, process1_args, project2_args, program1_args);
    task1_found = await WorkTask.findById(task1._id);

    expect(task1).toEqual(task1_found);
    // expect(work_process_args.name).toMatch(task1_found.workProcess.name);
  })

});
