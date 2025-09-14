/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // AutofuseCSS provides all fluid utilities
      // You can extend with custom values if needed
    },
  },
  plugins: [
    // AutofuseCSS Tailwind plugin
    require("autofusecss/tailwind"),
  ],
};
