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

const loginRoute = require('./routes/loginRoute');
const signUpRoute = require('./routes/sign-upRoute');
const usersAPI = require('./api/users-api');
const chatAPI = require('./api/chat-api');

const app = express();
const server = http.createServer(app);
PORT = process.env.PORT || 5000;
const dbUri =
  'mongodb+srv://shaiM:talkback123@talkbackusersdb.rdkrp.mongodb.net/TalkBackUserDb?retryWrites=true&w=majority';

//===================Middleware======================

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

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User ' + socket.id + 'is connected');

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  });
  socket.on('disconnect', () => {
    console.log('User disconnected ' + socket.id);
  });
});

//===================Routes========================

app.use('/login', loginRoute);
app.use('/sign-up', signUpRoute);
app.use('/api/users', usersAPI);
app.use('/chat-api', chatAPI);

//===================Start Server==================

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
