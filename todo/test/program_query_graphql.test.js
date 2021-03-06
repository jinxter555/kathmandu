'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const WorkProgram = require('../models/WorkProgram');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

//var work_program;
describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('test');
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

  test('Should list programs', async () => {
    let work_program = await TodoProgram.createOrUpdate(program1_args);
    const query = `{
      programs {
        id
        name
        description
      }
    }`;
    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.programs[0].name).toEqual(program1_args.name);
      });
  });

  test('query program by id', async () => {
    let work_program = await TodoProgram.createOrUpdate(program2_args);
    const query = `{
      program(id: "${work_program._id}") {
        id
        name
        description
      }
    }`;
    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.program.name).toEqual(program2_args.name);
      });
  });

});
