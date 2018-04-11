const axios = require('axios');
const keys = require('../config/keys');

module.exports = {
  getByUserId: function(id) {
    const url = `${keys.serverHost}/api/user/${id}`;
    return axios.get(url)
      .then(res => res.data)
      .catch((err) => { throw err});
  },

  findOrCreate: function(user) {
    const getUrl = `${keys.serverHost}/api/userprofile/${user.profileId}`;
    return axios.get(getUrl)
      .then((result) => result.data)
      .catch((err) => {
        if (err.response.status === 404) {
          const postUrl = `${keys.serverHost}/api/user`;
          return axios.post(postUrl, user)
            .then((result) => result.data)
            .catch((err) => { throw err; });
        } else {
          throw err;
        }
      })
  }
}
