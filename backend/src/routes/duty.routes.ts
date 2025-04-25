import { Router } from 'express';
import { getDuties, createNewDuty, updateDutyById, deleteDutyById } from '../controllers/duty.controller';


const router = Router();

router.get('/', getDuties);
router.post('/', createNewDuty);
router.put('/:id', updateDutyById);
router.delete('/:id', deleteDutyById)

export default router;
