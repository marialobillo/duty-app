import { Pool } from 'pg';
import { config } from '../config/config';
import logger from '../config/logger';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

export const connectDB = async (): Promise<void> => {
  try {
    await pool.query('SELECT NOW()'); 
    logger.info('✅ PostgreSQL connected successfully');
  } catch (error) {
    logger.error('❌ PostgreSQL connection error:', error);
  }
};

export default pool;
