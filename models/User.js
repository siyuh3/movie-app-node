const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get('jwtSecret');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({
    _id: this._id,
    name: this.name
  }, jwtSecret);
}

module.exports = mongoose.model('user', UserSchema);