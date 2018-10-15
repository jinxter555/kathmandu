'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
const TodoTask  = require('../todo_src/TodoTask');
const WorkProgram = require('../models/WorkProgram');
const WorkProject = require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  process1_args = { name: 'my process 1', description: faker.lorem.sentence()},
  process2_args = { name: 'my process 2', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

//var work_program;
describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('dev');
    app = integrationServer.start(done);
    //work_program = await TodoProgram.createOrUpdate(program1_args);

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

  afterAll(async(done) => {

    console.log("shutting down services");
    MongoDB.close();
    integrationServer.stop(app, done);
    console.log("done shutdown services");
    p = await WorkProgram.find({null: null});
    done();

  });

  test('should able create a process/task and should able to query the  process for the tasks', async () => {
    let work_task1 = await TodoTask.createOrUpdate(task1_args, process1_args, project1_args, program1_args);
    //let work_task2 = await TodoTask.createOrUpdate(task2_args, process1_args, project1_args, program1_args);
    let work_process1 = await TodoProcess.findByArgs(process1_args, project1_args, program1_args);

    const query = `{
      process(id: "${work_process1._id}") {
        id
        name
        description
        tasks {
          description
        }
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        console.dir(response.body);
        expect(response.statusCode).toEqual(200);
        expect(response.body.process.name).toEqual(process1_args.name);
        //expect(response.body.process.tasks.sort()).toEqual([work_task1,work_task2].sort());
        expect(response.body.process.tasks[0].description).toEqual(work_task1.description);
      });
  });

});
