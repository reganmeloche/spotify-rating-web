const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const Users = require('./userLib');

const callbackURL = `${keys.host}/auth/callback`;

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  Users.getByUserId(userId)
    .then((result) => {
      done(null, result);
    }).catch((err) => {
      done(err);
    });
});

passport.use(new SpotifyStrategy(
{
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL,
},
(accessToken, refreshToken, expiresIn, profile, done) => {
  let email = '';
  if (profile.emails && profile.emails.length > 0) {
    email = profile.emails[0].value;
  }
  Users.findOrCreate({
    profileId: profile.id,
    email,
    accessToken,
    refreshToken,
    expiresIn,
  }).then((result) => done(null, result))
  .catch((err) => done(err));
}));
  