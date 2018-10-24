const mongoose = require('mongoose')
const Person = require('../models/Person');
const Schema = mongoose.Schema;

const WorkUserSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // other titles, list of string,
  // array of work_roles
  person: {
    type : Schema.Types.ObjectId, 
    ref: 'people',
    index: { unique: true }
  },
});
WorkUserSchema.index({person: 1, title: 1}, {unique: true});

WorkUserSchema.statics.WorkUser = async function(workuser_args, person_args, company_args) {
  person = await Person.Person(person_args, company_args);
  args = Object.assign({}, workuser_args);
  args.person = person
  workUser = await WorkUser.findOneAndUpdate({ person: person._id }, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })
  return workUser;
};

WorkUserSchema.statics.findPersonAndCompany = async function(workuser_args, person_args, company_args) {
  person = await Person.Person(person_args, company_args);
  args = Object.assign({}, workuser_args)
  args.person = person
  return await WorkUser.findOne(args)
}
  
WorkUserSchema.methods.fullName = async function() {
  person  = await Person.findById(this.person._id);
  return person.fullName();
}
WorkUserSchema.methods.email = async function() {
  person  = await Person.findById(this.person._id);
  return person.email;
}
module.exports = WorkUser = mongoose.model('WorkUsers',  WorkUserSchema);
module.exports = WorkUser = mongoose.model('WorkUsers',  WorkUserSchema);