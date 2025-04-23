import pool from '../db/database';
import { Duty } from '../models/duty.model';

export const getAllDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows as Duty[]
}

export const createDuty = async (duty: CreateDuty): Promise<Duty> => {
  const { title, description, completed } = duty;

  const query = `
    INSERT INTO duties (title, description, completed)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(query, [title, description, completed]);
  return result.rows[0] as Duty;
} 