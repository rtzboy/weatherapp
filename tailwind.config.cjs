/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				inf: '0px 0px 19px -6px #DDDDDD'
			}
		},
		fontFamily: {
			lato: ['Lato', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif'],
			inter: ['Inter', 'sans-serif']
		}
	},
	plugins: []
};
