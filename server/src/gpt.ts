import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
});


async function main() {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Give me a recipe for the food item in the image" },
            {
              type: "image_url",
              image_url: {
                "url": "https://chocolatecoveredkatie.com/wp-content/uploads/2018/08/Vegan-Kraft-Mac-Cheese-500x500.jpg",
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
  }
  main();