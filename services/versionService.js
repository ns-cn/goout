const { version } = require('../utils/version');

function getVersionFromFile() {
  return version;
}

module.exports = { getVersionFromFile };
