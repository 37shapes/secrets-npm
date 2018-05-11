const menus = {
  main: `
Usage: secrets-cli [command] <OPTIONS>

Commands:
  login                                       Log in to a Secrets service
  get                                         List variables
`,
  login: `
Usage: secrets-cli login <OPTIONS>

  Options:
    --email string                            Email
    --password string                         Password
`,
  get: `
Usage: secrets-cli get <OPTIONS>

  Options:
    --format string                           Output format (default json.formatted)
                                              values: env, json, json.formatted
`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};