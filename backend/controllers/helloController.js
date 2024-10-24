function sayHello(req, res) {
  res.json({ message: '你好,世界!' });
}

module.exports = { sayHello };
