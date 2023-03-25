/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				inf: '0px 0px 19px -6px rgba(0,0,0,0.3)',
				'3xl': '0px 0px 69px -21px rgba(0,0,0,0.3)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
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
