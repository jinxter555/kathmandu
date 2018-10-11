
const TodoProgram = require('../todo_src/TodoProgram');
const WorkProgram = require('../models/WorkProgram');
const MongoDB = require('../openMongo');
const faker = require('faker');


var task1, task2, task1_found, task2_found, task3, task3_found,
  program_args = { name: 'my program 1', description: faker.lorem.sentence()},
  project_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };

describe('Todo class test',  () => {

  beforeAll(async () => {
    MongoDB.open('test');
    WorkProgram.remove({}, function(err) {
      console.log('collection removed')
    });
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkProgram.find({null: null});
  });

  //-------------------------  Test suites here
  test('able to use Todo class to create new program object', async () => {
    jest.setTimeout(2000);
    work_program = await TodoProgram.createOrUpdate(program_args);
    expect(work_program.name).toMatch(program_args.name)
  })

  test('able to use Todo class method findById to look for newly created object and delete the object', async () => {
    jest.setTimeout(1000);
    work_program = await TodoProgram.createOrUpdate(program_args);

    work_program_found = await TodoProgram.findById(work_program.id)
    work_program_found_by_name = await TodoProgram.findByName(work_program.name)

    expect(work_program_found.name).toMatch(program_args.name)
    expect(work_program_found_by_name.name).toMatch(program_args.name)
    //console.log(work_program_found);

    // delete work program and look it up and make sure it's null.
    work_program_deleted = await TodoProgram.deleteById(work_program.id)
    //console.log(work_program_deleted);

    work_program_not_found = await TodoProgram.deleteById(work_program_deleted.id)
    expect(work_program_not_found).toBeNull();

  })
});
