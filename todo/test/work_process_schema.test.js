
const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const WorkProcess = require('../models/WorkProcess');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');

describe('work process test',  () => {

  beforeAll(() => {
    MongoDB.open('dev');
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkProject.find({null: null});
  });

  test('Able to find or create a new process using proccess function', async() => {
    jest.setTimeout(1500);

    // create a new process
    program_args = { name: 'my program 1', description: faker.lorem.sentence()};
    project_args = { name: 'my project 1', description: faker.lorem.sentence()};
    work_process_args = { name: 'my work process 1', description: faker.lorem.sentence()};
    work_process  = await WorkProcess.WorkProcess(work_process_args, project_args, program_args);

    // find the created process
    work_process_found = await WorkProcess.
      findOneAndUpdate(work_process_args, {}, {new: false})
      .populate({
        path: 'workProject',
        populate: {
          path: 'workProgram',
        }
      });

    expect(work_process._id).toMatchObject(work_process_found._id);
    expect(project_args.name).toMatch(work_process_found.workProject.name);

    console.log(work_process);
    console.log(work_process_found);

  })

});
