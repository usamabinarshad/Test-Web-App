import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

describe('FilterBar', () => {
  const counts = {
    all: 7,
    unanswered: 5,
    correct: 1,
    wrong: 1,
  };

  it('renders all filter options and counts', () => {
    const onChange = jest.fn();
    render(<FilterBar active="all" onChange={onChange} counts={counts} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Unanswered')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('Wrong')).toBeInTheDocument();
  });

  it('calls onChange callback when clicking an inactive filter', () => {
    const onChange = jest.fn();
    render(<FilterBar active="all" onChange={onChange} counts={counts} />);

    fireEvent.click(screen.getByText('Unanswered'));
    expect(onChange).toHaveBeenCalledWith('unanswered');
  });
});
