const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');
const { setupMiddleware } = require('./config/middleware');
const { PORT } = require('./config/constants');

const app = express();

setupMiddleware(app);
setupRoutes(app);

// 仅在非 Vercel 环境中启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 导出 app 以供 Vercel 使用
module.exports = app;
