const User = require('../models/User');
const connect = require('../db.js');

const UserGetController = async (req, res, next) => {
  connect();

  try {
    const user = await User.findOne({ username: req.query.username });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = UserGetController;
