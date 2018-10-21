
const Person = require('../models/Person');
const WorkUser = require('../models/WorkUser');
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


describe('person',  () => {

  beforeAll(async() => {
    MongoDB.open('test');
    Person.remove({}, function(err) {
      //console.log('collection removed')
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

    //console.dir(person1_obj);

    person1_obj_found = await Person.findOne(person1_args);

    //person1_args.workCompany = person1_obj.workCompany;
    //person1b_obj = await new Person(person1_args); // should error ?
    //console.dir(person1b_obj);

    expect(person1_obj_found.firstName).toEqual(person1_obj.firstName);
    expect(person1_obj_found.workCompany).toEqual(company1_obj._id);
    //console.log(person1_obj_found.fullName());
  });

  test('Able to create a new workuser', async() => {
    console.log('workuser1_obj');
    workuser1_obj =  await WorkUser.WorkUser(workuser1_args, person1_args, company1_args)

    console.log('workuser1_obj_found');
    workuser1_obj_found =  await WorkUser.findPersonAndCompany(workuser1_args, person1_args, company1_args)


    console.log(workuser1_obj);
    //console.log(workuser1_obj_found);
    //console.dir(workuser1b_obj);

  });

  xtest('Able to create a new appuser', async() => {
    person3_args.workCompany = company1_obj;
    person3_obj = await Person.Person(person3_args);
    await person3_obj.save();
  });
  xtest('teste disc', async() => {
    wc = await new  WorkCompany({name: "company1", description: "my desc1"}).save();
    workuser1_obj =  await WorkUser.WorkUser(workuser1_args, person1_args, company1_args)

    //wc2 = await new  WorkCompany({name: "company1", description: "my desc1"}) // .save().catch(e => {console.log(e)});
    //workuser2_obj =  await WorkUser.WorkUser(workuser1_args, person1_args, company1_args)
    //console.dir(WorkCompany);
    //console.dir(wc);
    console.dir(workuser1_obj);

  });

});
