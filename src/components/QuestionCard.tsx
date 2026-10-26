'use client';

import { useState } from 'react';
import { QuestionDTO, AnswerResult } from '@/types/quiz';
import { checkAnswer } from '@/lib/api';

interface Props {
  question: QuestionDTO;
  index: number;
  savedResult?: AnswerResult;
  onAnswered: (result: AnswerResult) => void;
}

export default function QuestionCard({ question, index, savedResult, onAnswered }: Props) {
  const [selected, setSelected] = useState<number | null>(savedResult?.selectedIndex ?? null);
  const [result, setResult] = useState<AnswerResult | null>(savedResult ?? null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (optionIndex: number) => {
    if (result || loading) return;

    setSelected(optionIndex);
    setLoading(true);

    try {
      const res = await checkAnswer(question.id, optionIndex);
      const answerResult: AnswerResult = {
        questionId: question.id,
        selectedIndex: optionIndex,
        correctIndex: res.correctIndex,
        correct: res.correct,
      };
      setResult(answerResult);
      onAnswered(answerResult);
    } catch {
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const getOptionStyle = (optionIndex: number): string => {
    const base =
      'w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 text-sm';

    if (!result) {
      if (loading && selected === optionIndex) {
        return `${base} border-blue-400 bg-blue-50 text-blue-700`;
      }
      return `${base} border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer`;
    }

    if (optionIndex === result.correctIndex) {
      return `${base} border-green-500 bg-green-50 text-green-800 font-medium`;
    }

    if (optionIndex === result.selectedIndex && !result.correct) {
      return `${base} border-red-500 bg-red-50 text-red-700 line-through`;
    }

    return `${base} border-gray-100 text-gray-400`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center">
          {index + 1}
        </span>
        <h3 className="text-gray-800 font-medium pt-1">{question.text}</h3>
      </div>

      <div className="flex flex-col gap-2 ml-11">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={!!result || loading}
            className={getOptionStyle(i)}
          >
            <span className="mr-2 text-gray-400 font-mono text-xs">
              {String.fromCharCode(65 + i)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {result && (
        <div
          className={`mt-4 ml-11 text-sm font-medium ${
            result.correct ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {result.correct ? '✓ Correct!' : `✗ Wrong — the answer is ${String.fromCharCode(65 + result.correctIndex)}`}
        </div>
      )}
    </div>
  );
}
