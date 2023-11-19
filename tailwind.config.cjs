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
					'primary': '#916bbf',
					'primary-content': '#fff',
					'secondary': '#DDBDD5',
					'secondary-content': '#000',
					'accent': '#1D1E2C',
					'accent-content': '#fff',
				}
			}
		]
	}
};

module.exports = config;
