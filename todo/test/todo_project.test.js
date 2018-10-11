const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const WorkProgram = require('../models/WorkProgram');
const WorkProject = require('../models/WorkProject');
const MongoDB = require('../openMongo');
const faker = require('faker');


var task1, task2, task1_found, task2_found, task3, task3_found,
  program1_args = { name: 'my program 1', description: faker.lorem.sentence()},
  program2_args = { name: 'my program 2', description: faker.lorem.sentence()},
  program3_args = { name: 'my program 3', description: faker.lorem.sentence()},
  program4_args = { name: 'my program 4', description: faker.lorem.sentence()},
  project1_args = { name: 'my project 1', description: faker.lorem.sentence()},
  project2_args = { name: 'my project 2', description: faker.lorem.sentence()},
  project3_args = { name: 'my project 3', description: faker.lorem.sentence()},
  project4_args = { name: 'my project 4', description: faker.lorem.sentence()},
  work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()},
  task1_args = { description: 'my task 1: wash your hands' },
  task2_args = { description: 'my task 2: wash your feet' },
  task3_args = { description: 'my task 3: take a shower' };



describe('Todo class test',  () => {

  beforeAll(async () => {
    MongoDB.open('test');
    WorkProject.remove({}, function(err) {
      //console.log('collection removed')
    });

    WorkProgram.remove({}, function(err) {
      //console.log('collection removed')
    });
  });

  afterAll(async () => {

    MongoDB.close();
    p = await WorkProgram.find({null: null});
  });

  //-------------------------  Test suites here
  test('able to use Todo class to create new project object', async () => {
    jest.setTimeout(1000);
    work_project1 = await TodoProject.createOrUpdate(project1_args, program1_args);
    expect(work_project1.name).toMatch(project1_args.name)
  })

  test('list projects created under a program', async () => {
    jest.setTimeout(1000);
    work_project1_p1 = await TodoProject.createOrUpdate(project1_args, program1_args);
    work_project2_p1 = await TodoProject.createOrUpdate(project2_args, program1_args);

    work_program1 = await TodoProgram.findByName(program1_args.name);

    work_project1_p2 = await TodoProject.createOrUpdate(project1_args, program2_args);
    work_project2_p2 = await TodoProject.createOrUpdate(project2_args, program2_args);

    work_program2 = await TodoProgram.findByName(program2_args.name);

    work_projects_1st_batch  = await TodoProject.findByProgramId(work_program1._id);
    work_projects_2nd_batch  = await TodoProject.findByProgramId(work_program2._id);

    expect(work_projects_1st_batch.length).toEqual(2);
    expect(work_projects_2nd_batch.length).toEqual(2);

  })

  test('create project from programId and delete Program causing throw error to be catched', async () => {
    work_program3 = await TodoProgram.createOrUpdate(program3_args);
    work_project3 = await TodoProject.createOrUpdateByProgramId(work_program3._id, project3_args);

    expect(work_project3.name).toMatch(project3_args.name)

    try  {
      work_program3 = await TodoProgram.deleteById(work_program3._id)
    } catch(e) {
      console.log('catching error:' + e.name + ": " + e.message);
    }

    w_p_3 = await TodoProject.findByArgs(project3_args, program3_args);
    expect(w_p_3.name).toMatch(w_p_3.name)
  })

});
