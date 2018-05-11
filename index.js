const path = require('path');
const minimist = require('minimist');

function readConfig() {
  const cwd = process.cwd();
  try {
    return require(path.join(cwd, '/.secretsrc.json'));
  } catch (e) {
    return {};
  }
}

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0] || 'help';

  switch (cmd) {
    case 'help':
      require('./lib/cmd/help')(args);
      break;

    case 'login':
      require('./lib/cmd/login')(args);
      break;

    case 'pull':
      const config = readConfig();
      const mergedArgs = Object.assign({}, config, args);
      if (mergedArgs.output === 'false') delete mergedArgs.output;
      require('./lib/cmd/pull')(mergedArgs);
      break;

    default:
      console.error(`'${cmd}' is not a valid command!`);
      require('./lib/cmd/help')(args);
  }
};