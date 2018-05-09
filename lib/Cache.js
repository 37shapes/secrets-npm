const fs = require('fs');

class SecretsCache {

  constructor(filePath) {
    if (typeof filePath !== 'string') {
      throw new Error('filePath has to be a valid file path');
    }
    this.filePath = filePath;
  }

  write(val) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, val, { encoding: 'utf8' }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`The file ${this.filePath} has been saved`);
        }
      });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = { SecretsCache };