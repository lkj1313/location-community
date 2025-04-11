/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 모든 컴포넌트, 페이지 감지
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
