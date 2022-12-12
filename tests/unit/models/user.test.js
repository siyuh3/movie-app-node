const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const config = require('config');
const { User } = require('../../../models/user');
const jwtSecret = config.get('jwtSecret');

describe('user.generateAuthToken', () => {
  it('should return a valid json web token', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };

    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, jwtSecret);

    expect(decoded).toMatchObject(payload);
  });
});