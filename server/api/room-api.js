const router = require('express').Router();
const Room = require('../models/room');

router.route('/get').post((req, res) => {
  const user1Id = req.body.user1Id;
  const user2Id = req.body.user2Id;
  console.log(req.body.user1Id);
  console.log(req.body.user2Id);

  Room.findOne({ user1Id: user1Id, user2Id: user2Id })
    .then((room1) => {
      console.log(room1);
      if (room1 !== null) res.send(room1);
      else {
        Room.findOne({ user1Id: user2Id, user2Id: user1Id })
          .then((room2) => {
            console.log(room2);
            res.send(room2);
          })
          .catch((err) => res.sendStatus(400).json('Error: ' + err));
      }
    })
    .catch((err) => res.sendStatus(400).json('Error: my' + err));
});

module.exports = router;
