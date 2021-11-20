const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = {
  user1Id: {
    type: String,
    required: true
  },
  user2Id: {
    type: String,
    required: true
  }
};

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
