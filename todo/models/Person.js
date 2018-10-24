const mongoose = require('mongoose')
const WorkCompany = require('../models/WorkCompany')
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  MiddleName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false,
  },
  workCompany:  {type : Schema.Types.ObjectId, ref: 'WorkCompanies' }
});

PersonSchema.index({firstName: 1, lastName: 1, workCompany: 1}, {unique: true});
PersonSchema.index({email: 1}, {unique: true});

PersonSchema.statics.Person = async function(person_args, company_args) {
  workCompany = await WorkCompany.findOne(company_args)
  if(!workCompany) {
    workCompany = await new WorkCompany(company_args).save(); // new must be followed by save
  }
  args = Object.assign({}, person_args);
  args.workCompany = workCompany;

  person = await Person.findOneAndUpdate({
    firstName: args.firstName,
    lastName: args.lastName,
    workCompany: args.workCompany
  }, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  }).catch(e => {console.log(e); throw Error("Person findOneupdate error")})

  return person;
};

PersonSchema.methods.fullName = function() {
  return (this.firstName + " " + this.lastName);
}

module.exports = Person = mongoose.model('person',  PersonSchema);