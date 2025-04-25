import { config } from './config/config';
import { connectDB } from './db/database';
import express from 'express';
import cors from 'cors';
import dutyRoutes from './routes/duty.routes';

const app = express();

// Middleware
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  console.log('******* ====> API is running...');
  res.send('API is running...');
});
app.use('/api/v1/duties', dutyRoutes);


const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(Number(config.SERVER_PORT), () => {
      console.log(`Server running at http://localhost:${config.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
