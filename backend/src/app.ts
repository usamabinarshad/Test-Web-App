import express from 'express';
import cors from 'cors';
import config from './config';
import quizRoutes from './routes/quiz.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors(config.cors));
app.use(express.json());

app.use('/api/quiz', quizRoutes);

app.use(errorHandler);

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Quiz API running on http://localhost:${config.port}`);
  });
}

export default app;
