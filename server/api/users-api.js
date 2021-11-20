const router = require('express').Router();
let User = require('../models/user');

// Getting all users from database
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Get user by Id
router.route('/get-user').post((req, res) => {
  User.findById(req.body._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
