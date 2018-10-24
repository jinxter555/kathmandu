
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
  workCompany: null
}

var person2_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  workCompany: null
}

var person3_args = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: "person3@email.com",
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

describe('person',  () => {

  beforeAll(async() => {
    MongoDB.open('test');

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

  xtest('Able to create a new person', async() => {
    jest.setTimeout(5000);

    person1_obj = await Person.Person(person1_args, company1_args);
    company1_obj = await WorkCompany.WorkCompany(company1_args);


    person1b_args = Object.assign({}, person1_args);
    person1b_args.workCompany  = company1_obj._id;

    person1_obj_found = await Person.findOne(person1b_args);

    expect(person1_obj_found).toEqual(person1_obj);
  });

  xtest('Able to create a new workuser', async() => {
    workuser1_obj =  await WorkUser.WorkUser(workuser1_args, person1_args, company2_args)
    workuser1_obj_found =  await WorkUser.findPersonAndCompany(workuser1_args, person1_args, company2_args)

    //console.log(workuser1_obj);
    //console.log(workuser1_obj_found);
    expect(workuser1_obj).toEqual(workuser1_obj_found);
  });

  test('Able to create a new appuser', async() => {
    appuser1_obj =  await AppUser.AppUser(appuser1_args, workuser1_args, person3_args, company1_args)
    appuser1_obj_found =  await AppUser.findOne({username: appuser1_args.username})

    console.dir(appuser1_obj);
    console.dir(appuser1_obj_found);
    console.dir(await appuser1_obj_found.email());
    expect(appuser1_obj).toEqual(appuser1_obj_found);
  });

});
