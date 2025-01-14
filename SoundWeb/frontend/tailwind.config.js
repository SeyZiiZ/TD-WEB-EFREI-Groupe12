/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: false,
  content: [
    "./index.html",
    "./**/*.{html,js}",
    "**/*.{html, jsx, js}",
		"**/*.js",
		"**/*.html",
  ],
  theme: {
    extend: {
      colors: {
				primary: "#155eef"
			}
    },
  },
  plugins: [],
}
