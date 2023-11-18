import "dotenv/config";

import { OpenAI } from "openai";
import sharp from "sharp";
import { z } from "zod";

const openai = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"],
});

const Recipe = z.object({
	name: z.string(),
	description: z.string(),
	instructions: z.string().array(),
	ingredients: z.string().array(),
	tags: z.string().array(),
});

export async function generateRecipe(image: string) {
	const buf = Buffer.from(image, "base64");
	const resized = await sharp(buf).resize(192, 192).toBuffer();
	image = resized.toString("base64");

	const response = await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		max_tokens: 1024,
		messages: [
			{
				role: "system",
				content: `You are an AI that can generate recipes in JSON format from images.
Your responses can only include responses that can be parsed as JSON with no additional formatting.
Your response should be in the following format:
{
name: string,
tags: string[],
description: string,
instructions: string[],
ingredients: string[],
}`,
			},
			{
				role: "user",
				content: [
					{
						type: "image_url",
						image_url: {
							url: `data:image/png;base64,${image}`,
						},
					},
				],
			},
		],
	});

	const output = response.choices[0].message.content?.startsWith("```json")
		? response.choices[0].message.content.slice(7, -3)
		: response.choices[0].message.content;

	const json = JSON.parse(output!);

	Recipe.parse(json);

	return json;
}
