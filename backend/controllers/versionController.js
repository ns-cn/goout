const { getVersionFromFile } = require('../services/versionService');

function getVersion(req, res) {
  const version = getVersionFromFile();
  res.json({ version });
}

module.exports = { getVersion };
