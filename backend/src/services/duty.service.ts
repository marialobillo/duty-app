import pool from '../db/database';
import { Duty, DutyCreate, DutyUpdate } from '../models/duty.model';

export const getAllDuties = async (): Promise<Duty[]> => {
  const query = 'SELECT * FROM duties ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows as Duty[]
}

export const createDuty = async (duty: DutyCreate): Promise<Duty> => {
  let { title, description, completed } = duty;

  if (completed === undefined) {
    completed = false;
  }

  const query = `
    INSERT INTO duties (title, description, completed)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(query, [title, description, completed]);
  return result.rows[0] as Duty;
} 

export const updateDuty = async (duty: DutyUpdate): Promise<Duty | null> => {
  const { id, title, description, completed } = duty;

  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    values.push(title);
  }

  if (description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(description);
  }

  if (completed !== undefined) {
    fields.push(`completed = $${paramIndex++}`);
    values.push(completed);
  }

  if (fields.length === 0) {
    return null;
  }

  const query = `
    UPDATE duties
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${paramIndex}
    RETURNING *;
  `;

  values.push(id); 

  const result = await pool.query(query, values);
  return result.rows[0] as Duty;
};

export const deleteDuty = async (id: number): Promise<Duty | null> => {
  const query = 'DELETE FROM duties WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null; 
};
