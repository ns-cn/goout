const versionRoutes = require('./versionRoutes');
const helloRoutes = require('./helloRoutes');

function setupRoutes(app) {
  app.use('/api', versionRoutes);
  app.use('/api', helloRoutes);
}

module.exports = { setupRoutes };
