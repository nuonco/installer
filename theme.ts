const colors = require("tailwindcss/colors");

export default {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: colors.fuchsia,
      },
    },
  },
};
