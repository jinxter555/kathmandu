
const WorkProgram = require('../models/WorkProgram');
const WorkProject= require('../models/WorkProject');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');

describe('project test',  () => {

  beforeAll(() => {
    MongoDB.open('dev');
  });

  afterAll(async () => {
    MongoDB.close();
    p = await WorkProject.find({null: null});
  });

  test('Able to find or create a new project using Project function', async() => {
    jest.setTimeout(500);

    // create a new program
    program_args = { name: 'my program 1', description: faker.lorem.sentence()};
    project_args = { name: 'my project 1', description: faker.lorem.sentence()};
    work_project  = await WorkProject.WorkProject(project_args, program_args)

    work_project_found  = await WorkProject
      .findOneAndUpdate(project_args, {}, {new: false})
      .populate('workProgram')

    expect(work_project._id).toMatchObject(work_project_found._id);
    expect(program_args.name).toMatch(work_project_found.workProgram.name);

  })

});
