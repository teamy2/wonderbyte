import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function transform<R, S extends z.ZodSchema | null>(schema: S, fn: (req: S extends z.ZodSchema ? z.infer<S> : Request, res: Response, next: NextFunction) => R) {
	return async (req: Request, res: Response, next: NextFunction) => {

		try {
			const request = schema !== null ? await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			}) : req;

			const result = await fn(request, res, next);
	
			res.json({
				success: true,
				data: result,
			});
		} catch (e) {
			console.error(e);

			if (e instanceof z.ZodError) {
				res.status(400).json({
					success: false,
					errors: e.errors,
				});

				return;
			}

			res.status(500).json({
				success: false,
				errors: [
					{
						code: 'INTERNAL_SERVER_ERROR',
						message: 'An unknown error occurred',
					}
				],
			});
		}
	};
}