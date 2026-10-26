export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface QuestionDTO {
  id: string;
  text: string;
  options: string[];
}

export interface CheckAnswerRequest {
  questionId: string;
  selectedIndex: number;
}

export interface CheckAnswerResponse {
  correct: boolean;
  correctIndex: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
