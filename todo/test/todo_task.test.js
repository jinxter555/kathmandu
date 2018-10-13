const TodoTask = require('../todo_src/TodoTask');
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

  // process1_args = { name: 'my process 1', description: faker.lorem.sentence()},
  process1_args = { name: 'my process 1', description: "process 1 description" },
  process2_args = { name: 'my process 2', description: faker.lorem.sentence()},
  process3_args = { name: 'my process 3', description: faker.lorem.sentence()},

  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: brush your teeth' },
  task3_args = { description: 'my task 3: take a shower' };
  task4_args = { description: 'my task 3: make coffee' };



describe('Todo process class test',  () => {

  beforeAll(async () => {
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
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkTask.find({null: null});
  });

  //-------------------------  Test suites here
  test('able to use TodoTask class to create new task object', async () => {
    jest.setTimeout(1000);
    work_task1 = await TodoTask.createOrUpdate(task1_args, process1_args, project1_args, program1_args);
    work_task1_found_by_id = await TodoTask.findById(work_task1._id);

    console.log(work_task1_found_by_id.constructor.name);

    expect(work_task1_found_by_id.name).toEqual(work_task1.name);

    work_task1_found_by_args = await TodoTask.findByArgs(task1_args, process1_args, project1_args, program1_args);

    //console.log(work_task1_found_by_args);
    expect(work_task1_found_by_args.name).toEqual(work_task1.name);
  })

  test('able to use TodoTask class to create new task object by using processId', async () => {
    work_task1 = await TodoTask.createOrUpdate(task1_args, process1_args, project1_args, program1_args);
    work_process1 = await TodoProcess.findByArgs(process1_args, project1_args, program1_args);
    work_task2 = await TodoTask.createOrUpdateByProcessId(work_process1._id, task2_args);

    //tasks = await work_process1.findChildrenTasks();

    console.log(work_task1.constructor.name);
    console.log(work_task2.constructor.name);
    console.log(work_process1.constructor.name);

  })


  xtest('list projects created under a program', async () => {
    jest.setTimeout(1000);
    work_process1_p1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program1_args);
    work_process1_p2 = await TodoProcess.createOrUpdate(process2_args, project1_args, program1_args);


    work_program1 = await TodoProgram.findByName(program1_args.name);
    work_project1 = await TodoProject.findByProjectNameAndProgramId(project1_args.name, work_program1._id);


    work_processes_1st_batch  = await TodoProcess.findByProjectId(work_project1._id);


    work_process1_p2 = await TodoProcess.createOrUpdate(process1_args, project2_args, program1_args);
    work_process2_p2 = await TodoProcess.createOrUpdate(process2_args, project2_args, program1_args);

    work_project2 = await TodoProject.findByArgs(project2_args, program1_args);

    work_processes_1st_batch  = await TodoProcess.findByProjectId(work_project1._id);
    //console.dir(work_project2);
    //console.dir(await TodoProcess.findByProjectId(work_project2._id));

    work_processes_2nd_batch  = await TodoProcess.findByProjectId(work_project2._id);

    expect(work_processes_1st_batch.length).toEqual(2);
    expect(work_processes_2nd_batch.length).toEqual(2);

    //console.log(work_processes_1st_batch);
    //console.log(work_processes_2nd_batch);

    // able to use findByArgs
    w_p_p2 = await TodoProcess.findByArgs(process2_args, project2_args, program1_args);
    //console.log(w_p_p2);
    expect(work_process2_p2._id).toEqual(w_p_p2._id);
  })

  xtest('create project from programId and delete Program causing throw error to be catched', async () => {
    work_process1_p1 = await TodoProcess.createOrUpdate(process1_args, project1_args, program3_args);
    work_program3 = await TodoProgram.findByArgs(program3_args);
    work_project1 = await TodoProject.findByArgs(project1_args, program3_args);

    try  {
      work_program3 = await TodoProgram.deleteById(work_program3._id)
    } catch(e) {
      console.log('catching error:' + e.name + ": " + e.message);
    }

    try  {
      work_project1 = await TodoProject.deleteById(work_project1._id)
    } catch(e) {
      console.log('catching error:' + e.name + ": " + e.message);
    }

  })
});
