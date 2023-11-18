import express from "express";
import dotenv from "dotenv";
import { recipeRouter } from "../routes/recipes";

type Recipe = {
	id: number;
	ingredients: string[];
	directions: string[];
};

export const recipes = new Map<number, Recipe>();

dotenv.config();

const app = express();
app.use(express.json());
app.use("/recipes", recipeRouter);
app.listen(4040);
