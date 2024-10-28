const cors = require('cors');
const express = require('express');
const path = require('path');

function setupMiddleware(app) {
  console.log('Setting up middleware...');
  app.use(cors());
  app.use(express.json());

  console.log('Setting up static file serving...');
  
  // 提供静态文件
  app.use(express.static(path.join(__dirname, '../public')));
  
  // 对于所有不匹配的非 API 路由，返回 index.html
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
      next();
    }
  });
}

module.exports = { setupMiddleware };
