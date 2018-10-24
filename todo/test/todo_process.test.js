
const TodoProcess = require('../todo_src/TodoProcess');
const TodoProject = require('../todo_src/TodoProject');
const TodoProgram = require('../todo_src/TodoProgram');
const WorkProgram = require('../models/WorkProgram');
const WorkProject = require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const MongoDB = require('../openMongo');
const faker = require('faker');


var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  program3_args = { name: 'my program 3', description: faker.lorem.sentence()},

  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  project3_args = { name: 'my project 3', description: faker.lorem.sentence()},

  process1_args = { name: 'my process 1', description: faker.lorem.sentence()},
  process2_args = { name: 'my process 2', description: faker.lorem.sentence()},
  process3_args = { name: 'my process 3', description: faker.lorem.sentence()},

  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };



describe('Todo process class test',  () => {

  beforeAll(async () => {
    MongoDB.open('test');

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
    p = await WorkProcess.find({null: null});
  });

  //-------------------------  Test suites here
  test('able to use Todo class to create new process object', async () => {
    jest.setTimeout(1000);
    work_process1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program1_args);
    expect(work_process1.name).toMatch(process1_args.name)
    //console.dir(work_process1);
  })

  test('list processes created under a project', async () => {
    jest.setTimeout(1000);
    work_process1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program2_args);
    work_process2 = await TodoProcess.createOrUpdate(process2_args, project1_args, program2_args);

    work_project1 = await TodoProject.findByArgs(project1_args, program2_args);

    work_processes_project1 = await TodoProcess.findByProjectId(work_project1._id);

    expect(work_processes_project1.sort()).toEqual([work_process1, work_process2].sort());

  })

  test('create processes from projectId and delete project causing throw error to be catched', async () => {
    jest.setTimeout(1000);
    work_process1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program3_args);
    work_process2 = await TodoProcess.createOrUpdate(process2_args, project1_args, program3_args);

    work_process2 = await TodoProcess.createOrUpdate(process2_args, project1_args, program3_args);
    work_project1 = await TodoProject.findByArgs(project1_args, program3_args);

    work_process3 = await TodoProcess.createOrUpdateByProjectId(work_project1._id, process3_args);
    expect(work_process3.name).toMatch(process3_args.name);

    try  {
      work_project1 = await TodoProject.deleteById(work_project1._id)
    } catch(e) {
      console.log('catching error:' + e.name + ": " + e.message);
    }

  })
});
