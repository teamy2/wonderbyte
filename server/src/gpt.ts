import { OpenAI } from "openai";
import dotenv from "dotenv/config";
import sharp from 'sharp';
import { z } from 'zod';

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});

const Recipe = z.object({
		name: z.string(),
		description: z.string(),
		instructions: z.array(z.string()),
		ingredients: z.array(z.string()),
});

export async function generateRecipe(image: string) {
		console.log(image.length);
		const buf = Buffer.from(image, 'base64');
		const resized = await sharp(buf).resize(192, 192).toBuffer();
		image = resized.toString('base64');

		console.log(image.length);

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: `Give me a recipe for the food item in the image as an unformatted json object with the following properties: {
                name: string,
                description: string,
                instructions: string[],
                ingredients: string[],
              }`},
            {
              type: "image_url",
              image_url: {
                "url": `data:image/png;base64,${image}`,
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
