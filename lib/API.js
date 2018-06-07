const { SecretsUtils } = require('./Utils');

const DEFAULT_OPTS = {
  protocol: 'https:',
  hostname: 'secrets.37shapes.com',
  port: 443,
};

class SecretsAPI extends SecretsUtils {

  login(email, password) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('`email` and `password` are required');
    }

    const opts = {
      ...DEFAULT_OPTS,
      method: 'POST',
      path: '/api/v1/signin'
    };
    return this._request(opts, { email, password })
      .then(({ headers }) => {
        return headers['set-cookie'][0].split(';')[0];
      });
  }

  pull(token, format = 'json.formatted') {
    if (typeof token !== 'string') throw new Error('token is required');
    const SUPPORTED_FORMATS = ['env', 'json', 'json.formatted'];

    if (SUPPORTED_FORMATS.indexOf(format) === -1) throw new Error('Unsupported format');

    const opts = {
      ...DEFAULT_OPTS,
      path: `/api/v1/secrets/${format}`,
      headers: {
        'Cookie': token,
      },
    };
    return this._request(opts).then(({ body }) => body);
  }

}

module.exports = { SecretsAPI };
