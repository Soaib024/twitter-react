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
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    extend: {},
  },
  plugins: [],
};
