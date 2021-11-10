const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan')

const loginRoute = require('./routes/loginRoute');
const signUpRoute = require('./routes/sign-upRoute');
const usersAPI = require('./api/users-api');

const app = express();
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


//===================Routes========================

app.use('/login', loginRoute);
app.use('/sign-up', signUpRoute);
app.use('/api/users', usersAPI);

//===================Start Server==================

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
