/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "primary-dark": "#541b3d",
          "accent-rose": "#880e4f",
          "black-true": "#0d0b14",
          "peach": "#e9af91",
          "indigo-flare": "#5b28f3",
          "card-dark": "#2b2332",
          "sky-mute": "#649bb1",
          "gray-warm": "#5f615e",
          "blue-steel": "#395a83",
          "maroon-black": "#3a1411",
        },
      },
    },
    plugins: [],
  };
  