module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    applyComplexClasses: true,
  },
};
