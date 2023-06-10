/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend:{
      fontFamily:{
        'poppins': ['Poppins'],
        'Roboto-Condensed': ['Roboto Condensed'],
        'Arimo': ['Arimo']
      }
    }
  },
  plugins: [],
};
