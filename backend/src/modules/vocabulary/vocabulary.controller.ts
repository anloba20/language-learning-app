import { Request, Response } from 'express';

export const vocabularyController = async (req: Request, res: Response) => {
  res.json({ message: 'Vocabulary controller is working!' });
};