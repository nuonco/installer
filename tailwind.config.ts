import type { Config } from "tailwindcss";

import theme from "./theme";

const config: Config = {
  content: [
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|yellow)-(500|600)/,
    },
  ],
  darkMode: theme.darkMode as Config["darkMode"],
  theme: theme.theme,
};
export default config;
