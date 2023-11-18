/** @type {import('tailwindcss').Config}*/
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography')
	],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					'primary': '#78C091',
					'primary-content': '#000',
					'secondary': '#6E9075',
					'secondary-content': '#000',
					'accent': '#563635',
					'accent-content': '#000',
				}
			}
		]
	}
};

module.exports = config;
