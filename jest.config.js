module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverageFrom: ["./src/components/*.{vue,js}"],
  globals: {
    prefix: "t"
  }
};
