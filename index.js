const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const keys = require('./config/keys');

const app = express();

let myCookie;

// Setup proxy
app.use('/api/*', (req,res,next) => {
  res.setHeader('Cookie', myCookie);
  next();
});

app.use('/', proxy(keys.serverHost, {
  filter: (req) => {
    console.log('FILTER', Object.keys(req.headers), req.headers.cookie);
    return (req.path.indexOf('/auth') === 0) || (req.path.indexOf('/api') === 0);
  }
}));
// Other setup
app.set('port', (process.env.PORT || 7107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/cookie', (req, res) => {
  console.log('headers', req.headers.cookie);
  myCookie = req.headers.cookie;
  res.redirect('/ratings');
});


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
