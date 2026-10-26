import { Router } from 'express';
import { getQuestions, checkAnswer } from '../controllers/quiz.controller';
import { validateCheckAnswer } from '../middleware/validate';

const router = Router();

router.get('/questions', getQuestions);
router.post('/check', validateCheckAnswer, checkAnswer);

export default router;
