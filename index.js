'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');

const app = express();

// Session setup
app.use(cookieSession({
  maxAge: keys.sessionHours * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());

// Ensure authentication and attach user
app.use('/api/*', (req, res, next) => {
  if (req.user) {
    req.headers.userid = req.user.userId;
    next();
  } else {
    res.redirect('/');
  }
})

// Setup proxy
app.use('/', proxy(keys.serverHost, {
  filter: (req) => {
    return (req.path.indexOf('/api') === 0);
  }
}));

// Other setup
app.set('port', (process.env.PORT || 7107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require('./src/passport');
require('./src/authHandlers')(app);

// Prod setup
if (process.env.NODE_ENV === 'production') {
  // express serves up production assets (main.js, main.css, etc)
  // if any get request comes in and we don't have a handler,
  // then look into that directory and see if we can find it
  app.use(express.static('client/build'));

  // express serves up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log(`Listening on port: ${app.get('port')}`);
});

module.exports = server;