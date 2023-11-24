# Wonderbyte ☕

[Demo](https://www.youtube.com/watch?v=2TqcgsnipV8)

A cutting-edge platform where the art of culinary discovery meets the power of AI. Wonderbyte harnesses the capabilities of OpenAI's GPT-4 Vision API to transform images into recipes, creating a unique and personalized cooking experience.

## Features

- **AI-Powered Recipe Generation**: Upload a food image and receive a custom recipe in seconds.
- **SvelteKit Integration**: Enjoy a sleek, modern web experience built with SvelteKit for rapid development and smooth user interactions.
- **Express Backend**: Robust backend services provided by Express, ensuring reliable API endpoints and server-side logic.
- **PostgreSQL Database**: Secure and scalable storage for all recipes and user data with PostgreSQL.
- **GSAP Animations**: Engaging and beautiful web animations powered by GSAP enhance the user interface.
- **DaisyUI Components**: Utilize a vast collection of DaisyUI components for a consistent and responsive design.
- **TailwindCSS Styling**: Customizable and low-level CSS framework TailwindCSS for crafting a unique design system.

## Getting Started

To get a local copy up and running, follow these simple steps.
Prerequisites

- Ensure you have Node.js installed to work with SvelteKit and Express.
- A PostgreSQL database is required to store and manage data.

Installation

1. Clone the repo

```sh
git clone <https://github.com/teamy2/wonderbyte.git>
```

2. Install NPM packages

```sh
pnpm install
```

3. Create a .env file in the root directory and fill in your PostgreSQL and OpenAI API credentials:

```env
DATABASE_URL="your_postgresql_database_url"
OPENAI_API_KEY="your_openai_api_key"
```

4. Run the development server:

```sh
pnpm dev
```

Your site should now be running on localhost:5173.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
