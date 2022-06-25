module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        swing: {
          "0%,100%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(-15deg)" },
        },
      },
      animation: {
        swing: "swing 1s infinite",
      },
    },
  },
  safelist: [
    "w-16",
    "h-16",
    "border-yellow-400",
    "border-gray-600",
    "border-purple-600",
  ],
  plugins: [],
};
