const User = require("../models/User");
const connect = require("../db.js");

const UserGetController = (req, res) => {
    connect();

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return console.error(err);
        res.json(user);
    });
};

module.exports = UserGetController;
