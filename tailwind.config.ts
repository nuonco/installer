import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./common/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                white: '#fff8f0',
                black: '#270b46',
            },
        },
    },
};
export default config;
