import { readFile } from 'fs/promises';
import pool from './database';

const runMigration = async () => {
  try {
    const sql = await readFile(__dirname + '/migrations/init.sql', 'utf8');
    await pool.query(sql);
    console.log('Migration executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
