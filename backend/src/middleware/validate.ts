import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export function validateCheckAnswer(req: Request, res: Response, next: NextFunction): void {
  const { questionId, selectedIndex } = req.body;

  if (!questionId || typeof questionId !== 'string') {
    sendError(res, 'questionId is required and must be a string');
    return;
  }

  if (selectedIndex === undefined || typeof selectedIndex !== 'number') {
    sendError(res, 'selectedIndex is required and must be a number');
    return;
  }

  if (selectedIndex < 0 || selectedIndex > 4) {
    sendError(res, 'selectedIndex must be between 0 and 4');
    return;
  }

  next();
}
