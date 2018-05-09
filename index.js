const path = require('path');
const { SecretsLogin } = require('./lib/Login');
const { SecretsRequest } = require('./lib/Request');
const { SecretsCache } = require('./lib/Cache');

async function main() {
  const login = new SecretsLogin();
  let authToken;
  try {
    authToken = await login.request('alex@khom', 'password');
    console.log(authToken);
  } catch (e) {
    console.log(e);
    throw e;
  }

  const secrets = new SecretsRequest(authToken);
  const cache = new SecretsCache(path.join(__dirname, '.env'));

  secrets.request()
    .then((data) => {
      cache.write(data);
      console.log(data);
    }, (err) => {
      cache.read()
        .then((data) => {
          console.log(data);
        }, (err) => {
          if (err.code === 'ENOENT') {
            console.error('Can not find cached version of the environment');
          }
          console.error(err);
        });
    });
}

main();