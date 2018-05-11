const { error, secretsCredentialsPath } = require('./utils');
const { SecretsAPI } = require('../API');
const { SecretsFile } = require('../File');

module.exports = async (args) => {
  const api = new SecretsAPI();
  const filePath = secretsCredentialsPath();
  const file = new SecretsFile(filePath);
  const { format } = args;

  let token;
  try {
    token = await file.read();
  } catch (e) {
    error('Run secrets-cli login at first', true);
  }

  try {
    console.log(await api.secrets(token, format));
  } catch (e) {
    error(e.message, true);
  }

};
