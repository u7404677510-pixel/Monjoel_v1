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
        'xs': '375px',      // iPhone SE, petits Android
        // Tailwind defaults: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)
        '3xl': '1920px',    // Full HD - écrans desktop standard
        '4xl': '2560px',    // QHD / 1440p - écrans gaming/pro
        '5xl': '3840px',    // 4K UHD - grands écrans
      },
      maxWidth: {
        '8xl': '1440px',    // Pour 3xl
        '9xl': '1680px',    // Pour 4xl
        '10xl': '2000px',   // Pour 5xl
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
      fontSize: {
        // Tailles fluides pour grands écrans
        '4xl-fluid': 'clamp(2.25rem, 2vw + 1.5rem, 3.5rem)',
        '5xl-fluid': 'clamp(3rem, 2.5vw + 2rem, 4.5rem)',
        '6xl-fluid': 'clamp(3.75rem, 3vw + 2.5rem, 5.5rem)',
      },
      spacing: {
        // Espacement adaptatif grands écrans
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
