const path = require('path');

const { SecretsAPI } = require('./lib/API');
const { SecretsCache } = require('./lib/Cache');

async function main() {
  const api = new SecretsAPI();

  let authToken;
  try {
    authToken = await api.login('alex@khom', 'password');
    console.log(authToken);
  } catch (e) {
    console.log(e);
  }

  const cacheFilePath = path.join(__dirname, '.env');
  const cache = new SecretsCache(cacheFilePath);

  let secrets;
  try {
    secrets = await api.secrets(authToken);
    await cache.write(secrets);
  } catch (e) {
    console.log(e);
    try {
      secrets = await cache.read();
    } catch (e) {
      console.log(e);
    }
  }
  console.log(secrets);
}

main();