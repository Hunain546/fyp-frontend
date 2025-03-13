/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter Tight", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#4F46E5",
      },
      // Adding custom animations
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-in",
        bounceIn: "bounceIn 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
