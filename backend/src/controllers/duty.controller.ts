import { Request, Response } from 'express';
import { getAllDuties, createDuty } from '../services/duty.service';
import Joi from 'joi';
import { Duty, DutyCreate } from '../models/duty.model';

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
    console.error('Error fetching duties:', error);
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
    console.log('Error creating duty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}