const cors = require('cors');
const express = require('express');
const path = require('path');

function setupMiddleware(app) {
  app.use(cors());
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });
  }
}

module.exports = { setupMiddleware };
