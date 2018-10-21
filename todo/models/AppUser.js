const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const WorkUser = require('../models/WorkUser');


const AppUserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  workUser: {
    type : Schema.Types.ObjectId, 
    ref: 'workusers',
    index: {  unique: true }
  }
});

AppUserSchema.index({workUser: 1}, {unique: true});


AppUserSchema.statics.AppUser = async function(appuser_args, workuser_args, person_args) {
  workUser = await WorkUser(workuser_args, person_args);
  args = Object.create(appuser_args);
  args.workUser = workUser
  appUser = await AppUser.findOneAndUpdate({ workUser: workUser._id }, args, {
    upsert: true,
    new: true,
    overwrite: true, function(err, model) { }
  })
  return appUser;
};
  
  
AppUserSchema.methods.fullName = async function() {
  workUser  = await WorkUser.findById(this.workUser._id);
  return workUser.fullName();
}

module.exports = AppUser = mongoose.model('AppUsers',  AppUserSchema);
