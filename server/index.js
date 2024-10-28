const express = require('express');
const path = require('path');
require('dotenv').config();

// 导入中间件
const corsMiddleware = require('./middleware/cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { handleFrontend } = require('./middleware/static');

// 导入路由
const apiRoutes = require('./routes/api');

const app = express();

// 调试信息
console.log('初始化服务器，环境信息：', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  PORT: process.env.PORT
});

// 应用中间件
app.use(corsMiddleware);
app.use(express.json());
app.use(requestLogger);

// API 路由
app.use('/api', apiRoutes);

// 静态文件服务
app.use('/', express.static(path.join(__dirname, '../frontend/dist')));

// 所有其他请求都交给 handleFrontend 处理
app.get('*', handleFrontend);

// 错误处理
app.use(errorLogger);

module.exports = app;
