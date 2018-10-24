const AppUser = require('../models/AppUser');
const TodoWorkUser= require('./TodoWorkUser');
const WorkTask = require('../models/WorkTask');
const TodoProject= require('./TodoProject');

// work_process is the single name for processes
// process is a reserved.

class TodoAppUser extends AppUser {
  constructor(appuser_obj) {
    super(appuser_obj);
    return this;
  }

  static async createOrUpdate(appuser_args, workuser_args, person_args, company_args) {
    let appuser =  await AppUser.AppUser(appuser_args, workuser_args, person_args, company_args)
    return await new TodoAppUser(appuser)
  }

  static async findById(id) {
    let appuser = await AppUser.findById(id, function(err, appuser) {
      return(appuser);
    });
    return await new TodoAppUser(appuser)
  }

  static async findByEmail(email) {
    let workUser = await TodoWorkUser.findByEmail(email)
    let appuser = await TodoAppUser.findOne({workUser: workUser})
    return await new TodoAppUser(appuser)
  }

  static async findByArgs(appuser_args, workuser_args, person_args, company_args) {
    let workUser = await TodoWorkUser.findByArgs(workuser_args, person_args, company_args);
    let args = Object.assign({}, appuser_args);
    args.workUser = workUser;

    let appuser = await AppUser.findOne(args);
    return await new TodoAppUser(appuser);
  }
}
module.exports = TodoAppUser;
