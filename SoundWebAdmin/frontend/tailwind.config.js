/** @type {import('tailwindcss').Config} */
module.exports = {
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

