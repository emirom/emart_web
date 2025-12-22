import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
  },

  component: {
    supportFile: "cypress/support/component.ts",
    specPattern: "cypress/component/**/*.cy.{js,ts}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
