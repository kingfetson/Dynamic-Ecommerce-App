/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Example custom color (Blue)
        secondary: "#10B981", // Example custom color (Green)
      },
    },
  },
  plugins: [],
};
