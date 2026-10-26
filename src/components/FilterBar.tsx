'use client';

import { FilterType } from '@/types/quiz';

interface Props {
  active: FilterType;
  onChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unanswered', label: 'Unanswered' },
  { key: 'correct', label: 'Correct' },
  { key: 'wrong', label: 'Wrong' },
];

export default function FilterBar({ active, onChange, counts }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            active === key
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
          }`}
        >
          {label}
          <span
            className={`ml-1.5 text-xs ${
              active === key ? 'text-blue-200' : 'text-gray-400'
            }`}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
