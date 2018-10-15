'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');


const WorkProgram = require('../models/WorkProgram');
const WorkProject = require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const WorkTask = require('../models/WorkTask');

const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
const TodoTask = require('../todo_src/TodoTask');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  process1_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  process2_args = { name: 'my work process 2', description: faker.lorem.sentence()},
  process3_args = { name: 'my work process 3', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };


describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('dev');
    app = integrationServer.start(done);

    WorkTask.remove({}, function(err) {
      //console.log('project collection removed')
    });
    WorkProcess.remove({}, function(err) {
      //console.log('project collection removed')
    });

    WorkProject.remove({}, function(err) {
      //console.log('project collection removed')
    });

    WorkProgram.remove({}, function(err) {
      //console.log('projgram collection removed')
    });
  });

  afterAll(async(done) => {
    integrationServer.stop(app, done);
    MongoDB.close();
      //p = await WorkTask.find({null: null});
  });

  test('mutation add Task to an existing Process', async () => {
    let work_process1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program1_args);

    let query = `
    mutation {
      addTaskByProcessId(
        id: "${work_process1._id}",
        description: "${task1_args.description}") {
          id
          description
        }
    }`;

    //console.log(query);
    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        //console.log(response.body);
        expect(response.body.addTaskByProcessId.description).toEqual(task1_args.description);
      });
  });

  test('mutation del task ', async () => {
    let work_task1 = await TodoTask.createOrUpdate(task1_args, process1_args, project1_args, program2_args);
    let query = `
    mutation {
      delTask(id: "${work_task1._id}") {
        id
        description
      }
    }`;

    //console.log(query);
    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        //console.dir(response);
        expect(response.statusCode).toEqual(200);
        expect(response.body.delTask.id).toEqual(work_task1._id.toString());
      });
  });

});
