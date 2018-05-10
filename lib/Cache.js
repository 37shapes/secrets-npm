const fs = require('fs');
const { SecretsUtils } = require('./Utils');

class SecretsCache extends SecretsUtils {

  constructor(filePath) {
    super();
    if (typeof filePath !== 'string') throw new Error('filePath is required');
    this.filePath = filePath;
  }

  write(val) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, val, { encoding: 'utf8' }, (err) => {
        if (err) {
          const newError = this.getErrorForWriteFile(err);
          reject(newError);
          return;
        } else {
          resolve(`The file ${this.filePath} has been saved`);
          return;
        }
      });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          const newError = this.getErrorForReadFile(err);
          reject(newError);
          return;
        } else {
          resolve(data);
          return;
        }
      });
    });
  }

}

module.exports = { SecretsCache };