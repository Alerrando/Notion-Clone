/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        modal: "rgba(0 ,0 ,0 ,0.5)",
      },
      height: {
        webkit: "-webkit-fill-available",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
