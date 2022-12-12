const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const config = require("config");
const jwtSecret = config.get('jwtSecret');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT.', () => {
    const payload = {
                    user: {
                        id: mongoose.Types.ObjectId().toHexString()
                    }
                }
    const token = jwt.sign(payload, jwtSecret);
    const req = {
        header: jest.fn().mockReturnValue(token)
    };
      const res = {};
      const next = {
        next: jest.fn()
      };
      auth(req, res, next);
      expect(req.user).toMatchObject(payload.user);

  });
});