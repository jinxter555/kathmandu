const WorkUser = require('../models/WorkUser');
const Person = require('../models/Person');
const TodoPerson= require('./TodoPerson');

// work_process is the single name for processes
// process is a reserved.

class TodoWorkUser extends WorkUser {
  constructor(workuser_obj) {
    super(workuser_obj);
    return this;
  }

  static async createOrUpdate(workuser_args, person_args, company_args) {
    let workuser  =  await WorkUser.WorkUser(workuser_args, person_args, company_args)
    return await new TodoWorkUser(workuser);
  }

  static async findById(id) {
    let workuser = await workUser.findById(id, function(err, person) {
      return (workuser);
    });
    return await new TodoWorkUser(workuser);
  }

  static async findByArgs(workuser_args, person_args, company_args) {
    let person = await Person.Person(person_args, company_args);
    let args = Object.assign({}, workuser_args);
    args.person = person;
    let workuser = await WorkUser.findOne(args);
    return await new TodoWorkUser(workuser);
  }
  static async findByEmail(email) {
    let person = await TodoPerson.findByLocalArgs({email: email});
    let workuser = await WorkUser.findOne({person: person})
    return await new TodoWorkUser(workuser);
  }
}

module.exports = TodoWorkUser;