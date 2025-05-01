import express from 'express';
import logger from './config/logger';

const app = express();

app.get('/', (_req, res) => {
  logger.info('✅ API is running...');
  res.send('API is running...');
});

app.listen(4000, () => {
  logger.info('🚀 Test server running on port 4000');
});
