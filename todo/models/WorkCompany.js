const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {WorkProgramOwner} = require('./WorkProgramOwner')

//const WorkCompanySchema = new Schema({

const WorkCompanySchema  = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    index: true,
  }
});
WorkCompanySchema.index({name: 1}, {unique: true});
WorkCompanySchema.index({description: 1}, {unique: false});


WorkCompanySchema.statics.WorkCompany = async function(args) {
  let company = await WorkCompany.findOneAndUpdate({name: args.name, 
    description: args.description}, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })
  return company;
}
const WorkCompany = WorkProgramOwner.discriminator('WorkCompany', WorkCompanySchema);


module.exports = WorkCompany 