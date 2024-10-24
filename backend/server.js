const express = require('express');
const cors = require('cors');
const path = require('path');
const { version } = require('./version');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 修改获取版本号的路由
app.get('/api/version', (req, res) => {
  res.json({ version });
});

// API 路由
app.get('/api/hello', (req, res) => {
  res.json({ message: '你好,世界!' });
});

// 在生产环境中服务前端静态文件
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
