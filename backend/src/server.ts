import { config } from './config/config';
import { connectDB } from './db/database';
import app from './app';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(Number(config.SERVER_PORT), () => {
      console.log(`Server running at http://localhost:${config.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
