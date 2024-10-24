const { getVersionFromFile } = require('../services/versionService');

function getVersion(req, res) {
  const version = getVersionFromFile();
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json({ version });
}

module.exports = { getVersion };
