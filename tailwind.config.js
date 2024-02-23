/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2500ff",

          secondary: "#0088ff",

          accent: "#0036ff",

          neutral: "#2b2636",

          "base-100": "#f8ffff",

          info: "#0ba1ff",

          success: "#00b678",

          warning: "#ffc600",

          error: "#ff476b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
