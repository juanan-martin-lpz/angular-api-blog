var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;
var User = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: false},
  lastname: {type: String, required: false},
});

//Pre-Hook para cifrar el pass antes de guardar el registro
User.pre('save', async function(next) {
  const user = this;

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

User.methods.isValidPassword = async function(password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);

  console.log('IsValidPwd :' + compare);

  return compare;
};

var UserModel = mongoose.model('User', User);

module.exports = UserModel;
