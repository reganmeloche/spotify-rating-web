const passport = require('passport');

const scope = ['user-read-email', 'user-read-private', 'user-library-read'];

module.exports = function (app) {
  app.get('/auth', passport.authenticate('spotify', { scope }));

  app.get(
    '/auth/callback', 
    passport.authenticate('spotify', { failureRedirect: '/' }), 
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/user', (req, res) => {
    res.send(req.user);
  });

  /*
  app.get('/profile', getToken, async (req, res) => {
    let result;
    let status = 400;
    if (req.validToken) {
      try {
        const tokenRes = await axios({
          method: 'get',
          url: `${keys.spotifyRoot}/v1/me`,
          headers: { Authorization: `Bearer ${req.validToken}` },
        });
        result = tokenRes.data;
        status = 200;
      } catch (err) {
        result = err;
      }
    } else {
      result = { error: 'no token' };
    }
    res.status(status).json(result);
  });
  */
}
