const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');
const Room = require('./models/room');
const Message = require('./models/message');

const loginRoute = require('./routes/loginRoute');
const signUpRoute = require('./routes/sign-upRoute');
const usersAPI = require('./api/users-api');
const sendFrAPI = require('./api/sendFR-api');
const roomAPI = require('./api/room-api');

const app = express();
const server = http.createServer(app);
PORT = process.env.PORT || 5000;
const dbUri =
  'mongodb+srv://shaiM:talkback123@talkbackusersdb.rdkrp.mongodb.net/TalkBackUserDb?retryWrites=true&w=majority';

//==================Middleware==================

mongoose.connect(dbUri);
const connection = mongoose.connection;
connection.once('open', () => console.log('database connected successfully'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.use(morgan('tiny'));

//==================Socket.Io==================

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const connectedUsers = [];

function getRoom(user1Id, user2Id) {
  Room.findOne({ user1Id: user1Id, user2Id: user2Id }).then((room1) => {
    if (room1 !== null) {
      return room1._id;
    } else {
      Room.findOne({ user1Id: user2Id, user2Id: user1Id }).then((room2) => {
        return room2._id;
      });
    }
  });
}

io.on('connection', (socket) => {
  console.log('User ' + socket.id + ' is connected');

  socket.on('new_user', (data) => {
    let flag = false;
    connectedUsers.map((u) => {
      if (data === u.userId) flag = true;
    });
    if (!flag) {
      connectedUsers.push({ sockerId: socket.id, userId: data });
      console.log(connectedUsers);
    }
  });

  socket.emit('online_users', connectedUsers);

  socket.on('join_room', (data) => {
    socket.join(getRoom(data.user1Id, data.user2Id));
  });

  socket.on('send_message', (data) => {
    const message = new Message({
      senderId: data.senderId,
      reciverId: data.reciverId,
      content: data.content,
      date: data.date
    });
    message.save();

    socket
      .to(getRoom(data.senderId, data.reciverId))
      .emit('receive_message', data);
  });

  socket.on('chat_history', (data) => {
    Message.find({
      $or: [
        {
          senderId: data.user1Id,
          reciverId: data.user2Id
        },
        {
          senderId: data.user2Id,
          reciverId: data.user1Id
        }
      ]
    }).then((res) => {
      if (res !== null || res !== undefined) {
        var arr = [];
        res.map((msg) => {
          arr.push(msg);
          socket.emit('receive_history', arr);
        });
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected ' + socket.id);
    let count = 0;
    connectedUsers.map((user) => {
      if (user.sockerId === socket.id) {
        connectedUsers.splice(count, 1);
      }
      count++;
    });
    console.log(connectedUsers);
  });
});

//==================Routes==================

app.use('/login', loginRoute);
app.use('/sign-up', signUpRoute);
app.use('/api/users', usersAPI);
app.use('/api/fr', sendFrAPI);
app.use('/api/room', roomAPI);

//==================Start Server==================

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
