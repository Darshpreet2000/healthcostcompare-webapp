import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600 - a deeper, richer blue
        accent: "#EC4899", // Pink 500 - for highlights, inspired by Vertex AI
        background: "#F8FAFC", // Light gray-blue for a softer background
        card: "#FFFFFF", // Pure white for cards
        'card-hover': "#F0F4F8", // Slightly off-white for hover states
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(to right, #4F46E5, #EC4899)", // Use direct color values for gradient
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.08)',
        '4xl': '0 20px 40px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
