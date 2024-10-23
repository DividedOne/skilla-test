/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        default: "0 4px 5px #E9EDF3",
        dropdown: "0 4px 20px #00000014",
      },
      colors: {
        accent: "#002CFB",
        primary: "#122945",
        secondary: "#5E7793",
        muted: "#2B2D33",
        hover: "#DEE4FF",
        tertiary: "#899CB1",
        "light-green": "#DBF8EF",
        "light-red": "#FEE9EF",
        "accent-green": "#28A879",
        "accent-red": "#EA1A4F",
      },
      gridTemplateColumns: {
        table:
          "minmax(54px, 1fr), minmax(88px, 1fr), minmax(129px, 1fr), minmax(325px, 1fr), minmax(214px, 1fr), minmax(461px, 1fr), minmax(110px, 1fr)",
      },
    },
  },
  plugins: [],
};
