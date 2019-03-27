const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: Object,
});

module.exports = mongoose.model('User', UserSchema);
