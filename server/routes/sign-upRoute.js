const router = require('express').Router();
const axios = require('axios');
let User = require('../models/user');
const bcrypt = require('bcrypt');

router.route('/').post(async (req, res) => {
  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const contacts = req.body.contacts;

  const newUser = new User({
    username: username,
    password: hashedPassword,
    contacts: contacts
  });

  User.findOne({ username: newUser.username }).then((user) => {
    if (!user) {
      newUser
        .save()
        .then(() => res.send(true))
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
      res.send(false);
    }
  });
});

module.exports = router;
