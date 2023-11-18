import express from "express";
import { pool } from "../database";
import fs from "fs";
import path from "path";
import { generateRecipe } from "../gpt";

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
	const { name, description, instructions, ingredients } = request.body;
	const { rows } = await pool.query<Recipe>(
		"INSERT INTO recipe VALUES ($1, $2, $3, $4) RETURNING id",
		[name, description, instructions, ingredients]
	);
	const base64Image = Buffer.from(request.body.thumbnail, "base64");
	await fs.promises.writeFile(
		path.join("./thumbnails", rows[0].id.toString()),
		base64Image
	);
	res.json({
		sucess: true,
		recipe: await generateRecipe(request.body.thumbnail),
	});
});

export { router as recipeRouter };
