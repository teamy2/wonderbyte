import express from "express";
import dotenv from "dotenv";
import { recipeRouter } from "./routes/recipes";
import { pool } from "./database";
import cors from "cors";

declare global {
	export type Recipe = {
		id: number;
		ingredients: string[];
		directions: string[];
	};
}

pool.query(`CREATE TABLE IF NOT EXISTS recipe (
	id SERIAL PRIMARY KEY,
	name TEXT,
	description TEXT,
	instructions TEXT[],
	ingredients TEXT[]
)`);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/recipes", recipeRouter);
app.listen(4040);
