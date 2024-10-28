const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('请求头:', req.headers);
  next();
};

const errorLogger = (err, req, res, next) => {
  console.error('发生错误:', err);
  res.status(500).json({ error: err.message });
};

module.exports = {
  requestLogger,
  errorLogger
};
