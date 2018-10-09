'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const WorkTask = require('../models/WorkTask');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

var work_program1;
var work_program2;

describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('dev');
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
    work_program1 = await TodoProgram.createOrUpdate(program1_args);
    work_program2 = await TodoProgram.createOrUpdate(program2_args);

    var query = `
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

    console.log(query);
    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        console.log(response.body);
        //expect(response.body.addProjectByProgramId.name).toEqual(project1_args.name);
      });
  });

  xtest('mutation del program ', async () => {
    work_program1 = await TodoProgram.WorkProgram(program_args);
    var query = `
    mutation {
      delProgram(id: "${work_program._id}") {
        id
        name
        description
        workProgram
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.delProgram.id).toEqual(work_program._id.toString());
      });
  });

});
