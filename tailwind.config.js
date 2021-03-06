module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twitter_blue: {
          DEFAULT: "#0099ff",
          light: "#9bd1f9",
        },
      },
    },
    fontSize: {
      xxs: ".8rem",
      xxl: "12rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp')
  ],
};
