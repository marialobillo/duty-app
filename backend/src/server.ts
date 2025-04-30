import { config } from './config/config';
import { connectDB } from './db/database';
import express from 'express';
import cors from 'cors';
import dutyRoutes from './routes/duty.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import logger from './config/logger';

const app = express();
const swaggerDocument = YAML.load('./swagger.yml')

// Middleware
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('******* ====> API is running...');
  res.send('API is running...');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/duties', dutyRoutes);


const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(Number(config.SERVER_PORT), () => {
      logger.info(`Server running at http://localhost:${config.SERVER_PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
  }
};

startServer();
