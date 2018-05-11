const menus = {
  main: `
Usage: secrets-cli [command] <options>

COMMANDS:
  login --email string --password string      Log in to a Secrets service`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};