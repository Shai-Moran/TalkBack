const router = require('express').Router();
const Messge = require('../models/message');

// Gets a object with two user IDs and sends back ther all chat history

router.route('/').get((req, res) => {
  Messge.find(
    (user1Id, user2Id) =>
      (user1Id._id === req.body.user1Id && user2Id._id === req.body.user2Id) ||
      (user2Id._id === req.body.user1Id && user1Id._id === req.body.user2Id)
  )
    .then((messages) => res.json(messages))
    .catch((err) => res.sendStatus(400).json('Error: ' + err));
});

module.exports = router;
