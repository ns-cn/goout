const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://go.tangyujun.com',
  'https://go.tangyujun.com/'
];

const corsMiddleware = cors({
  origin: function(origin, callback) {
    console.log('收到来自以下域名的请求:', origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn('请求被CORS策略拒绝:', origin);
      callback(new Error('不允许的来源'));
    }
  },
  credentials: true
});

module.exports = corsMiddleware;
