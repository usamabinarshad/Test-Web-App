import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuestionCard from '../components/QuestionCard';
import * as api from '../lib/api';

jest.mock('../lib/api', () => ({
  checkAnswer: jest.fn(),
}));

describe('QuestionCard', () => {
  const mockQuestion = {
    id: 'q1',
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question and all 5 options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        onAnswered={jest.fn()}
      />
    );

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('handles correct answer selection', async () => {
    const onAnswered = jest.fn();
    (api.checkAnswer as jest.Mock).mockResolvedValueOnce({
      correct: true,
      correctIndex: 2,
    });

    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        onAnswered={onAnswered}
      />
    );

    fireEvent.click(screen.getByText(/Paris/));

    await waitFor(() => {
      expect(api.checkAnswer).toHaveBeenCalledWith('q1', 2);
      expect(onAnswered).toHaveBeenCalledWith({
        questionId: 'q1',
        selectedIndex: 2,
        correctIndex: 2,
        correct: true,
      });
      expect(screen.getByText('Correct')).toBeInTheDocument();
    });
  });

  it('handles wrong answer selection and displays the correct option label', async () => {
    const onAnswered = jest.fn();
    (api.checkAnswer as jest.Mock).mockResolvedValueOnce({
      correct: false,
      correctIndex: 2,
    });

    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        onAnswered={onAnswered}
      />
    );

    fireEvent.click(screen.getByText(/Berlin/));

    await waitFor(() => {
      expect(api.checkAnswer).toHaveBeenCalledWith('q1', 0);
      expect(onAnswered).toHaveBeenCalledWith({
        questionId: 'q1',
        selectedIndex: 0,
        correctIndex: 2,
        correct: false,
      });
      expect(screen.getByText('Incorrect. Correct answer: C')).toBeInTheDocument();
    });
  });

  it('renders correctly with pre-saved result and disables further clicks', () => {
    const onAnswered = jest.fn();
    const savedResult = {
      questionId: 'q1',
      selectedIndex: 2,
      correctIndex: 2,
      correct: true,
    };

    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        savedResult={savedResult}
        onAnswered={onAnswered}
      />
    );

    expect(screen.getByText('Correct')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
