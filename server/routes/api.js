const express = require('express');
const router = express.Router();
const { VERSION } = require('../version');

// API路由
router.get('/hello', (req, res) => {
  console.log('处理 /api/hello 请求');
  res.json({ 
    message: '你好，世界！',
    version: VERSION,
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV
    }
  });
});

// 健康检查端点
router.get('/health', (req, res) => {
  console.log('处理健康检查请求');
  res.json({ 
    status: 'ok',
    version: VERSION 
  });
});

module.exports = router;
