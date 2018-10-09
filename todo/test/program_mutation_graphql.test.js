'use strict';

const faker = require('faker');
const request = require('request-promise');

const integrationServer = require("../supporting/integrationServer");
const MongoDB = require('../openMongo');

const TodoProgram = require('../todo_src/TodoProgram');
const WorkTask = require('../models/WorkTask');



var task1, task2, task1_found, task2_found, task3, task3_found,
  program_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  project_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

var work_program;

describe('Integration', () => {
  let app;

  beforeAll(async (done) => {
    // jest.setTimeout(1000);
    MongoDB.open('test');
    app = integrationServer.start(done);
    work_program = await TodoProgram.createOrUpdate(program_args);
  });

  afterAll(async(done) => {
    const query = `{ programs { id name description }`;

    integrationServer.stop(app, done);
    MongoDB.close();
      // p = await WorkPrograoWorkTask.find({null: null});
  });

  test('mutation add program ', () => {
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
    work_program = await TodoProgram.createOrUpdate(program_args);
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

});
