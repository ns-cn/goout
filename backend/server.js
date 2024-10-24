const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');
const { setupMiddleware } = require('./config/middleware');
const { PORT } = require('./config/constants');

const app = express();

setupMiddleware(app);
setupRoutes(app);

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 为 Vercel 导出处理函数
module.exports = app;
