const colors = require("tailwindcss/colors");
import { generateColorRange } from "./common/generateColors";

const primary = generateColorRange("#ef6a3f");

export default {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        black: colors.black,
        white: colors.white,
        primary: primary,
        "page-background": "#eff5f9",
        "card-text-color": colors.white,
        "card-border-color": "#eee",
        "card-background": colors.white,
        "card-text-color-dark": colors.black,
        "card-border-color-dark": colors.black,
        "card-background-dark": "rgb(0,0,0 / 5%)",
        "accordion-header-color": colors.black,
        "accordion-header-background": colors.gray["100"],
        "accordion-header-active-color": colors.black,
        "accordion-header-active-color-dark": colors.gray["100"],
        "accordion-header-active-background": colors.blue["100"],
        "accordion-header-active-background-dark": colors.blue["900"],
        "step-active-border-color": colors.orange["400"],
        "step-complete-border-color": colors.green["500"],
        "button-text-color": colors.gray["50"],
        "button-border-color": colors.black,
        "button-bg-color": primary["500"],
        "button-bg-hover": primary["600"],
        "button-bg-focus": primary["600"],
        "button-bg-active": primary["700"],
      },
      boxShadow: {
        "card-shadow":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "button-shadow":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      borderWidth: {
        "card-border-width": "1px",
        "button-border-width": "0px",
      },
      borderRadius: {
        "card-radius": "0.25rem",
        "button-radius": "0.25rem",
        "video-container-radius": "0.5rem",
      },
    },
  },
};
