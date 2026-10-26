import request from 'supertest';
import app from '../app';
import quizService from '../services/quiz.service';
import questions from '../data/questions';

describe('Quiz Service', () => {
  it('returns all questions without correctIndex in getAllQuestions', () => {
    const list = quizService.getAllQuestions();
    expect(list.length).toBe(questions.length);

    list.forEach((q) => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('text');
      expect(q).toHaveProperty('options');
      expect(q.options.length).toBe(5);
      expect(q).not.toHaveProperty('correctIndex');
    });
  });

  it('checks answers correctly for valid questions', () => {
    const first = questions[0];
    const correctResult = quizService.checkAnswer(first.id, first.correctIndex);
    expect(correctResult).toEqual({
      correct: true,
      correctIndex: first.correctIndex,
    });

    const wrongIndex = (first.correctIndex + 1) % first.options.length;
    const wrongResult = quizService.checkAnswer(first.id, wrongIndex);
    expect(wrongResult).toEqual({
      correct: false,
      correctIndex: first.correctIndex,
    });
  });

  it('returns null when checking an invalid question ID', () => {
    const result = quizService.checkAnswer('non-existent-id', 0);
    expect(result).toBeNull();
  });
});

describe('Quiz API Endpoints', () => {
  describe('GET /api/quiz/questions', () => {
    it('returns 200 and a list of questions with answers hidden', async () => {
      const res = await request(app).get('/api/quiz/questions');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);

      res.body.data.forEach((q: { id: string; text: string; options: string[]; correctIndex?: number }) => {
        expect(q.id).toBeDefined();
        expect(q.text).toBeDefined();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBe(5);
        expect(q.correctIndex).toBeUndefined();
      });
    });
  });

  describe('POST /api/quiz/check', () => {
    it('returns correct: true when submitting the right option', async () => {
      const target = questions[0];

      const res = await request(app)
        .post('/api/quiz/check')
        .send({
          questionId: target.id,
          selectedIndex: target.correctIndex,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.correct).toBe(true);
      expect(res.body.data.correctIndex).toBe(target.correctIndex);
    });

    it('returns correct: false when submitting a wrong option', async () => {
      const target = questions[0];
      const incorrectIndex = (target.correctIndex + 1) % 5;

      const res = await request(app)
        .post('/api/quiz/check')
        .send({
          questionId: target.id,
          selectedIndex: incorrectIndex,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.correct).toBe(false);
      expect(res.body.data.correctIndex).toBe(target.correctIndex);
    });

    it('returns 404 when question ID is not found', async () => {
      const res = await request(app)
        .post('/api/quiz/check')
        .send({
          questionId: 'unknown-id',
          selectedIndex: 0,
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Question not found');
    });

    it('returns 400 when questionId is missing', async () => {
      const res = await request(app)
        .post('/api/quiz/check')
        .send({
          selectedIndex: 1,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('returns 400 when selectedIndex is invalid or out of range', async () => {
      const res = await request(app)
        .post('/api/quiz/check')
        .send({
          questionId: 'q1',
          selectedIndex: 9,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
