import express from "express";
import { recipes } from "..";
import { pool } from "../database";
import fs from "fs";
import path from "path";

const router = express.Router();

// Get all recipes
router.get("/", async (request, res) => {
	const recipes = await pool.query<Recipe>("SELECT * FROM recipe");
	res.json(recipes.rows);
});

// Get recipe by id
router.get("/:id", async (request, res) => {
	const recipe = await pool.query<Recipe>("SELECT * FROM recipe WHERE id= $1", [
		request.params.id,
	]);
	res.json(recipe.rows);
});

// Post recipe
router.post("/", async (request, res) => {
	try {
		const id = recipes.size;
		recipes.set(id, request.body);
		const base64Image = Buffer.from(request.body.thumbnail, "base64");
		await fs.promises.writeFile(
			path.join("./thumbnails", id.toString()),
			base64Image
		);
		res.json({ status: "success" });
	} catch (error) {
		console.log(error);
		res.json({ status: "error" });
	}
});

export { router as recipeRouter };
