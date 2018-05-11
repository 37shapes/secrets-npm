function error(message, exit) {
  console.error(message);
  if (exit) process.exit(1);
}

module.exports = { error };