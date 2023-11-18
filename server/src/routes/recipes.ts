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
	const recipe = await pool.query<Recipe>(
		"SELECT * FROM recipe WHERE id = $1",
		[request.params.id]
	);

	res.json(recipe.rows[0]);
});

// Get recipes by attribute
// ex. /recipes?foodtype=chinese,indian
router.get("/", async (request, res) => {
	const recipes = await pool.query<Recipe>(
		"SELECT * FROM recipe WHERE category = ANY($1)",
		[request.query.category.split(",")]
	);

	res.json(recipes.rows);
});

// Post recipe
router.post("/", async (request, res) => {
	const base64Image = Buffer.from(request.body.thumbnail, "base64");
	const recipe = await generateRecipe(request.body.thumbnail);

	const { rows } = await pool.query<Recipe>(
		"INSERT INTO recipe (name, description, instructions, ingredients) VALUES ($1, $2, $3, $4) RETURNING *",
		[recipe.name, recipe.description, recipe.instructions, recipe.ingredients]
	);

	await fs.promises.writeFile(
		path.join("./thumbnails", rows[0].id.toString()),
		base64Image
	);

	res.json({
		success: true,
		recipe: rows[0],
	});
});

export { router as recipeRouter };
