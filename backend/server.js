const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');
const { setupMiddleware } = require('./config/middleware');
const { PORT } = require('./config/constants');

const app = express();

console.log('Setting up middleware...');
app.use(cors());
app.use(express.json());

console.log('Setting up routes...');
setupRoutes(app);

console.log('Setting up static file serving...');
setupMiddleware(app);

// 仅在非 Vercel 环境中启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
} else {
  console.log('Running in production mode, not starting server directly.');
}

// 导出 app 以供 Vercel 使用
module.exports = app;
