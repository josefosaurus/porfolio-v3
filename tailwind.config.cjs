/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#1F1F1F",
        accent: "#50BF97",
        text: "#828282",
      },
    },
    plugins: [],
  },
}
