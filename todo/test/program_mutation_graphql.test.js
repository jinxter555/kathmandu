'use strict';

const faker = require('faker');
const request = require('request-promise');
const util = require('util')

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const WorkProgram = require('../models/WorkProgram');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  program3_args = { name: 'my program 3', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };


var app;

describe('Integration', () => {

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('test');

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

    app = integrationServer.start(done);
  });

  afterAll(async(done) => {
    const query = `{ programs { id name description }`;

    integrationServer.stop(app, done);
    MongoDB.close();
    p = await WorkProgram.find({null: null});
  });

  test('mutation add program ', async() => {
    let work_program = await TodoProgram.createOrUpdate(program1_args);
    var query = `
    mutation {
      addProgram(name: "${program2_args.name}", description: "${program2_args.description}") {
        id
        name
        description
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.addProgram.name).toEqual(program2_args.name);
      });
  });

  test('mutation del program ', async () => {
    let work_program = await TodoProgram.createOrUpdate(program2_args);
    var query = `
    mutation {
      delProgram(id: "${work_program._id}") {
        id
        name
        description
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.delProgram.id).toEqual(work_program._id.toString());
      });
  });

  test('mutation del program with a project inside it', async () => {
    let work_project2 = await TodoProject.createOrUpdate(project2_args, program3_args);
    let work_program3 = await TodoProgram.findByArgs(program3_args);
    var query = `
    mutation {
      delProgram(id: "${work_program3._id}") {
        id
        name
        description
      }
    }`;

    return integrationServer
      .graphqlQuery(app, query)
      .then((response) => {
        //console.log(util.inspect(response, false, null, true /* enable colors */))
        expect(response.statusCode).toEqual(200);
        expect(response.body.delProgram).toBeNull();
      });
  });
});
