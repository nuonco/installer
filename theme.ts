const colors = require("tailwindcss/colors");

export default {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: colors.blue,
        "page-background": "#3c5a9a08",
      },
    },
  },
};
