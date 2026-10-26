import { Request, Response } from 'express';
import quizService from '../services/quiz.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export function getQuestions(_req: Request, res: Response): void {
  const questions = quizService.getAllQuestions();
  sendSuccess(res, questions);
}

export function checkAnswer(req: Request, res: Response): void {
  const { questionId, selectedIndex } = req.body;

  const result = quizService.checkAnswer(questionId, selectedIndex);

  if (!result) {
    sendError(res, 'Question not found', 404);
    return;
  }

  sendSuccess(res, result);
}
