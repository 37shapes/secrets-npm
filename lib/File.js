const fs = require('fs');
const path = require('path');
const { SecretsUtils } = require('./Utils');

class SecretsFile extends SecretsUtils {

  constructor(filePath) {
    super();
    if (typeof filePath !== 'string') throw new Error('filePath is required');
    this.filePath = filePath;
  }

  write(val) {
    return new Promise((resolve, reject) => {
      const dirPath = path.dirname(this.filePath);
      if (!fs.existsSync(dirPath)) {
        super.mkdir(dirPath);
      }
      fs.writeFile(this.filePath, val, { encoding: 'utf8' }, (err) => {
        if (err) {
          const newError = this.getErrorForWriteFile(err);
          reject(newError);
          return;
        } else {
          resolve(`File ${this.filePath} has been saved`);
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

module.exports = { SecretsFile };