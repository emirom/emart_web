/// <reference types="cypress" />

describe("Full E2E Flow", () => {
  require("./home/01-home-login-modal.cy");

  require("./category/02-category.cy");
});
