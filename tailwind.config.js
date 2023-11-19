/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: ({ colors }) => ({
      ...colors,
      'primary': '#FFCC01'
    }),
    screens: {
      'lg': '768px'
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

