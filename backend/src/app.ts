import express from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes';
import { vocabularyRouter } from './modules/vocabulary/vocabulary.routes';
import { languageRouter } from './modules/languages/languages.routes';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
}))
app.use(express.json());
app.use('/auth', authRouter);
app.use('/vocabulary', vocabularyRouter);
app.use('/languages', languageRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
} );
