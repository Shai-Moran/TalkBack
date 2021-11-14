const router = require('express').Router();
const json = require('body-parser');
const passport = require('passport');
let User = require('../models/user');

router.route('/').post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send(false);
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user);
      });
    }
  })(req, res, next);
});

module.exports = router;
