import fs from "node:fs";
import path from "node:path";

import express from "express";
import { z } from 'zod';

import { pool } from "../database";
import { generateRecipe } from "../gpt";
import { transform } from '../response';


const router = express.Router();

const SearchRecipe = z.object({
	query: z.object({
		tags: z.string().transform((value) => value.split(",")).optional(),
	}),
});

// Get recipes or search by tags
router.get("/", transform(SearchRecipe, async (request) => {
	const recipes =request.query.tags?.length
		? await pool.query<Recipe>("SELECT * FROM recipe WHERE tags && $1", [
			request.query.tags,
		])
		: await pool.query<Recipe>("SELECT * FROM recipe");

	return recipes.rows;
}));

const GetRecipe = z.object({
	params: z.object({
		id: z.coerce.number(),
	}),
});

// Get recipe by id
router.get("/:id", transform(GetRecipe, async (request) => {
	const recipe = await pool.query<Recipe>("SELECT * FROM recipe WHERE id = $1", [
		request.params.id,
	]);

	return recipe.rows[0];
}));

router.get("/:id/thumbnail", async (request, response) => {
	try {
		response.setHeader("Content-Type", "image/png");
		response.send(fs.createReadStream(
			path.join("./thumbnails", request.params.id),
		));
	} catch {
		return response.status(404).send();
	}
});

const CreateRecipe = z.object({
	body: z.object({
		thumbnail: z.string(),
	}),
});

// Post recipe
router.post("/", transform(CreateRecipe, async (request) => {
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

	return rows[0];
}));

export { router as recipeRouter };
