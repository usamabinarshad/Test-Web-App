import { QuestionDTO, CheckAnswerResponse } from '@/types/quiz';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed with status ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.error || 'Unknown error');
  }

  return json.data as T;
}

export async function fetchQuestions(): Promise<QuestionDTO[]> {
  return request<QuestionDTO[]>('/api/quiz/questions');
}

export async function checkAnswer(
  questionId: string,
  selectedIndex: number,
): Promise<CheckAnswerResponse> {
  return request<CheckAnswerResponse>('/api/quiz/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, selectedIndex }),
  });
}
