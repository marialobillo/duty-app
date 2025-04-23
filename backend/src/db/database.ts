import { Pool } from 'pg';
import { config } from '../config/config';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

export const connectDB = async (): Promise<void> => {
  try {
    await pool.query('SELECT NOW()'); 
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export default pool;
