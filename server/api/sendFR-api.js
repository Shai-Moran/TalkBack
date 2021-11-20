const router = require('express').Router();
const User = require('../models/user');
const Room = require('../models/room');

router.route('/').post((req, res) => {
  var reqIsUp = false;
  User.findOne({ username: req.body.username })
    .then((user) => {
      user.friendRequests.map((reqId) => {
        if (reqId === req.body.senderId) reqIsUp = true;
      });
      if (!reqIsUp) {
        user.friendRequests.push(req.body.senderId);
        user.save().then(() => res.send('Friend request sended!'));
      } else {
        res.send('Request already sended');
      }
    })
    .catch(() => res.send('User not found!'));
});

router.route('/update').put((req, res) => {
  User.findById(req.body.id)
    .then((user) => {
      let count = 0;
      let index = 0;
      user.friendRequests.map((sId) => {
        User.findById(sId)
          .then((u) => {
            if (u.username !== req.body.senderUN) {
              count++;
            } else {
              index = count;
            }
          })
          .catch((err) => res.sendStatus(400).json('Error: ' + err));
      });
      let tempId = user.friendRequests[index];
      user.friendRequests.splice(index, 1);
      user.contacts.push(tempId);
      User.findOne({ username: req.body.senderUN }).then((user2) => {
        const room = new Room({
          user1Id: user._id,
          user2Id: user2._id
        });
        room.save();
        user2.contacts.push(req.body.id);
        user2.save();
        user
          .save()
          .then(() => res.send('Contact Added!'))
          .catch((err) => res.sendStatus(400).json('Error: ' + err));
      });
    })
    .catch((err) => res.sendStatus(400).json('Error: ' + err));
});

module.exports = router;
