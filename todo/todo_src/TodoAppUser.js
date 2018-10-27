const AppUser = require('../models/AppUser');
const TodoWorkUser= require('./TodoWorkUser');
const jwt = require('jsonwebtoken');
//const WorkTask = require('../models/WorkTask');
//const TodoProject= require('./TodoProject');

// work_process is the single name for processes
// process is a reserved.
const SECRET='hello123'

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
    if(appuser) {
      return new TodoAppUser(appuser)
    } 
    return null;
  }

  static async findByEmail(email) {
    let workUser = await TodoWorkUser.findByEmail(email)
    let appuser = await TodoAppUser.findOne({workUser: workUser})
    if(appuser) {
      return new TodoAppUser(appuser)
    } 
    console.log("in find by email")
    console.log(email)
    return null;
  }

  static async findByArgs(appuser_args, workuser_args, person_args, company_args) {
    let workUser = await TodoWorkUser.findByArgs(workuser_args, person_args, company_args);
    let args = Object.assign({}, appuser_args);
    args.workUser = workUser;

    let appuser = await AppUser.findOne(args);
    if(appuser) {
      return new TodoAppUser(appuser)
    } 
    return null;
  }
  validatePassword(password){
    return this.password === password
  }
  static async login(email, password) {
    let appuser = await TodoAppUser.findByEmail(email)
    if(appuser && appuser.validatePassword(password)) {
      const token = jwt.sign(
        {id: appuser.id},
        SECRET,
        { expiresIn: '1y'},
      );
      return token;
    }
    return null;
  }

  async TodoWorkUser(){
    return await TodoWorkUser.findById(this.workUser)
  }
}
module.exports = TodoAppUser;