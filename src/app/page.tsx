'use client';

import { useEffect, useState } from 'react';
import { QuestionDTO, AnswerResult } from '@/types/quiz';
import { fetchQuestions } from '@/lib/api';
import QuestionCard from '@/components/QuestionCard';

export default function Home() {
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [results, setResults] = useState<Record<string, AnswerResult>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswered = (result: AnswerResult) => {
    setResults((prev) => ({ ...prev, [result.questionId]: result }));
  };

  const answeredCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter((r) => r.correct).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={loadQuestions}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
          {answeredCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {correctCount} of {questions.length} correct
              <span className="text-gray-300 mx-2">·</span>
              {answeredCount} of {questions.length} answered
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              savedResult={results[q.id]}
              onAnswered={handleAnswered}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
