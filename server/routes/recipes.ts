import express from "express";
import { recipes } from "../src";
import fs from "fs";

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

// Post recipe
router.post("/:id", async (request, res) => {
	try {
		recipes.set(recipes.size, request.body);
		const base64Image = Buffer.from(request.body.thumbnail, "base64");
		await fs.promises.writeFile(request.params.id, base64Image);
		res.json({ status: "success" });
	} catch (error) {
		res.json({ status: "error" });
	}
});

export { router as recipeRouter };
