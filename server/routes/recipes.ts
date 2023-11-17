import express from "express";
import { recipes } from "..";

const router = express.Router();

// Get all recipes
router.get("/", (request, res) => {
	try {
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get recipe by id
router.get("/:id", (request, res) => {
	try {
		res.json(recipes.get(parseInt(request.params.id)));
	} catch (error) {
		res.status(404).json({ error });
	}
});

export { router as recipeRouter };
