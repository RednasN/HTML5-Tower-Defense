export default {
  trailingComma: "none",
  printWidth: 140,
  htmlWhitespaceSensitivity: "ignore",
  singleQuote: true,
  overrides: [
    {
      files: "*.html",
      options: {
        printWidth: 120,
      },
    },
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  arrowParens: "avoid",
  plugins: [],
};
