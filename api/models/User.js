const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: Object,
});

module.exports = mongoose.model("User", UserSchema);
