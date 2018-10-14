'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };


describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('test');
    app = integrationServer.start(done);

    /*
    WorkProject.remove({}, function(err) {
      console.log('project collection removed')
    });

    WorkProgram.remove({}, function(err) {
      console.log('projgram collection removed')
    });
    */
  });

  afterAll(async(done) => {
    const query = `{ programs { id name description }`;

    integrationServer.stop(app, done);
    MongoDB.close();
      //p = await WorkTask.find({null: null});
  });

  test('mutation add project ', async () => {
    let work_program1 = await TodoProgram.createOrUpdate(program1_args);

    let query = `
    mutation {
      addProjectByProgramId(
        id: "${work_program1._id}",
        name: "${project1_args.name}",
        description: "${project1_args.description}") {
          id
          name
          description
        }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        console.log(response.body);
        expect(response.body.addProjectByProgramId.name).toEqual(project1_args.name);
      });
  });

  test('mutation del project ', async () => {
    let work_project1 = await TodoProject.createOrUpdate(project1_args, program2_args);
    let  query = `
    mutation {
      delProject(id: "${work_project1._id}") {
        id
        name
        description
        workProgram
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        console.dir(response);
        expect(response.statusCode).toEqual(200);
        //expect(response.body.delProject.id).toEqual(work_project1._id.toString());
      });
  });

});
