const colors = require("tailwindcss/colors");

export default {
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                black: "#000000",
                white: "#ffffff",
                primary: colors.orange,
                "page-background": "#eff5f9",
                "card-border": "#266e85",
                "card-background": "#ffffff",
            },
        },
    },
};
