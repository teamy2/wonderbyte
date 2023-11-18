import express from 'express';
import { recipes } from '..';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Get all recipes
router.get('/', (request, res) => {
	try {
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get recipe by id
router.get('/:id', (request, res) => {
	try {
		res.json(recipes.get(parseInt(request.params.id)));
	} catch (error) {
		res.status(404).json({ error });
	}
});

// Post recipe
router.post('/', async (request, res) => {
	try {
		const id = recipes.size;
		recipes.set(id, request.body);
		const base64Image = Buffer.from(request.body.thumbnail, 'base64');
		await fs.promises.writeFile(
			path.join('./thumbnails', id.toString()),
			base64Image
		);
		res.json({ status: 'success' });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error' });
	}
});

export { router as recipeRouter };
