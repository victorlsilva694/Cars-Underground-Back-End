const express = require('express');
const app = express();
const router = express.Router();
const index = require('./Routes/Routes');
const passport = require('passport');
const flash = require('flash');
const session = require('express-session');
const cors = require("cors");
require('./config/auth')(passport)

app.use(session({
    secret: 'underground',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2 * 60 * 10000000}
}));
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

function verifyAuth(req, res, next){
  console.log(req)
  next()
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(verifyAuth);
app.use(router)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', index);

module.exports = app;