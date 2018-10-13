
const WorkProgram = require('../models/WorkProgram');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
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
  task3_args = { description: 'my task 3: take a shower' },
  task4_args = { description: 'my task 3: make coffee' };



describe('work program',  () => {

  beforeAll(() => {
    MongoDB.open('test');
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkProgram.find({null: null});
  });

  test('Able to create a new program using new', async() => {
    jest.setTimeout(5000);

    name = faker.lorem.sentence();
    description = faker.lorem.sentence();
    work_program  = await new WorkProgram({
      name: name,
      description: description
    }).save();

    work_program_found = await WorkProgram.findOne({
      name: name,
      description: description
    });

    expect(work_program._id).toMatchObject(work_program_found._id);
  })

  test('create a duplicated program using new should error out', async() => {
    jest.setTimeout(5000);

    name = faker.lorem.sentence();
    description = faker.lorem.sentence();

    work_program  = await new WorkProgram({
      name: name,
      description: description
    }).save();

    try {
      success = false;
      work_program  = await new WorkProgram({
        name: name,
        description: description
      }).save();
    } catch(error) {
      success = true;
      console.log(error);
      expect(error.errmsg).toBeDefined();
      expect(error.errmsg).toEqual(expect.stringMatching(/duplicate key error/));
    }

    if(! success) {
      throw  "did not catch MongoDB duplicate error";
    }

  });

  test('Able to create a new program using Program function', async() => {
    jest.setTimeout(500);

    name = faker.lorem.sentence();
    description = faker.lorem.sentence();
    work_program  = await WorkProgram.WorkProgram({
      name: name,
      description: description,
      opStatus:  OPStatus.not_started
    });

    work_program_found = await WorkProgram.findOne({
      name: name,
      description: description
    });

    expect(work_program._id).toMatchObject(work_program_found._id);
    console.log(work_program);

  });

  test('Able to find or create a new/program using Program function', async() => {
    jest.setTimeout(500);

    // create a new program
    name = 'my program 1';
    description = faker.lorem.sentence();
    work_program  = await WorkProgram.WorkProgram({
      name: name,
      description: description,
      opStatus:  OPStatus.not_started
    });

    work_program_found = await WorkProgram.findOne({
      name: name,
      description: description
    });

    // find the existing program created earlier
    description = faker.lorem.sentence();
    work_program  = await WorkProgram.WorkProgram({
      name: name,
      description: description,
      opStatus:  OPStatus.not_started
    });
    expect(work_program._id).toMatchObject(work_program_found._id);
  })

});
