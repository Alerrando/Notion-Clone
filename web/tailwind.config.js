/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        modal: "rgba(0 ,0 ,0 ,0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
