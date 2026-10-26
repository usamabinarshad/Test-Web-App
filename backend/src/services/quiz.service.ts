import questions from '../data/questions';
import { QuestionDTO, CheckAnswerResponse } from '../types';

class QuizService {
  getAllQuestions(): QuestionDTO[] {
    return questions.map(({ id, text, options }) => ({ id, text, options }));
  }

  getQuestionById(questionId: string) {
    return questions.find((q) => q.id === questionId) || null;
  }

  checkAnswer(questionId: string, selectedIndex: number): CheckAnswerResponse | null {
    const question = this.getQuestionById(questionId);
    if (!question) return null;

    return {
      correct: question.correctIndex === selectedIndex,
      correctIndex: question.correctIndex,
    };
  }
}

const quizService = new QuizService();
export default quizService;
