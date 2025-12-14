import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "joel-violet": "#7055A7",
        "joel-mauve": "#9E76EC",
      },
      backgroundImage: {
        "gradient-joel": "linear-gradient(135deg, #7055A7 0%, #9E76EC 100%)",
      },
      fontFamily: {
        sans: ["Satoshi", "system-ui", "sans-serif"],
        display: ["Cabinet Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

