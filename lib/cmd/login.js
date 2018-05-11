const path = require('path');
const os = require('os');
const { error } = require('./error');
const { SecretsAPI } = require('../API');
const { SecretsFile } = require('../File');

module.exports = async (args) => {
  const api = new SecretsAPI();
  const filePath = path.join(os.homedir(), '/.secrets/credentials');
  const file = new SecretsFile(filePath);

  const { email, password } = args;
  let authToken;
  try {
    authToken = await api.login(email, password);
  } catch (e) {
    if (e.message === 'UNAUTHORIZED') {
      error('Email or password are invalid', true);
    } else {
      error(e.message, true);
    }
  }

  try {
    await file.write(authToken);
    console.log(`We saved credentials token in ${filePath}`)
  } catch (e) {
    error(e.message, true);
  }

};
