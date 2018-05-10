const http = require('http');

class SecretsUtils {
  // ======
  // API
  // ======
  getErrorWhileMakingRequest(error) {
    switch (error.code) {
      case 'ECONNREFUSED':
        return new Error('SERVICE_IS_UNAVAILABLE');
      default:
        return new Error('UNKNOWN_ERROR_WHILE_REQUEST');
    }
  }

  getErrorForStatusCode(statusCode) {
    switch (statusCode) {
      case 403:
        return new Error('UNAUTHORIZED');
      default:
        return new Error('UNKNOWN_ERROR');
    }
  }

  _request(opts, body) {
    return new Promise((resolve, reject) => {
      let bodyJSON;
      if (body) {
        bodyJSON = JSON.stringify(body);
        opts.headers = {
          ...opts.headers,
          'Content-Length': Buffer.byteLength(bodyJSON),
          'Content-Type': 'application/json',
        };
      }

      const req = http.request(opts, (res) => {
        if (res.statusCode >= 300) {
          const err = this.getErrorForStatusCode(res.statusCode);
          reject(err);
          return;
        }

        res.setEncoding('utf8');
        const headers = res.headers;
        const statusCode = res.statusCode;
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve({ headers, statusCode, body }));
      });

      req.on('error', (error) => {
        const err = this.getErrorWhileMakingRequest(error);
        reject(err);
        return;
      });

      if (bodyJSON) {
        req.write(bodyJSON);
      }
      req.end();
    });
  }

  // ======
  // Cache
  // ======
  getErrorForReadFile(err) {
    switch (err.code) {
      case 'ENOENT':
        return new Error('READ_FILE_NOT_FOUND');
      default:
        return new Error('READ_UNKNOWN_ERROR')
    }
  }

  getErrorForWriteFile(err) {
    switch (err.code) {
      default:
        return new Error('WRITE_UNKNOWN_ERROR')
    }
  }

}

module.exports = { SecretsUtils };