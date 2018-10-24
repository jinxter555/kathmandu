const WorkCompany = require('../models/WorkCompany');

// work_process is the single name for processes
// process is a reserved.

class TodoWorkCompany extends WorkCompany {
  constructor(work_company_obj) {
    super(work_company_obj);
    return this;
  }

  static async createOrUpdate(company_args) {
    let work_company   =  await WorkCompany.WorkCompany(company_args)
    return await new TodoWorkCompany(work_company);
  }

  static async findById(id) {
    let work_company = await WorkCompany.findById(id, function(err, work_company) {
      return (work_company);
    });
    return await new TodoWorkCompany(work_company);

  }

  static async findByArgs(company_args) {
    let work_company = await WorkCompany.findOne({name: company_args.name},
      function(err, work_company) {
        return work_company;
    });
    return new TodoWorkCompany(work_company);
  }

}
module.exports = TodoWorkCompany;
