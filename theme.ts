const colors = require("tailwindcss/colors");

export default {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        black: colors.black,
        white: colors.white,
        primary: colors.fuchsia,
        "page-background": colors.white,
        "card-border": colors.black,
        "card-background": colors.white,
        "accordion-header-color": colors.black,
        "accordion-header-background": colors.gray["100"],
      },
    },
  },
};
