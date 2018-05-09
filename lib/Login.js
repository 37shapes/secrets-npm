const http = require('http');

const DEFAULT_OPTS = {
  method: 'POST',
  protocol: 'http:',
  hostname: 'localhost',
  port: 3000,
  path: '/signin',
  headers: {
    'Content-Type': 'application/json',
  }
};

class SecretsLogin {

  getErrorForStatusCode(statusCode) {
    switch (statusCode) {
      case 403:
        return new Error('Invalid credentials. Try to login again');
      default:
        return new Error('Unknown error happened while retrieving data from the server');
    }
  }

  request(email, password) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({email, password});
      const opts = {
        ...DEFAULT_OPTS,
        headers: {
          ...DEFAULT_OPTS.headers,
          'Content-Length': Buffer.byteLength(postData),
        }
      };
      const req = http.request(opts, (res) => {
        if (res.statusCode !== 201) {
          const err = this.getErrorForStatusCode(res.statusCode);
          reject(err);
          return;
        }

        const cookieHeader = res.headers['set-cookie'][0].split(';')[0];
        resolve(cookieHeader);
      });

      req.on('error', err => reject(err));

      req.write(postData);
      req.end();
    });
  }

}

module.exports = { SecretsLogin };

'connect.sid=s%3Ad_nYBF0HxFkJK2DiIfxUPI8baJIvMxbK.YymkBEuo1A89TrdGpA3hyWYb24AYva2wMToGuj%2BSbpQ';
