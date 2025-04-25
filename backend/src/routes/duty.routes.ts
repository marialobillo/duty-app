import { Router } from 'express';
import { getDuties, createNewDuty } from '../controllers/duty.controller';


const router = Router();

router.get('/', getDuties);
router.post('/', createNewDuty);

export default router;
