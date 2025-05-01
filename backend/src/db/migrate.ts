import { readFile } from 'fs/promises';
import pool from './database';
import logger from './../config/logger';

const runMigration = async () => {
  try {
    const sql = await readFile(__dirname + '/migrations/init.sql', 'utf8');
    await pool.query(sql);
    logger.info('Migration executed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
