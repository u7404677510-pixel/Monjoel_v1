import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',  // iPhone SE, petits Android
      },
      colors: {
        "joel-violet": "#7055A7",
        "joel-mauve": "#9E76EC",
        "joel-yellow": "#F5D547",
        "joel-yellow-light": "#FFF8DC",
      },
      backgroundImage: {
        "gradient-joel": "linear-gradient(135deg, #7055A7 0%, #9E76EC 100%)",
        "gradient-joel-warm": "linear-gradient(135deg, #7055A7 0%, #9E76EC 70%, #F5D547 100%)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        display: ["var(--font-chillax)", "Chillax", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
