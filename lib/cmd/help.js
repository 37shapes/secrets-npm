const menus = {
  main: `
Usage: secrets [command] <OPTIONS>

Commands:
  login                                       Log in to the Secrets service
  pull                                        Pull variables from the Secrets service
`,
  login: `
Usage: secrets login <OPTIONS>

  Options:
    --email string                            Email
    --password string                         Password
`,
  pull: `
Usage: secrets pull <OPTIONS>

  Options:
    --format string                           Output format (default json.formatted)
                                              values: env, json, json.formatted
    --output filename                         Write output to a file
`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};