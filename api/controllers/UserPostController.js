const User = require('../models/User');
const connect = require('../db.js');

const UserPostController = (req, res, next) => {
  connect();

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => next(err));
};

module.exports = UserPostController;
