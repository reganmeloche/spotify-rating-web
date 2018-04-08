'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const keys = require('./config/keys');
let myCookie;

const app = express();

// Other setup
app.set('port', (process.env.PORT || 7107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/api/*', (req, res, next) => {
  console.log('middleware cookie: ', req.headers.cookie);
  if (myCookie) {
    console.log('my cookie: ', myCookie);
    res.headers = {
      cookie: myCookie, //req.headers.cookie,
    };
  }
  next();
});

app.post('/cookie', (req, res) => {
  console.log('cookie', req.headers.cookie);
  let result = false;
  if (req.headers.cookie) {
    myCookie = req.headers.cookie;
    result = true;
  }
  res.status(200).json({ set: result });
});

// Setup proxy
app.use('/', proxy(keys.serverHost, {
  filter: (req) => {
    return (req.path.indexOf('/auth') === 0) ||(req.path.indexOf('/api') === 0);
  }
}));

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log(`Listening on port: ${app.get('port')}`);
});

module.exports = server;
