const { error, secretsCredentialsPath } = require('./utils');
const { SecretsAPI } = require('../API');
const { SecretsFile } = require('../File');

module.exports = async (args) => {
  const api = new SecretsAPI();
  const credentialsFilePath = secretsCredentialsPath();
  const credentialsFile = new SecretsFile(credentialsFilePath);
  const { format, output } = args;

  let token;
  try {
    token = await credentialsFile.read();
  } catch (e) {
    error('Run secrets login at first', true);
  }

  let result;
  try {
    result = await api.secrets(token, format)
  } catch (e) {
    error(e.message, true);
  }

  if (output) {
    try {
      const outputFile = new SecretsFile(output);
      await outputFile.write(result);
      console.log(`Safely saved your secrets to ${output}`);
    } catch (e) {
      error(e.message, true);
    }
  } else {
    console.log(result);
  }

};
