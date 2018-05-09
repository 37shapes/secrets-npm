const http = require('http');

const DEFAULT_OPTS = {
  method: 'GET',
  protocol: 'http:',
  hostname: 'localhost',
  port: 3000,
  path: '/secrets/env',
};

class SecretsRequest {

  constructor(AUTH_TOKEN) {
    if (typeof AUTH_TOKEN !== 'string') throw new Error('AUTH_TOKEN has to be provided');
    this.opts = {
      ...DEFAULT_OPTS,
      headers: {
        Cookie: AUTH_TOKEN,
      },
    };
  }

  getErrorForStatusCode(statusCode) {
    switch (statusCode) {
      case 403:
        return new Error('Invalid credentials. Try to login again');
      default:
        return new Error('Unknown error happened while retrieving data from the server');
    }
  }

  request() {
    return new Promise((resolve, reject) => {
      const req = http.request(this.opts, (res) => {
        if (res.statusCode !== 200) {
          const err = this.getErrorForStatusCode(res.statusCode);
          reject(err);
          return;
        }

        res.setEncoding('utf8');
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });

      req.on('error', err => reject(err));

      // if need to send POST, use req.write() before req.end()
      req.end();
    });
  }

}

module.exports = { SecretsRequest };
