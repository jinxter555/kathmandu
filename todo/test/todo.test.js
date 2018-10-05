
const Todo = require('../todo_src/Todo');
const WorkTask = require('../models/WorkTask');
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
    MongoDB.open('dev');
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkTask.find({null: null});
  });

  //-------------------------  Test suites here
  test('able to use Todo class to create new object', async () => {
    jest.setTimeout(1000);

    todo  = await new Todo(task1_args, work_process_args, project_args, program_args);
    console.log(todo.workTask.description);

  })

  xtest('able to use Todo class to create new Program', async () => {
    program  = await Todo.WorkProgram(program_args);
    console.log(program);
  })
});
