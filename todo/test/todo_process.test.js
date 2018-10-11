
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

  test('list projects created under a program', async () => {
    jest.setTimeout(1000);
    work_process1_p1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program1_args);
    work_process1_p2 = await TodoProcess.createOrUpdate(process2_args, project1_args, program1_args);

    work_program1 = await TodoProgram.findByName(program1_args.name);
    work_project1 = await TodoProject.findByProjectNameAndProgramId(project1_args.name, work_program1._id);


    work_processes_1st_batch  = await TodoProcess.findByProjectId(work_project1._id);


    work_process1_p2 = await TodoProcess.createOrUpdate(process1_args, project1_args, program2_args);
    work_process2_p2 = await TodoProcess.createOrUpdate(process2_args, project2_args, program2_args);
    console.dir(project2_args);

    work_project2 = await TodoProgram.findByName(project2_args.name);

    console.dir(project2_args);
    work_processes_1st_batch  = await TodoProcess.findByProjectId(work_project1._id);
    console.dir(project2_args);
    console.dir(work_project2);
    /*
    work_processes_2nd_batch  = await TodoProcess.findByProjectId(work_project2._id);

    expect(work_projects_1st_batch.length).toEqual(2);
    expect(work_projects_2nd_batch.length).toEqual(2);
    console.log(work_processes_1st_batch);
    console.log(work_processes_2nd_batch);
    */

  })

  xtest('create project from programId and delete Program causing throw error to be catched', async () => {
    work_program3 = await TodoProgram.createOrUpdate(program3_args);
    work_project3 = await TodoProcess.createOrUpdateByProgramId(work_program3._id, project3_args);
    expect(work_project3.name).toMatch(project3_args.name)

    // work_program3.remove();
    try  {
      work_program3 = await TodoProgram.deleteById(work_program3._id)
    } catch(e) {
      console.log('catching error:' + e.name + ": " + e.message);
    }


  })
});
