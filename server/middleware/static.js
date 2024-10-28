const path = require('path');
const express = require('express');

const handleFrontend = (req, res) => {
  const staticPath = path.join(__dirname, '../../frontend/dist');
  const indexPath = path.join(staticPath, 'index.html');
  
  console.log('请求路径:', req.path);
  console.log('静态文件目录:', staticPath);
  
  // 处理根路径请求
  if (req.path === '/') {
    console.log('处理根路径请求');
    return res.sendFile(indexPath);
  }
  
  // 处理静态资源
  const filePath = path.join(staticPath, req.path);
  console.log('尝试访问文件:', filePath);
  
  if (require('fs').existsSync(filePath)) {
    console.log('文件存在，发送文件:', filePath);
    return res.sendFile(filePath);
  }
  
  // 如果文件不存在，返回 index.html（用于客户端路由）
  console.log('文件不存在，返回 index.html');
  res.sendFile(indexPath);
};

module.exports = { handleFrontend };
