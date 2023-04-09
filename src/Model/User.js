const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//Schema

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
 
  gender: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },

});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Verify password
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
