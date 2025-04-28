// .eslintrc.js example
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": "off",
    "lines-between-class-members": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
