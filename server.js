require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { version } = require('./version');
const { whitelistedUsernames } = require('./config');

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'https://your-production-url.com'],
  credentials: true
}));
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

connectToDatabase();

app.get('/api/version', (req, res) => {
  res.json({ version });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!whitelistedUsernames.includes(username)) {
    return res.status(403).json({ error: '该用户名不在白名单中' });
  }
  
  const usersCollection = client.db("goout").collection("users");
  
  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: '该用户名已注册' });
  }
  
  await usersCollection.insertOne({ username, password });
  res.json({ message: '注册成功' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!whitelistedUsernames.includes(username)) {
    return res.status(403).json({ error: '该用户名不在白名单中' });
  }
  
  const usersCollection = client.db("goout").collection("users");
  
  const user = await usersCollection.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  
  res.json({ message: '登录成功' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
