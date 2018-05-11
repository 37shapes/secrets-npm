const path = require('path');
const os = require('os');

function error(message, exit) {
  console.error(message);
  if (exit) process.exit(1);
}

function secretsCredentialsPath() {
  return path.join(secretsDirPath(), '/credentials');
}

function secretsDirPath() {
  return path.join(os.homedir(), '/.secrets');
}

module.exports = { error, secretsCredentialsPath };