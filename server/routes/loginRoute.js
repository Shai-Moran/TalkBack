const router = require('express').Router();
const json = require('body-parser');
const passport = require('passport');
let User = require('../models/user');

router.route('/').post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.sendStatus(313);
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    }
  })(req, res, next);
});

module.exports = router;
