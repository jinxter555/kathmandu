
const TodoWorkCompany = require('../todo_src/TodoWorkCompany');
const TodoPerson = require('../todo_src/TodoPerson');
const TodoWorkUser = require('../todo_src/TodoWorkUser');
const TodoAppUser = require('../todo_src/TodoAppUser');

const TodoTask = require('../todo_src/TodoTask');
const TodoProcess = require('../todo_src/TodoProcess');
const TodoProject = require('../todo_src/TodoProject');
const TodoProgram = require('../todo_src/TodoProgram');


const Person = require('../models/Person');
const WorkUser = require('../models/WorkUser');
const AppUser = require('../models/AppUser');
const WorkCompany = require('../models/WorkCompany');

const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');



var person1_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.name.firstName() + '@somecompany.com',
  workCompany: null
}

var person2_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.name.firstName() + '@somecompany.com',
  workCompany: null
}

var person3_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  //email: faker.name.firstName() + '@somecompany.com',
  email: 'me@abc.com',
  workCompany: null
}

var person4_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.name.firstName() + '@somecompany.com',
  workCompany: null
}


var workuser1_args = {
  title: "president"
}

var appuser1_args = {
  username: 'u1',
  password: 'p1',
}

var company1_args = {
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}

var company2_args = {
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}

var company3_args = {
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}

var company4_args = {
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}


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


describe('todo',  () => {

  beforeAll(async() => {
    MongoDB.open('dev');

    Person.remove({}, function(err) { });
    AppUser.remove({}, function(err) { });
    WorkUser.remove({}, function(err) { });
    WorkCompany.remove({}, function(err) { });

   	WorkTask.remove({}, function(err) { });
   	WorkProcess.remove({}, function(err) { });
    WorkProject.remove({}, function(err) { });
    WorkProgram.remove({}, function(err) { });

  });

  afterAll(async () => {
    MongoDB.close();
    p = await Person.find({null: null});
  });

  test('Able to create a new todo appuser/task  and assign task to appuser', async() => {
    appuser1_obj =  await TodoAppUser.createOrUpdate(appuser1_args, workuser1_args, person3_args, company4_args)

    work_task1 = await TodoTask.createOrUpdate(task1_args, process1_args, project1_args, program1_args);
		console.log(await work_task1.assignToWorkUser("boss",  await appuser1_obj.TodoWorkUser()));
		//console.log(await work_task1.assignToWorkUser("boss",  await appuser1_obj));
		//console.log(appuser1_obj.constructor.name);

    /*
    console.dir(appuser1_obj);
    console.dir(appuser1_obj_found);
    console.dir(person3_args.email);
    console.dir(appuser1_obj_found_by_email);
    console.log(await appuser1_obj.email());
    console.log(await appuser1_obj.fullName());
    */

    // console.log(appuser1_obj_found_by_email.validatePassword('p1'));
    //token = await TodoAppUser.login(person3_args.email, 'p1');
    //token = await TodoAppUser.login('a@b.com', 'p2');
    //console.log(token);
  });

});
