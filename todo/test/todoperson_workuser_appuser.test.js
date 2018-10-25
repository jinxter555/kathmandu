
const TodoWorkCompany = require('../todo_src/TodoWorkCompany');
const TodoPerson = require('../todo_src/TodoPerson');
const TodoWorkUser = require('../todo_src/TodoWorkUser');
const TodoAppUser = require('../todo_src/TodoAppUser');

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

describe('person',  () => {

  beforeAll(async() => {
    MongoDB.open('dev');

    Person.remove({}, function(err) {
      //console.log('collection removed')
    });
    AppUser.remove({}, function(err) {
    });
    WorkUser.remove({}, function(err) {
    });
    WorkCompany.remove({}, function(err) {
      //console.log('collection removed')
    });
    //company1_obj = await new WorkCompany(company1_args).save();

  });

  afterAll(async () => {
    MongoDB.close();
    p = await Person.find({null: null});
  });

  test('Able to create a new Todo WorkCompany', async() => {
    work_company = await TodoWorkCompany.createOrUpdate(company1_args);
    work_company_found = await TodoWorkCompany.findByArgs(company1_args);
    //console.dir(work_company);
    expect(work_company_found).toEqual(work_company);
  });

  xtest('Able to create a new Todo Person', async() => {
    jest.setTimeout(5000);

    person1_obj = await TodoPerson.createOrUpdate(person1_args, company2_args);
    person1_obj_found = await TodoPerson.findById(person1_obj.id);
    person1_obj_found_by_args = await TodoPerson.findByArgs(person1_args, company2_args);
    person1_obj_found_by_localargs = await TodoPerson.findByLocalArgs({email: person1_args.email});

    expect(person1_obj_found).toEqual(person1_obj);
    expect(person1_obj_found_by_args).toEqual(person1_obj);
    //console.log(person1_args.email);
    //console.dir(person1_obj_found_by_localargs);
  });

  xtest('Able to create a new Todo workuser', async() => {
    workuser1_obj =  await TodoWorkUser.createOrUpdate(workuser1_args, person2_args, company3_args)
    workuser1_obj_found =  await TodoWorkUser.findByArgs(workuser1_args, person2_args, company3_args)
    workuser1_obj_found_by_email = await TodoWorkUser.findByEmail(person2_args.email);

    expect(workuser1_obj).toEqual(workuser1_obj_found);
    console.log(person2_args.email);
    console.log(await workuser1_obj_found_by_email.email());
    console.log(workuser1_obj_found_by_email);
  });

  test('Able to create a new todo appuser', async() => {
    appuser1_obj =  await TodoAppUser.createOrUpdate(appuser1_args, workuser1_args, person3_args, company4_args)
    appuser1_obj_found =  await TodoAppUser.findByArgs(appuser1_args, workuser1_args, person3_args, company4_args)
    appuser1_obj_found_by_email =  await TodoAppUser.findByEmail(person3_args.email)

    /*
    console.dir(appuser1_obj);
    console.dir(appuser1_obj_found);
    console.dir(person3_args.email);
    console.dir(appuser1_obj_found_by_email);
    console.log(await appuser1_obj.email());
    console.log(await appuser1_obj.fullName());
    */

    // console.log(appuser1_obj_found_by_email.validatePassword('p1'));
    token = await TodoAppUser.login(person3_args.email, 'p1');
    //token = await TodoAppUser.login('a@b.com', 'p2');
    console.log(token);

    //expect(appuser1_obj).toEqual(appuser1_obj_found);
  });

});
