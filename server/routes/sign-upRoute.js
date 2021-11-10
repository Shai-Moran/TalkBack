const router = require('express').Router();
const axios = require('axios');
let User = require('../models/user');
const bcrypt = require('bcrypt');

router.route('/').post(async (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const contacts = req.body.contacts;

  const newUser = new User({
    username: username,
    password: hashedPassword,
    contacts: contacts
  });

  User.findOne({username: newUser.username}).then((user) => {
    if (user === null) {
      newUser
        .save()
        .then(() => res.json('user added'))
        .catch((err) => res.status(400).json('Error: ' + err));
    } else {
      res.send('username is taken');
    }
  });
});

module.exports = router;
