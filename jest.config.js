module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/src/tests/**/*.spec.[jt]s?(x)"],
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.js$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
  };
  