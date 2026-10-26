export interface QuestionDTO {
  id: string;
  text: string;
  options: string[];
}

export interface CheckAnswerResponse {
  correct: boolean;
  correctIndex: number;
}

export interface AnswerResult {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
}

export type FilterType = 'all' | 'unanswered' | 'correct' | 'wrong';
