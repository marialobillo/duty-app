import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  console.log('✅ API is running...');
  res.send('API is running...');
});

app.listen(4000, () => {
  console.log('🚀 Test server running on port 4000');
});
