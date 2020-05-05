module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverageFrom: ["./src/components/*.{vue,js}"],
  globals: {
    prefix: "t",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.css$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
};
