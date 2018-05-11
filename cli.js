const minimist = require('minimist');

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

    case 'get':
      require('./lib/cmd/get')(args);
      break;

    default:
      console.error(`'${cmd}' is not a valid command!`);
      require('./lib/cmd/help')(args);
  }
};