const Person = require('../models/Person');
const TodoWorkCompany = require('./TodoWorkCompany');

// work_process is the single name for processes
// process is a reserved.

class TodoPerson extends Person {
  constructor(person_obj) {
    super(person_obj);
    return this;
  }

  static async createOrUpdate(person_args, company_args) {
    person  =  await Person.Person(person_args, company_args)
    return await new TodoPerson(person);
  }

  static async findById(id) {
    person = await Person.findById(id, function(err, person) {
      return (person);
    });
    return await new TodoPerson(person);
  }

  static async findByArgs(person_args, company_args) {
    let work_company = await TodoWorkCompany.findByArgs(company_args);

    if(work_company === null) { return null}

    args = Object.assign({}, person_args);
    args.workCompany  = work_company._id;

    let person = await Person.findOne(args, function(err, person) {
        return person;
    });
    return new TodoPerson(person);
  }

  static async findByLocalArgs(args) {
    let person = await Person.findOne(args, function(err, person) {
        return person;
    });
    return new TodoPerson(person);
  }
}

module.exports = TodoPerson;
