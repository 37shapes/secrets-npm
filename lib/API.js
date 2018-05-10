const { SecretsUtils } = require('./Utils');

const DEFAULT_OPTS = {
  protocol: 'http:',
  hostname: 'localhost',
  port: 3000,
};

class SecretsAPI extends SecretsUtils {

  login(email, password) {
    if (typeof email !== 'string' || typeof password !== 'string') throw new Error('email and password are required');

    const opts = {
      ...DEFAULT_OPTS,
      method: 'POST',
      path: '/signin'
    };
    return this._request(opts, {email, password})
      .then(({headers}) => {
        return headers['set-cookie'][0].split(';')[0];
      });
  }

  secrets(token) {
    if (typeof token !== 'string') throw new Error('token is required');

    const opts = {
      ...DEFAULT_OPTS,
      path: '/secrets',
      headers: {
        'Cookie': token,
      },
    };
    return this._request(opts).then(({body}) => body);
  }

}

module.exports = { SecretsAPI };
