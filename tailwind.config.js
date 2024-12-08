/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                background_textrue: "url('/img/Bg.png')",
                banner: "url('/img/banner.jpg')",
                card_1: "url('/img/Card-1.jpg')",
                card_2: "url('/img/Card-2.jpg')",
            },
            colors: {
                bg_brown: {
                    100: "#D2B48C",
                    200: "#C48A4A",
                    300: "#8B5E34",
                    400: "#4A2C2A",
                },
                card: {
                    100: "#D1A054",
                    200: "#A67E50",
                },
                btn: {
                    100: "#B22222",
                    200: "#9B1E1E",
                },
                font: {
                    100: "#E5F4E3",
                    200: "#F5E5C0",
                },
                order_status: {
                    100: "#6B8E23",
                    200: "#DAA520",
                },
            },
        },
    },
    plugins: [],
};
