import { Request, Response } from 'express';
import { getAllDuties, createDuty, updateDuty, deleteDuty } from '../services/duty.service';
import Joi from 'joi';
import { Duty, DutyCreate } from '../models/duty.model';
import logger from './../config/logger';

const dutySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

export const getDuties = async (req: Request, res: Response): Promise<void> => {
  try {
    const duties: Duty[] = await getAllDuties();
    res.status(200).json(duties);
  } catch (error) {
    logger.error('Error fetching duties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createNewDuty = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = dutySchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  try {
    const newDuty: DutyCreate = await createDuty(value);
    res.status(201).json(newDuty);
  } catch (error) {
    logger.info('Error creating duty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateDutyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { error, value } = dutySchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  try {
    const updatedDuty = await updateDuty({ id: Number(id), ...value });
    if (!updatedDuty) {
      res.status(404).json({ message: 'Duty not found' });
      return;
    }
    res.status(200).json(updatedDuty);
  } catch (error) {
    logger.error('Error updating duty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteDutyById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  try {
    const deleted = await deleteDuty(id);
    if (!deleted) {
      res.status(404).json({ message: 'Duty not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting duty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};