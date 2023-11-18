import express from 'express';
import dotenv from 'dotenv';
import { recipeRouter } from './routes/recipes';
import cors from 'cors';

type Recipe = {
	id: number;
	ingredients: string[];
	directions: string[];
};

export const recipes = new Map<number, Recipe>();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/recipes', recipeRouter);
app.listen(4040);
