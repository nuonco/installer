import type { Config } from "tailwindcss";

import theme from "./theme";

const config: Config = {
  content: [
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  darkMode: theme.darkMode as Config["darkMode"],
  safelist: [
    {
      pattern: /bg-(red|green|yellow)-(500|600)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        white: theme.white,
        black: theme.black,
        primary: theme.primary,
      },
    },
  },
};
export default config;
