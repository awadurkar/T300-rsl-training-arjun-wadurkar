/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf8",
          100: "#d8f3ee",
          600: "#087e72",
          700: "#06665d",
        },
        canvas: "#f7f9fa",
        ink: "#172b2a",
      },
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(23, 43, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
