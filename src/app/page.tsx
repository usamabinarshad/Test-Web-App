'use client';

import { useEffect, useState, useMemo } from 'react';
import { QuestionDTO, AnswerResult, FilterType } from '@/types/quiz';
import { fetchQuestions } from '@/lib/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import QuestionCard from '@/components/QuestionCard';
import FilterBar from '@/components/FilterBar';

const STORAGE_KEY = 'quiz_results';

export default function Home() {
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const { value: results, update: setResults, clear: resetResults, loaded: resultsLoaded } =
    useLocalStorage<Record<string, AnswerResult>>(STORAGE_KEY, {});
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetchQuestions()
      .then((data) => {
        if (!isCancelled) {
          setQuestions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load questions');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);

    fetchQuestions()
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAnswered = (result: AnswerResult) => {
    setResults((prev) => ({ ...prev, [result.questionId]: result }));
  };

  const handleReset = () => {
    resetResults();
    setFilter('all');
  };

  const filterCounts = useMemo(() => {
    const answered = Object.keys(results).length;
    const correct = Object.values(results).filter((r) => r.correct).length;
    const wrong = answered - correct;

    return {
      all: questions.length,
      unanswered: questions.length - answered,
      correct,
      wrong,
    };
  }, [questions, results]);

  const filteredQuestions = useMemo(() => {
    switch (filter) {
      case 'unanswered':
        return questions.filter((q) => !results[q.id]);
      case 'correct':
        return questions.filter((q) => results[q.id]?.correct === true);
      case 'wrong':
        return questions.filter((q) => results[q.id]?.correct === false);
      default:
        return questions;
    }
  }, [questions, results, filter]);

  const answeredCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter((r) => r.correct).length;

  if (loading || !resultsLoaded) {
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
            onClick={handleRetry}
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
            {answeredCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {correctCount} of {questions.length} correct
                <span className="text-gray-300 mx-2">·</span>
                {answeredCount} of {questions.length} answered
              </p>
            )}
          </div>
          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-1"
            >
              Reset
            </button>
          )}
        </div>

        <div className="mb-6">
          <FilterBar active={filter} onChange={setFilter} counts={filterCounts} />
        </div>

        <div className="flex flex-col gap-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No questions match this filter.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const originalIndex = questions.findIndex((oq) => oq.id === q.id);
              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={originalIndex}
                  savedResult={results[q.id]}
                  onAnswered={handleAnswered}
                />
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
